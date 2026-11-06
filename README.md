# 吴昊强 · 大模型应用开发作品集

面向 `aohanbei.github.io` 的多页面作品集。项目使用 Vite、React、TypeScript、Tailwind CSS 与 shadcn/ui 的语义化主题结构，保留账号级 GitHub Pages 的静态 `.html` 路径。

## 页面

- `/`：首屏、数据条、能力、项目、开源贡献、实习、联系
- `/projects/modelport.html`
- `/projects/evolvable-user-memory.html`
- `/projects/quantpilot.html`（量化研究智能体，原项目 QuantPilot，学习笔记精简页）
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
- 9 张授权项目截图保存在 `assets/project-images/`，用途与来源记录在同目录清单中；其中 ModelPort 与 Memory 使用各自当前本地前端生成的 1600 × 1000 截图。
- DeerFlow 与 DeepTutor 共 13 个已合并 PR 与上游 Star 约数保存在 `src/content/contributions.ts`（核对日期见 `contributionsVerifiedOn`），访客浏览时不会调用 GitHub API。
- 首页“能力”区块对应简历“专业技能”三条，数据在 `src/content/skills.ts`。
- 姓名、求职状态与实习经历保存在 `src/content/profile.ts`，与最新简历保持一致；站点只展示 Agent 工程相关内容，不公开电话、教育背景、学术成果与荣誉（`validate` 会检查）。
- 社交分享图放在 `public/og/`（构建后 `assets/` 下的图片带哈希，不能作为 `og:image`）。
- 架构图是 `src/components/diagrams.tsx` 中的内联组件，颜色跟随全局 token。
- 全站只有 `src/styles/globals.css` 一个样式入口。组件使用 Tailwind class 与 shadcn/ui 语义 token。
- Inter 与思源黑体同源的简体中文字形资源由 npm 依赖进入生产包，不依赖远程字体 CDN。

## 跨对话协作

- 新对话开始前先阅读 [`SKILLS-PLAN.md`](SKILLS-PLAN.md)，其中记录了 UI 相关 skills 的选择、调用顺序与验收要求。
- `PLAN.md` 保存最初迁移方案和长期技术决策；后续用户批注形成的当前状态以 `SKILLS-PLAN.md` 为准。

## 发布

`.github/workflows/deploy-pages.yml` 会在 `main` 分支更新后执行 lint、构建、站点校验，并将 `dist/` 部署到 GitHub Pages。
