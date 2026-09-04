# 南山南 · 大模型应用工程作品集

面向 `aohanbei.github.io` 的多页面作品集。项目使用 Vite、React、TypeScript、Tailwind CSS 与 shadcn/ui 的语义化主题结构，保留账号级 GitHub Pages 的静态 `.html` 路径。

## 页面

- `/`：首页、精选项目、关于与联系
- `/projects/modelport.html`
- `/projects/quantpilot.html`
- `/projects/evolvable-user-memory.html`
- `/404.html`

## 本地开发

```powershell
npm install
npm run dev
```

生产验证：

```powershell
npm run lint
npm run build
npm run validate
npm run preview
```

## 内容与样式约束

- 项目事实来源保存在 `content/project-sources.json`，页面内容通过 `src/content/projects.ts` 类型化引用。
- 9 张授权项目截图保存在 `assets/project-images/`，用途与来源记录在同目录清单中。
- DeerFlow 合并贡献保存在 `src/content/contributions.ts`，访客浏览时不会调用 GitHub API。
- 全站只有 `src/styles/globals.css` 一个样式入口。组件使用 Tailwind class 与 shadcn/ui 语义 token。
- Inter 与思源黑体同源的简体中文字形资源由 npm 依赖进入生产包，不依赖远程字体 CDN。

## 跨对话协作

- 新对话开始前先阅读 [`SKILLS-PLAN.md`](SKILLS-PLAN.md)，其中记录了 UI 相关 skills 的选择、调用顺序与验收要求。
- `PLAN.md` 保存最初迁移方案和长期技术决策；后续用户批注形成的当前状态以 `SKILLS-PLAN.md` 为准。

## 发布

`.github/workflows/deploy-pages.yml` 会在 `main` 分支更新后执行 lint、构建、站点校验，并将 `dist/` 部署到 GitHub Pages。
