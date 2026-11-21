import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { CopyCommand } from '@/components/copy-command';
import {
  ArrowRight,
  Boxes,
  Braces,
  Cpu,
  GitBranch,
  Globe,
  KeyRound,
  Layers,
  Package,
  Puzzle,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import type { ReactNode } from 'react';

export const Route = createFileRoute('/')({
  component: Home,
});

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-fd-muted-foreground uppercase">
      <span className="h-px w-6 bg-fd-primary/60" />
      {children}
    </div>
  );
}

function CodePanel({
  file,
  footer,
  code,
}: {
  file: string;
  footer: string;
  code: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-fd-border bg-[#0d1117] shadow-2xl shadow-black/30">
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono-code text-[11px] text-white/45">{file}</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono-code text-[12.5px] leading-6 text-[#e6edf3] md:p-6">
        <code>{code}</code>
      </pre>
      <div className="border-t border-white/8 px-5 py-3 font-mono-code text-[11px] text-white/40">
        {footer}
      </div>
    </div>
  );
}

const principles = [
  {
    icon: Sparkles,
    title: '模型优先开发',
    body: '为 LLM 优化源代码、文档与工具，新应用自带 Agent Skill，装哪个版本就读哪个版本的文档。',
  },
  {
    icon: Globe,
    title: '构建于 Web API',
    body: '路由接收 Request、返回 Response。URL、FormData、Headers、Cookie 全栈共享，代码天然可移植。',
  },
  {
    icon: Cpu,
    title: '彻底运行时化',
    body: '路由与中间件直接运行源码，不需要打包或生成类型就能测试。',
  },
  {
    icon: Package,
    title: '避免依赖',
    body: '新应用只有 remix 一个运行时依赖。用到的第三方代码被封装在自有 API 之后。',
  },
  {
    icon: Puzzle,
    title: '主张组合',
    body: '每个包只做一件事：路由器可以单独放进现有 Fetch 处理器，会话包也能加到已有路由上。',
  },
  {
    icon: Boxes,
    title: '保持内聚地分发',
    body: '从同一个包按子路径取用：remix/router 处理路由，remix/component 处理 UI。',
  },
];

const powers = [
  {
    icon: Braces,
    title: '类型化路由',
    body: 'URL 只声明一次。控制器、链接、表单、重定向与测试共享同一份路由对象，生成 URL 不必加载处理器代码。',
    code: 'routes.albums.show.href({ albumId })',
  },
  {
    icon: Layers,
    title: '可组合中间件',
    body: '渲染、会话、压缩、CSRF、CORS 都是普通中间件。想加就加，不加就不在请求路径上。',
    code: 'createRouter({ middleware: [render({ assets })] })',
  },
  {
    icon: Zap,
    title: 'Frame 流式渲染',
    body: '页面先到，慢的部分以 Frame 流式补上；每个 Frame 有独立回退、独立错误与独立刷新。',
    code: '<Frame src={routes.reviews.href(...)} fallback={<Skeleton />} />',
  },
  {
    icon: KeyRound,
    title: '认证与会话内置',
    body: 'Cookie 签名、会话存储、OAuth/OIDC、路由保护与 CSRF 防护都在框架内，不必拼装第三方中间件。',
    code: 'let user = await requireAuth({ schemes })',
  },
  {
    icon: ShieldCheck,
    title: '数据与校验同源',
    body: '表单提交、服务端校验与错误回填走同一条路径，渐进增强开箱可用。',
    code: 'let result = schema.parse(await request.formData())',
  },
  {
    icon: Server,
    title: '运行时随你选择',
    body: '同一份路由器跑在 Node、Bun、Deno 或 Workers 上，适配器只负责把 Request 送进来。',
    code: 'Bun.serve({ fetch: router.fetch })',
  },
];

const packages = [
  'assert',
  'assets',
  'async-context-middleware',
  'auth',
  'auth-middleware',
  'cli',
  'component',
  'component-hmr',
  'compression-middleware',
  'cookie',
  'cop-middleware',
  'cors-middleware',
  'csrf-middleware',
  'data-schema',
  'data-table',
  'data-table-mysql',
  'data-table-postgres',
  'data-table-sqlite',
  'fetch-proxy',
  'fetch-router',
  'file-storage',
  'file-storage-s3',
  'form-data-middleware',
  'form-data-parser',
  'fs',
  'headers',
  'html-template',
  'lazy-file',
  'logger-middleware',
  'method-override-middleware',
  'mime',
  'multipart-parser',
  'node-fetch-server',
  'node-hmr',
  'node-tsx',
  'remix',
  'response',
  'route-pattern',
  'session',
  'session-middleware',
  'session-storage-memcache',
  'session-storage-redis',
  'static-middleware',
  'tar-parser',
  'terminal',
  'test',
  'ui',
];

const pipeline = [
  { label: 'Request', detail: '标准 Web 请求' },
  { label: 'Router', detail: '匹配类型化路由' },
  { label: 'Middleware', detail: '身份、会话、渲染' },
  { label: 'Action', detail: '读数据、做变更' },
  { label: 'Response', detail: 'HTML / JSON / 流 / 文件' },
];

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="flex-1 overflow-hidden">
        {/* Hero */}
        <section className="relative isolate">
          <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />
          <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />
          <div className="landing-wrap flex flex-col items-center pt-20 pb-16 text-center md:pt-28 md:pb-20">
            <a
              href="https://github.com/remix-run/remix"
              target="_blank"
              rel="noreferrer"
              className="group mb-7 inline-flex items-center gap-2 rounded-full border border-fd-border/80 bg-fd-card/70 py-1.5 pr-3 pl-1.5 text-xs text-fd-muted-foreground backdrop-blur transition hover:border-fd-primary/40 hover:text-fd-foreground"
            >
              <span className="rounded-full bg-fd-primary/12 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-fd-primary">
                REMIX 3
              </span>
              在 Shopify 的生产应用中经受检验
              <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
            </a>

            <h1 className="font-display max-w-4xl text-[2.6rem] leading-[1.08] font-semibold text-balance md:text-6xl lg:text-[4.25rem]">
              <span className="text-gradient">一个框架，</span>
              <br />
              <span>从请求一直做到</span>{' '}
              <span className="bg-gradient-to-r from-[#3992ff] via-[#6fb3ff] to-[#f97316] bg-clip-text text-transparent">
                整个应用
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-[15px] leading-7 text-fd-muted-foreground text-pretty md:text-base md:leading-8">
              Remix 是用于构建 Web 应用的全栈 TypeScript 框架。类型化路由、中间件、服务端渲染、
              浏览器水合、数据校验、会话与资源编译全部内置，而它们连接的仍然是你熟悉的{' '}
              <code className="font-mono-code text-[0.9em] text-fd-foreground">Request</code> 与{' '}
              <code className="font-mono-code text-[0.9em] text-fd-foreground">Response</code>。
            </p>

            <div className="mt-9 flex w-full max-w-md flex-col items-center gap-4">
              <CopyCommand command="npx remix@next new my-remix-app" />
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#capabilities"
                  className="inline-flex items-center gap-2 rounded-xl bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition hover:opacity-90"
                >
                  看看它能做什么
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="https://github.com/remix-run/remix"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-fd-border bg-fd-card/60 px-5 py-2.5 text-sm font-medium text-fd-foreground backdrop-blur transition hover:border-fd-primary/40"
                >
                  <GitBranch className="size-4" />
                  GitHub
                </a>
              </div>
              <p className="text-xs text-fd-muted-foreground">
                当前为 Remix 3 Beta，安装 <code className="font-mono-code">remix@next</code>
              </p>
            </div>

            <dl className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-8 border-t border-fd-border/70 pt-8 md:grid-cols-4">
              {[
                ['1', '个运行时依赖'],
                ['47', '个可组合包'],
                ['0', '打包器依赖'],
                ['100%', 'Web 标准'],
              ].map(([value, label]) => (
                <div key={label} className="text-center">
                  <dt className="font-display text-2xl font-semibold text-fd-foreground md:text-3xl">
                    {value}
                  </dt>
                  <dd className="mt-1 text-xs tracking-wide text-fd-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Pipeline */}
        <section className="border-y border-fd-border/70 bg-fd-card/30">
          <div className="landing-wrap py-16 md:py-20">
            <div className="mb-10 max-w-2xl">
              <Eyebrow>请求即契约</Eyebrow>
              <h2 className="font-display text-3xl font-semibold md:text-4xl">
                一个请求，一条看得懂的路径
              </h2>
              <p className="mt-4 text-sm leading-7 text-fd-muted-foreground">
                没有隐藏的编译产物，也没有约定俗成的目录魔法。请求从服务器适配器进来，
                穿过你写的中间件，命中你声明的路由，最后由你的 action 返回任意 Web 响应。
              </p>
            </div>

            <ol className="flex flex-col gap-3 md:flex-row md:items-stretch">
              {pipeline.map((step, index) => (
                <li
                  key={step.label}
                  className="group relative flex flex-1 items-center gap-3 rounded-xl border border-fd-border bg-fd-background/60 px-4 py-3.5"
                >
                  <span className="font-mono-code grid size-7 shrink-0 place-items-center rounded-lg bg-fd-primary/10 text-[11px] font-semibold text-fd-primary">
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-fd-foreground">{step.label}</span>
                    <span className="mt-0.5 block truncate text-[11px] text-fd-muted-foreground">
                      {step.detail}
                    </span>
                  </span>
                  {index < pipeline.length - 1 && (
                    <ArrowRight className="ml-auto hidden size-4 shrink-0 text-fd-muted-foreground/40 md:block" />
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div>
                <h3 className="font-display text-xl font-semibold">URL 与处理器分离，类型贯穿全栈</h3>
                <p className="mt-3 text-sm leading-7 text-fd-muted-foreground">
                  在 <code className="font-mono-code text-fd-foreground">routes.ts</code> 里声明 URL，
                  在 <code className="font-mono-code text-fd-foreground">actions/</code> 里决定返回什么。
                  链接、表单、重定向与测试导入同一份类型化路由对象，改 URL 时编译器会告诉你哪里要跟着改。
                </p>
                <ul className="mt-6 space-y-3 text-sm text-fd-muted-foreground">
                  {[
                    '只声明一次 URL，处处获得补全与类型检查',
                    'GET / POST 等 HTTP 方法是一等公民',
                    '同一个 action 可以返回 HTML、重定向、JSON、文件或流',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-fd-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <CodePanel
                file="app/routes.ts"
                footer="remix/routes · remix/router"
                code={`import { get, route } from "remix/routes";

export const routes = route({
  assets: get("/assets/*path"),
  home: "/",
  albums: {
    show: get("/albums/:albumId"),
    reviews: get("/albums/:albumId/reviews"),
  },
});

// app/actions/albums/controller.tsx
import { createController } from "remix/router";

export default createController(routes.albums, {
  actions: {
    async show(context) {
      let album = await db.albums.find(context.params.albumId);
      if (!album) return new Response("Not Found", { status: 404 });

      return context.render(<AlbumPage album={album} />);
    },
  },
});`}
              />
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="landing-wrap py-20 md:py-24">
          <div className="mb-12 max-w-2xl">
            <Eyebrow>能力</Eyebrow>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              构建应用需要的，它都已经在里面
            </h2>
            <p className="mt-4 text-sm leading-7 text-fd-muted-foreground">
              这些不是可选的插件市场，而是同一个框架里的普通 API。它们共享同一套请求与响应模型，
              所以可以自由组合，也可以只用其中一部分。
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {powers.map(({ icon: Icon, title, body, code }) => (
              <article
                key={title}
                className="card-lift flex flex-col rounded-2xl border border-fd-border bg-fd-card/70 p-6"
              >
                <div className="mb-4 grid size-10 place-items-center rounded-xl border border-fd-border bg-fd-background/60 text-fd-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display text-base font-semibold">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-fd-muted-foreground">{body}</p>
                <code className="font-mono-code mt-5 block truncate rounded-lg border border-fd-border/70 bg-fd-background/60 px-3 py-2 text-[11.5px] text-fd-muted-foreground">
                  {code}
                </code>
              </article>
            ))}
          </div>
        </section>

        {/* Deep dive: composition of middleware + streaming */}
        <section className="border-y border-fd-border/70 bg-fd-card/30">
          <div className="landing-wrap py-20 md:py-24">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <CodePanel
                file="app/router.ts"
                footer="中间件就是函数，顺序就是行为"
                code={`import { createRouter } from "remix/router";
import { render } from "remix/middleware/render";
import { session } from "remix/middleware/session";
import { compression } from "remix/middleware/compression";
import { csrf } from "remix/middleware/csrf";
import { assets } from "./assets.ts";
import { sessionCookie, sessionStorage } from "./session.ts";

export const router = createRouter({
  middleware: [
    compression(),
    session(sessionCookie, sessionStorage),
    csrf(),
    render({ assets, onError: reportError }),
  ],
});`}
              />
              <div>
                <Eyebrow>组合</Eyebrow>
                <h2 className="font-display text-3xl font-semibold md:text-4xl">
                  需要什么就接什么，<br />
                  不需要就不在路径上
                </h2>
                <p className="mt-4 text-sm leading-7 text-fd-muted-foreground">
                  编译、会话、CSRF、CORS、压缩、日志都是中间件。它们只通过{' '}
                  <code className="font-mono-code text-fd-foreground">Request</code>、
                  <code className="font-mono-code text-fd-foreground">Response</code>{' '}
                  与上下文通信，所以可以单独测试、单独替换，也能在现有 Fetch 服务器里只用其中一个。
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: Terminal, title: '内置 CLI', desc: 'new / routes / doctor / test' },
                    { icon: Layers, title: 'UI 组件模型', desc: 'SSR + 水合，无虚拟 DOM 绑定' },
                    { icon: Server, title: '多运行时', desc: 'Node、Bun、Deno、Workers' },
                    { icon: Zap, title: '流式与取消', desc: 'Frame 补流、request.signal 贯穿' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="rounded-xl border border-fd-border bg-fd-card/70 p-3.5">
                      <Icon className="mb-2 size-4 text-fd-primary" />
                      <div className="text-xs font-medium">{title}</div>
                      <div className="mt-0.5 text-[11px] text-fd-muted-foreground">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="landing-wrap py-20 md:py-24">
          <div className="mb-12 max-w-2xl">
            <Eyebrow>设计原则</Eyebrow>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              六条原则，决定每一个 API 的形状
            </h2>
            <p className="mt-4 text-sm leading-7 text-fd-muted-foreground">
              Remix 不追逐抽象层，而是把浏览器与服务器共有的部分做到极致——让应用更容易被人和模型理解。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card-lift rounded-2xl border border-fd-border bg-fd-card/70 p-6">
                <div className="mb-4 grid size-10 place-items-center rounded-xl border border-fd-border bg-fd-background/60 text-fd-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section className="border-y border-fd-border/70 bg-fd-card/30">
          <div className="landing-wrap py-20 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <Eyebrow>可组合的生态</Eyebrow>
                <h2 className="font-display text-3xl font-semibold md:text-4xl">
                  一个 remix 包，
                  <br />
                  也能按需拆开使用
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-fd-muted-foreground">
                  大多数包都是独立的 JavaScript/TypeScript 工具：Fetch 路由器、multipart 解析器、
                  数据表、会话存储、资源服务器……<code className="font-mono-code text-fd-foreground">remix</code>{' '}
                  只是把它们统一起来分发与文档化。已经有服务器？单独装一个包即可。
                </p>
              </div>

              <div className="relative rounded-2xl border border-fd-border bg-fd-background/50 p-5">
                <div className="dot-grid pointer-events-none absolute inset-0 rounded-2xl opacity-40" />
                <div className="relative flex flex-wrap gap-2">
                  {packages.map((name) => (
                    <span
                      key={name}
                      className="font-mono-code rounded-lg border border-fd-border bg-fd-card/80 px-2.5 py-1.5 text-[11.5px] text-fd-muted-foreground transition hover:border-fd-primary/40 hover:text-fd-foreground"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="landing-wrap py-20 md:py-28">
          <div className="relative overflow-hidden rounded-3xl border border-fd-border bg-fd-card/60 px-6 py-14 text-center md:px-16 md:py-20">
            <div className="hero-glow pointer-events-none absolute inset-0 opacity-80" />
            <div className="relative">
              <Braces className="mx-auto mb-6 size-8 text-fd-primary" />
              <h2 className="font-display mx-auto max-w-2xl text-3xl font-semibold text-balance md:text-4xl">
                先跑起来，再读细节
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-fd-muted-foreground">
                用一条命令创建应用，跟着中文指南把路由、渲染、表单、认证与部署走一遍。
                文档内容跟随 remix-run/remix 上游同步更新。
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/docs/$"
                  params={{ _splat: 'start-here' }}
                  className="inline-flex items-center gap-2 rounded-xl bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition hover:opacity-90"
                >
                  阅读中文文档
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="https://docs.remix.run"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-fd-border bg-fd-background/50 px-5 py-2.5 text-sm font-medium transition hover:border-fd-primary/40"
                >
                  官方文档
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-fd-border/70">
          <div className="landing-wrap flex flex-col items-center justify-between gap-4 py-8 text-xs text-fd-muted-foreground md:flex-row">
            <div className="flex items-center gap-2">
              <img src="/remix-logo.svg" alt="" className="size-4 dark:invert" width={16} height={16} />
              <span>Remix 中文文档 · 与上游保持同步</span>
            </div>
            <div className="flex items-center gap-5">
              <a href="https://remix.run" target="_blank" rel="noreferrer" className="hover:text-fd-foreground">
                remix.run
              </a>
              <a
                href="https://github.com/remix-run/remix"
                target="_blank"
                rel="noreferrer"
                className="hover:text-fd-foreground"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </main>
    </HomeLayout>
  );
}
