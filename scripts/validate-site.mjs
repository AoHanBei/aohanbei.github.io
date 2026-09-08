import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const workspace = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const requiredFiles = [
  "index.html",
  "404.html",
  "projects/modelport.html",
  "projects/quantpilot.html",
  "projects/evolvable-user-memory.html",
  "src/main.tsx",
  "src/pages/home-page.tsx",
  "src/pages/case-study-page.tsx",
  "src/pages/not-found-page.tsx",
  "src/content/projects.ts",
  "src/content/contributions.ts",
  "src/styles/globals.css",
  "content/project-sources.json",
  "assets/project-images/manifest.json",
  "public/favicon.svg",
  "vite.config.ts",
  "components.json",
  "package-lock.json",
];

function fail(message) {
  errors.push(message);
}

function walk(directory, ignored = new Set([".git", ".finesse", "node_modules", "dist"])) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const absolute = join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute, ignored) : [absolute];
  });
}

function sitePath(absolute) {
  return relative(workspace, absolute).split(sep).join("/");
}

function pngDimensions(file) {
  const buffer = readFileSync(file);
  if (buffer.length < 24 || buffer.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") {
    throw new Error("不是有效 PNG");
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

for (const file of requiredFiles) {
  if (!existsSync(join(workspace, file))) fail(`缺少必需文件: ${file}`);
}

const textExtensions = new Set([".html", ".css", ".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".yml", ".yaml", ".svg", ".ps1"]);
for (const file of walk(workspace)) {
  if (!textExtensions.has(extname(file).toLowerCase())) continue;
  const label = sitePath(file);
  const buffer = readFileSync(file);
  let text;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
  } catch {
    fail(`${label}: 不是有效 UTF-8`);
    continue;
  }
  if (!text.endsWith("\n")) fail(`${label}: 文件末尾缺少换行`);
  text.split(/\r?\n/).forEach((line, index) => {
    if (/[\t ]+$/.test(line)) fail(`${label}:${index + 1}: 存在尾随空格`);
  });
}

const htmlEntries = [
  ["index.html", "home"],
  ["404.html", "404"],
  ["projects/modelport.html", "project:modelport"],
  ["projects/quantpilot.html", "project:quantpilot"],
  ["projects/evolvable-user-memory.html", "project:evolvable-user-memory"],
];

for (const [path, page] of htmlEntries) {
  const absolute = join(workspace, path);
  if (!existsSync(absolute)) continue;
  const html = readFileSync(absolute, "utf8");
  if (!/<html lang="zh-CN">/.test(html)) fail(`${path}: 缺少 zh-CN 语言声明`);
  if (!/<meta name="viewport"/.test(html)) fail(`${path}: 缺少 viewport`);
  if (!/<meta name="description" content="[^"]+">/.test(html)) fail(`${path}: 缺少 description`);
  if (!/<title>[^<]+<\/title>/.test(html)) fail(`${path}: 缺少 title`);
  if (!html.includes(`data-page="${page}"`)) fail(`${path}: data-page 入口不匹配`);
  if (!html.includes('<div id="root"></div>')) fail(`${path}: 缺少 React 挂载点`);
  if (!html.includes('src="/src/main.tsx"')) fail(`${path}: 缺少共享 React 入口`);
  if (!html.includes('href="/favicon.svg"')) fail(`${path}: 缺少 favicon`);
}

const cssFiles = walk(workspace).filter((file) => extname(file).toLowerCase() === ".css");
if (cssFiles.length !== 1 || sitePath(cssFiles[0]) !== "src/styles/globals.css") {
  fail(`样式入口必须唯一，当前为: ${cssFiles.map(sitePath).join(", ")}`);
}

if (cssFiles.length) {
  const css = readFileSync(join(workspace, "src/styles/globals.css"), "utf8");
  const requirements = [
    [/@import "tailwindcss"/, "未接入 Tailwind CSS"],
    [/@fontsource-variable\/inter/, "未本地接入 Inter"],
    [/@fontsource-variable\/noto-sans-sc/, "未本地接入思源黑体同源中文字形"],
    [/--color-background: var\(--background\)/, "缺少 shadcn 语义 token 映射"],
    [/object-fit: contain/, "项目截图缺少 contain 约束"],
    [/:focus-visible/, "缺少可见键盘焦点"],
    [/@media \(prefers-reduced-motion: reduce\)/, "缺少 reduced-motion 静止版"],
  ];
  requirements.forEach(([pattern, message]) => {
    if (!pattern.test(css)) fail(`src/styles/globals.css: ${message}`);
  });
}

const sources = JSON.parse(readFileSync(join(workspace, "content/project-sources.json"), "utf8"));
const projectSource = readFileSync(join(workspace, "src/content/projects.ts"), "utf8");
const claimReferences = [...projectSource.matchAll(/claim\("([^"]+)"\)/g)].map((match) => match[1]);
const claimIds = sources.projects.flatMap((project) => project.claims.map((claim) => claim.id));

const allowedProjectSources = new Map([
  ["modelport", "https://github.com/AoHanBei/ModelPort"],
  ["quantpilot", "https://tiammomo.github.io/projects/quantpilot.html"],
  ["evolvable-user-memory", "https://github.com/AoHanBei/Memory"],
]);

for (const project of sources.projects) {
  if (project.source !== allowedProjectSources.get(project.id)) {
    fail(`content/project-sources.json: ${project.id} 来源不符合约束`);
  }
}

for (const id of claimIds) {
  const count = claimReferences.filter((reference) => reference === id).length;
  if (count !== 1) fail(`claim ${id} 在类型化内容中应引用一次，当前 ${count} 次`);
}
for (const id of claimReferences) {
  if (!claimIds.includes(id)) fail(`src/content/projects.ts: 未知 claim ${id}`);
}

const contributions = readFileSync(join(workspace, "src/content/contributions.ts"), "utf8");
const prNumbers = [...contributions.matchAll(/number:\s*(\d+)/g)].map((match) => Number(match[1]));
const expectedPrs = [5127, 4933, 4762, 4752, 4709];
if (JSON.stringify(prNumbers) !== JSON.stringify(expectedPrs)) {
  fail(`DeerFlow PR 清单不匹配: ${prNumbers.join(", ")}`);
}

const manifest = JSON.parse(readFileSync(join(workspace, "assets/project-images/manifest.json"), "utf8"));
if (manifest.images.length !== 9) fail(`项目截图数量应为 9，当前 ${manifest.images.length}`);
for (const image of manifest.images) {
  const absolute = join(workspace, "assets/project-images", image.file);
  if (!existsSync(absolute)) {
    fail(`缺少项目截图: ${image.file}`);
    continue;
  }
  const actual = pngDimensions(absolute);
  if (actual.width !== image.width || actual.height !== image.height) {
    fail(`${image.file}: 图片尺寸与清单不一致`);
  }
}

const dist = join(workspace, "dist");
if (existsSync(dist) && statSync(dist).isDirectory()) {
  for (const [path] of htmlEntries) {
    const built = join(dist, path);
    if (!existsSync(built)) {
      fail(`dist 缺少多页面产物: ${path}`);
      continue;
    }
    const html = readFileSync(built, "utf8");
    if (html.includes("/src/main.tsx")) fail(`dist/${path}: 仍引用源码入口`);
    if (!/\/assets\/[^"']+\.js/.test(html)) fail(`dist/${path}: 缺少构建后脚本`);
  }
  if (!existsSync(join(dist, "favicon.svg"))) fail("dist 缺少 favicon.svg");
}

if (errors.length) {
  console.error(`Site validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Site validation passed: 5 pages, ${claimIds.length} source claims, 5 DeerFlow PRs, 9 project images.`);
