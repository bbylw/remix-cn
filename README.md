<br />
<br />

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remix-run/remix/raw/main/docs/public/remix-wordmark-racing-darkmode.svg">
    <img alt="Remix" src="https://github.com/remix-run/remix/raw/main/docs/public/remix-wordmark-racing-lightmode.svg" width="400">
  </picture>
</p>

<br />
<br />

# 欢迎使用 Remix 3！

这是 Remix 3 的源代码仓库，目前正在积极开发中。

今年早些时候，我们发布了一篇[博客文章](https://remix.run/blog/wake-up-remix)，分享了我们关于 Remix 3 的一些想法。文中阐述了我们的 Web 开发理念，以及为什么我们认为现在是推出新事物的合适时机。在开发 Remix 3 的过程中，我们遵循以下原则：

1. **模型优先开发（Model-First Development）**。AI 从根本上改变了人机交互模式，无论是对用户体验还是对开发者工作流皆是如此。要为 LLM 优化源代码、文档、工具和抽象层。此外，要为应用开发可在产品本身中使用模型的抽象，而不仅仅是把模型当作开发工具。
2. **构建于 Web API 之上**。在整个技术栈中共享抽象层，可以大幅减少人和机器在上下文切换上的消耗。构建在 Web API 和 JavaScript 的基础之上，因为这是唯一的全栈生态系统。
3. **彻底运行时化（Religiously Runtime）**。为打包器/编译器/类型生成（以及任何预运行时静态分析）做设计，会导致糟糕的 API 设计，最终污染整个系统。所有包都必须按照"不依赖静态分析"的前提来设计，并且所有测试都必须在无需打包的情况下运行。由于涉及浏览器，允许使用 `--import` 加载器来处理 TypeScript 和 JSX 之类的简单转换。
4. **避免依赖**。依赖会把你锁定在别人的路线图上。要明智地选择依赖，将其完全封装，并预期最终用我们自己的包替换其中的大部分。目标是零依赖。
5. **主张组合（Demand Composition）**。抽象层应当是单一用途且可替换的。可组合的抽象易于在现有程序中增删。每个包都必须脱离任何其他上下文也能独立使用并有文档说明。新功能应首先尝试作为一个新包来实现。如果行不通，再尝试拆分现有包以使其更具可组合性。不过，那些几乎总是双向耦合、总是一起变动的紧密模块，应当移到同一个包中。
6. **保持内聚地分发（Distribute Cohesively）**。极度可组合的生态系统很难学习和使用。Remix 将以单一的 `remix` 包进行分发，无论分发还是文档都如此。

## 目标

尽管我们推荐为了易用性而使用 `remix` 包，但组成 Remix 的所有包本身也都应该可以独立使用。这迫使我们考虑包边界，并帮助我们定义可移植、可互操作的公共接口。

Remix 中的每个包都：

- 具有[单一职责](https://en.wikipedia.org/wiki/Single-responsibility_principle)
- 优先采用 Web 标准，以确保在各种 JavaScript 运行时之间的最大互操作性和可移植性
- 在标准缺失或不完整的地方，以不打断原有使用的方式对其进行增强，将不兼容的风险降到最低

这意味着 Remix 的代码**默认就是可移植的**。Remix 的包可以在 [Node.js](https://nodejs.org/)、[Bun](https://bun.sh/)、[Deno](https://deno.com/)、[Cloudflare Workers](https://workers.cloudflare.com/) 以及其他环境中无缝运行。

在服务器端 Web API 可用时，我们会加以利用：

- [Web Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)，而不是 `node:stream`
- [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)，而不是 Node.js 的 `Buffer`
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)，而不是 `node:crypto`
- [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) 和 [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File)，而不是某些特制的、运行时专属的 API

这样做的好处是，代码不仅可复用，而且**面向未来**。

## 包列表

本仓库中的大多数包都是独立的 JavaScript/TypeScript 工具。`remix` 包将它们统一在一个伞形结构下，用于分发和文档。

- [assert](https://github.com/remix-run/remix/blob/main/packages/assert)：兼容 Node assert 的工具，适用于任何 JavaScript 环境
- [assets](https://github.com/remix-run/remix/blob/main/packages/assets)：基于 Fetch 的服务器，按需编译浏览器 JS/TS 和 CSS 资源
- [async-context-middleware](https://github.com/remix-run/remix/blob/main/packages/async-context-middleware)：用于在 AsyncLocalStorage 中存储请求上下文的中间件
- [auth](https://github.com/remix-run/remix/blob/main/packages/auth)：Remix 的浏览器登录、OAuth 和 OIDC 辅助工具
- [auth-middleware](https://github.com/remix-run/remix/blob/main/packages/auth-middleware)：Remix 可插拔的身份验证中间件
- [cli](https://github.com/remix-run/remix/blob/main/packages/cli)：Remix 的命令行界面
- [compression-middleware](https://github.com/remix-run/remix/blob/main/packages/compression-middleware)：用于压缩 HTTP 响应的中间件
- [cookie](https://github.com/remix-run/remix/blob/main/packages/cookie)：在 JavaScript 中处理 Cookie 的工具集
- [cop-middleware](https://github.com/remix-run/remix/blob/main/packages/cop-middleware)：在 Fetch API 服务器中实现无令牌跨源保护的中间件
- [cors-middleware](https://github.com/remix-run/remix/blob/main/packages/cors-middleware)：在 Fetch API 服务器中处理 CORS 的中间件
- [csrf-middleware](https://github.com/remix-run/remix/blob/main/packages/csrf-middleware)：在 Fetch API 服务器中实现 CSRF 防护的中间件
- [data-schema](https://github.com/remix-run/remix/blob/main/packages/data-schema)：小巧、对齐标准的模式校验
- [data-table](https://github.com/remix-run/remix/blob/main/packages/data-table)：为 JavaScript 打造的、带类型的关联查询工具集
- [data-table-mysql](https://github.com/remix-run/remix/blob/main/packages/data-table-mysql)：remix/data-table 的 MySQL 适配器
- [data-table-postgres](https://github.com/remix-run/remix/blob/main/packages/data-table-postgres)：remix/data-table 的 PostgreSQL 适配器
- [data-table-sqlite](https://github.com/remix-run/remix/blob/main/packages/data-table-sqlite)：remix/data-table 的 SQLite 适配器
- [fetch-proxy](https://github.com/remix-run/remix/blob/main/packages/fetch-proxy)：面向 Web Fetch API 的 HTTP 代理
- [fetch-router](https://github.com/remix-run/remix/blob/main/packages/fetch-router)：为 Web Fetch API 打造的极简、可组合路由器
- [file-storage](https://github.com/remix-run/remix/blob/main/packages/file-storage)：JavaScript File 对象的键值存储
- [file-storage-s3](https://github.com/remix-run/remix/blob/main/packages/file-storage-s3)：remix/file-storage 的 S3 后端
- [form-data-middleware](https://github.com/remix-run/remix/blob/main/packages/form-data-middleware)：用于从请求体解析 FormData 的中间件
- [form-data-parser](https://github.com/remix-run/remix/blob/main/packages/form-data-parser)：`request.formData()` 的封装，支持流式文件上传处理
- [fs](https://github.com/remix-run/remix/blob/main/packages/fs)：使用 Web File API 的文件系统工具
- [headers](https://github.com/remix-run/remix/blob/main/packages/headers)：在 JavaScript 中处理 HTTP 头部的工具集
- [html-template](https://github.com/remix-run/remix/blob/main/packages/html-template)：带自动转义的 HTML 模板标签，适用于 JavaScript
- [lazy-file](https://github.com/remix-run/remix/blob/main/packages/lazy-file)：为 JavaScript 提供的惰性、流式文件
- [logger-middleware](https://github.com/remix-run/remix/blob/main/packages/logger-middleware)：用于记录 HTTP 请求和响应的中间件
- [method-override-middleware](https://github.com/remix-run/remix/blob/main/packages/method-override-middleware)：用于从表单数据覆盖 HTTP 请求方法的中间件
- [mime](https://github.com/remix-run/remix/blob/main/packages/mime)：处理 MIME 类型的工具
- [multipart-parser](https://github.com/remix-run/remix/blob/main/packages/multipart-parser)：在任何 JavaScript 环境中都快速高效的 multipart 流解析器
- [node-fetch-server](https://github.com/remix-run/remix/blob/main/packages/node-fetch-server)：使用 Web fetch API 为 Node.js 构建服务器
- [node-tsx](https://github.com/remix-run/remix/blob/main/packages/node-tsx)：让 Node.js 支持 TypeScript 和 JSX 语法运行
- [remix](https://github.com/remix-run/remix/blob/main/packages/remix)：Remix Web 框架
- [response](https://github.com/remix-run/remix/blob/main/packages/response)：面向 Web Fetch API 的响应辅助工具
- [route-pattern](https://github.com/remix-run/remix/blob/main/packages/route-pattern)：用强类型匹配和生成 URL
- [session](https://github.com/remix-run/remix/blob/main/packages/session)：JavaScript 的会话管理
- [session-middleware](https://github.com/remix-run/remix/blob/main/packages/session-middleware)：基于 Cookie 存储管理会话的中间件
- [session-storage-memcache](https://github.com/remix-run/remix/blob/main/packages/session-storage-memcache)：remix/session 的 Memcache 会话存储
- [session-storage-redis](https://github.com/remix-run/remix/blob/main/packages/session-storage-redis)：remix/session 的 Redis 会话存储
- [static-middleware](https://github.com/remix-run/remix/blob/main/packages/static-middleware)：从文件系统提供静态文件的中间件
- [tar-parser](https://github.com/remix-run/remix/blob/main/packages/tar-parser)：在任何 JavaScript 环境中都快速高效的 tar 流解析器
- [terminal](https://github.com/remix-run/remix/blob/main/packages/terminal)：面向 JavaScript 库和 CLI 的终端输出工具
- [test](https://github.com/remix-run/remix/blob/main/packages/test)：面向 JavaScript 和 TypeScript 项目的测试框架
- [ui](https://github.com/remix-run/remix/blob/main/packages/ui)：带有协调器、组件模型和官方 UI 组件的视图层

## 安装

要试用当前的 Remix beta 版，请安装 `next` 分发标签：

```sh
npm install remix@next
```

要使用 CLI 创建一个新的 Remix 应用，请使用 `npx remix@next new`：

```sh
npx remix@next new my-remix-app
```

如果你想体验最前沿的版本，我们也会将最新的 `main` 分支构建到一个 `preview/main` 分支，可以用 `pnpm`（9 及以上版本）[直接安装](https://pnpm.io/package-sources#install-from-a-git-repository-combining-different-parameters)：

```sh
pnpm install "remix-run/remix#preview/main&path:packages/remix"
```

或者，只安装单个包：

```
pnpm install "remix-run/remix#preview/main&path:packages/fetch-router"
```

## 用于构建应用的 Agent 技能

从该仓库开始构建 Remix 3 应用的 Agent 应使用 [`remix` 应用技能](https://github.com/remix-run/remix/blob/main/.agents/skills/remix/SKILL.md)。CLI 的预打包步骤会将该技能复制到应用模板中，这样生成的应用就可以使用相同的指引。

## 贡献

我们欢迎贡献！如果你想参与贡献，请随时提出 issue 或提交 pull request。更多信息请参阅 [CONTRIBUTING](https://github.com/remix-run/remix/blob/main/CONTRIBUTING.md)。

## 许可证

请参阅 [LICENSE](https://github.com/remix-run/remix/blob/main/LICENSE)
