<br />
<br />

<p align="center">
  <img alt="Remix" src="public/remix-wordmark-light.svg" width="400">
</p>

<br />
<br />

Remix 是一个用于构建 Web 应用的全栈 TypeScript 框架。它自带构建快速、安全、现代 Web 应用所需的一切。我们在 Shopify 用它构建了许多生产应用。

## 开始使用

在 Node.js 24.3 或更高版本上，创建一个应用并启动开发服务器。

```sh
npx remix new my-remix-app
cd my-remix-app
npm i
npm run dev
```

要在已有项目中加入 Remix，安装这个包。

```sh
npm i remix
```

跟着[入门教程](https://docs.remix.run/start-here/)构建一个带可编辑表单的页面。浏览[书店示例](https://github.com/remix-run/remix/tree/main/demos/bookstore)，看看登录、购物车与结算如何组合在一起。

### 从 `main` 安装

想在下一个正式版本之前试用新功能或验证修复，可以在项目中安装来自 `main` 的最新构建。

```sh
pnpm add "$(curl -fsSL https://github.com/remix-run/previews/releases/latest/download/remix.url)"
```

这会把你的项目固定到某个具体提交。想要更新的构建时，重新运行该命令即可。你可以在[最新的预览版本](https://github.com/remix-run/previews/releases/latest)中找到源码提交以及各个包的 tarball。

如果 pnpm 阻止 tarball 依赖，请在项目的 `pnpm-workspace.yaml` 中设置 `blockExoticSubdeps: false`。

## 设计原则

1. **模型优先开发（Model-First Development）。** 我们为使用编码代理开发、并在应用中调用模型的开发者设计 Remix。新应用自带[面向编码代理的 Remix skill](https://github.com/remix-run/remix/blob/main/.agents/skills/remix/SKILL.md)，`node_modules/remix/INDEX.md` 则指向你所安装版本的指南与 API 文档。
2. **构建于 Web API。** 路由器接收标准的 `Request` 并返回 `Response`。生成的应用通过服务器适配器把它接到 Node.js。你也可以把请求直接传给路由器，用同样的方式测试路由。
3. **彻底运行时化（Religiously Runtime）。** 路由与中间件直接运行源码。无需打包应用或生成类型，就能测试它们。
4. **避免依赖。** 新建的 Remix 应用只有一个运行时依赖：`remix`。Remix 使用第三方代码时，会把这些代码封装在自己的 API 之后。
5. **主张组合（Demand Composition）。** 每个包只做一件事。你可以在已有的 Fetch 处理器里使用路由器，也可以把 session 包加到已经有路由器的应用里。
6. **保持内聚地分发（Distribute Cohesively）。** 从同一个包里导入你需要的东西，例如用 `remix/router` 处理路由，用 `remix/component` 处理 UI。

这些原则背后的想法，可以阅读 [Wake up, Remix!](https://remix.run/blog/wake-up-remix)。

## 包

- [assert](https://github.com/remix-run/remix/tree/main/packages/assert)：适用于任何 JavaScript 环境的、与 Node assert 兼容的工具
- [assets](https://github.com/remix-run/remix/tree/main/packages/assets)：基于 Fetch 的服务器，按需编译浏览器 JS/TS 与 CSS 资源
- [async-context-middleware](https://github.com/remix-run/remix/tree/main/packages/async-context-middleware)：把请求上下文存入 AsyncLocalStorage 的中间件
- [auth](https://github.com/remix-run/remix/tree/main/packages/auth)：Remix 的浏览器登录、OAuth 与 OIDC 辅助工具
- [auth-middleware](https://github.com/remix-run/remix/tree/main/packages/auth-middleware)：Remix 的可插拔认证中间件
- [cli](https://github.com/remix-run/remix/tree/main/packages/cli)：Remix 的命令行接口
- [component](https://github.com/remix-run/remix/tree/main/packages/component)：支持服务端渲染与浏览器水合的组件运行时
- [component-hmr](https://github.com/remix-run/remix/tree/main/packages/component-hmr)：Remix 组件的热模块替换运行时与转换
- [compression-middleware](https://github.com/remix-run/remix/tree/main/packages/compression-middleware)：压缩 HTTP 响应的中间件
- [cookie](https://github.com/remix-run/remix/tree/main/packages/cookie)：在 JavaScript 中处理 Cookie 的工具集
- [cop-middleware](https://github.com/remix-run/remix/tree/main/packages/cop-middleware)：Fetch API 服务器中无令牌的跨源防护中间件
- [cors-middleware](https://github.com/remix-run/remix/tree/main/packages/cors-middleware)：Fetch API 服务器中处理 CORS 的中间件
- [csrf-middleware](https://github.com/remix-run/remix/tree/main/packages/csrf-middleware)：Fetch API 服务器中提供 CSRF 防护的中间件
- [data-schema](https://github.com/remix-run/remix/tree/main/packages/data-schema)：极小、对齐标准的 schema 校验
- [data-table](https://github.com/remix-run/remix/tree/main/packages/data-table)：JavaScript 的类型化关系查询工具集
- [data-table-mysql](https://github.com/remix-run/remix/tree/main/packages/data-table-mysql)：remix/data-table 的 MySQL 实现
- [data-table-postgres](https://github.com/remix-run/remix/tree/main/packages/data-table-postgres)：remix/data-table 的 PostgreSQL 实现
- [data-table-sqlite](https://github.com/remix-run/remix/tree/main/packages/data-table-sqlite)：remix/data-table 的 SQLite 实现
- [fetch-proxy](https://github.com/remix-run/remix/tree/main/packages/fetch-proxy)：Web Fetch API 的 HTTP 代理
- [fetch-router](https://github.com/remix-run/remix/tree/main/packages/fetch-router)：Web Fetch API 的极简可组合路由器
- [file-storage](https://github.com/remix-run/remix/tree/main/packages/file-storage)：JavaScript File 对象的键值存储
- [file-storage-s3](https://github.com/remix-run/remix/tree/main/packages/file-storage-s3)：remix/file-storage 的 S3 后端
- [form-data-middleware](https://github.com/remix-run/remix/tree/main/packages/form-data-middleware)：从请求体解析 FormData 的中间件
- [form-data-parser](https://github.com/remix-run/remix/tree/main/packages/form-data-parser)：带流式文件上传处理的 request.formData() 包装
- [fs](https://github.com/remix-run/remix/tree/main/packages/fs)：使用 Web File API 的文件系统工具
- [headers](https://github.com/remix-run/remix/tree/main/packages/headers)：在 JavaScript 中处理 HTTP 头部的工具集
- [html-template](https://github.com/remix-run/remix/tree/main/packages/html-template)：JavaScript 中自动转义的 HTML 模板标签
- [lazy-file](https://github.com/remix-run/remix/tree/main/packages/lazy-file)：JavaScript 的惰性流式文件
- [logger-middleware](https://github.com/remix-run/remix/tree/main/packages/logger-middleware)：记录 HTTP 请求与响应的中间件
- [method-override-middleware](https://github.com/remix-run/remix/tree/main/packages/method-override-middleware)：用表单数据覆盖 HTTP 请求方法的中间件
- [mime](https://github.com/remix-run/remix/tree/main/packages/mime)：处理 MIME 类型的工具
- [multipart-parser](https://github.com/remix-run/remix/tree/main/packages/multipart-parser)：适用于任何 JavaScript 环境的快速高效 multipart 流解析器
- [node-fetch-server](https://github.com/remix-run/remix/tree/main/packages/node-fetch-server)：用 Web Fetch API 构建 Node.js 服务器
- [node-hmr](https://github.com/remix-run/remix/tree/main/packages/node-hmr)：以热模块重载运行 Node.js 应用
- [node-tsx](https://github.com/remix-run/remix/tree/main/packages/node-tsx)：运行支持 TypeScript 与 JSX 语法的 Node.js
- [remix](https://github.com/remix-run/remix/tree/main/packages/remix)：Remix Web 框架
- [response](https://github.com/remix-run/remix/tree/main/packages/response)：Web Fetch API 的 Response 辅助工具
- [route-pattern](https://github.com/remix-run/remix/tree/main/packages/route-pattern)：以强类型匹配并生成 URL
- [session](https://github.com/remix-run/remix/tree/main/packages/session)：JavaScript 的会话管理
- [session-middleware](https://github.com/remix-run/remix/tree/main/packages/session-middleware)：以 Cookie 存储管理会话的中间件
- [session-storage-memcache](https://github.com/remix-run/remix/tree/main/packages/session-storage-memcache)：remix/session 的 Memcache 会话存储
- [session-storage-redis](https://github.com/remix-run/remix/tree/main/packages/session-storage-redis)：remix/session 的 Redis 会话存储
- [static-middleware](https://github.com/remix-run/remix/tree/main/packages/static-middleware)：从文件系统提供静态文件的中间件
- [tar-parser](https://github.com/remix-run/remix/tree/main/packages/tar-parser)：适用于任何 JavaScript 环境的快速高效 tar 流解析器
- [terminal](https://github.com/remix-run/remix/tree/main/packages/terminal)：JavaScript 库与 CLI 的终端输出工具
- [test](https://github.com/remix-run/remix/tree/main/packages/test)：JavaScript 与 TypeScript 项目的测试框架
- [ui](https://github.com/remix-run/remix/tree/main/packages/ui)：Remix 组件的无头、可访问 UI 原语与动画工具

## 贡献

报告 bug、提议功能或提交 pull request，请参阅[贡献指南](https://github.com/remix-run/remix/blob/main/CONTRIBUTING.md)。要测试某个 pull request，请使用该 PR 上提供的预览安装命令。

## 许可

见 [LICENSE](https://github.com/remix-run/remix/blob/main/LICENSE)
