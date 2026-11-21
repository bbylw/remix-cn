# 本站说明

Remix 中文文档站点，包含一个精美落地页与完整的中文指南。

文档内容跟随 [remix-run/remix](https://github.com/remix-run/remix) 上游仓库中的
`docs/site/app/actions/guides/chapters` 更新，正文结构对齐 [docs.remix.run](https://docs.remix.run/)。

README 中的框架介绍译自上游
[remix-run/remix/README.md](https://github.com/remix-run/remix/blob/main/README.md)。

## 技术栈

- **[TanStack Start](https://tanstack.com/start)** — 全栈 React 框架，Vite + Nitro
- **[Fumadocs](https://fumadocs.dev)** + **Fumadocs UI** — 文档框架、布局、搜索与 MDX 管线
- **[Bun](https://bun.sh)** — 包管理与脚本运行时
- **Tailwind CSS 4** — 样式与暗色主题
- 项目由 `create-fumadocs-app`（Fumadocs CLI）的 `tanstack-start` 模板初始化

## 本地开发

```sh
bun install
bun run dev
```

打开 <http://localhost:3000>。

## 构建

```sh
bun run build
bun run types:check
```

构建会预渲染全部路由，静态产物位于 `.vercel/output/static`。
GitHub Actions 将其发布到 GitHub Pages（自定义域名见 `CNAME`）。

## 目录结构

```txt
content/docs/          # 中文文档（MDX）
├── meta.json          # 侧边栏顺序
├── index.mdx          # 文档首页
├── start-here.mdx     # 第 1 章
└── ...                # 第 2–15 章
src/routes/index.tsx   # 落地页
src/routes/docs/$.tsx  # 文档路由
src/lib/source.ts      # Fumadocs 内容源
src/components/mdx.tsx # MDX 组件映射
```

## 章节

1. 从这里开始
2. 路由与控制器
3. 请求处理
4. 渲染 UI
5. 交互
6. 用 Frame 流式渲染
7. 动画
8. 数据与校验
9. 表单与变更
10. 认证、会话与安全
11. 文件与资源
12. 错误与取消
13. 测试
14. CLI 与工具链
15. 生产环境

第 10、12、14、15 章在上游仍是提纲，本站依据对应的包 README（session、auth、csrf、cop、cors、node-fetch-server、render、cli、node-tsx、terminal、compression）补写为可操作的完整指南。

## 许可

文档内容来自 Remix 官方仓库，遵循 MIT 许可。
