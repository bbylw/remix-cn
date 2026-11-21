import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { CopyCommand } from '@/components/copy-command';
import { CodeBlock } from '@/components/code-block';
import { cn } from '@/lib/cn';
import {
  ArrowRight,
  Boxes,
  Braces,
  Check,
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
import { Fragment, type ReactNode } from 'react';

export const Route = createFileRoute('/')({
  component: Home,
});

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono-code mb-4 flex items-center gap-2.5 text-[11px] font-medium tracking-[0.16em] text-fd-primary uppercase">
      <span className="h-px w-6 bg-fd-primary/60" />
      {children}
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: string;
}) {
  return (
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-[1.7rem] leading-snug font-semibold text-balance md:text-[2.05rem]">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-(--lp-muted)">{lede}</p>
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
    code: 'createRouter({ middleware: [render()] })',
  },
  {
    icon: Zap,
    title: 'Frame 流式渲染',
    body: '页面先到，慢的部分以 Frame 流式补上；每个 Frame 有独立回退、独立错误与独立刷新。',
    code: '<Frame src={url} fallback={<Skeleton />} />',
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
    code: 'schema.parse(await request.formData())',
  },
  {
    icon: Server,
    title: '运行时随你选择',
    body: '同一份路由器跑在 Node、Bun、Deno 或 Workers 上，适配器只负责把 Request 送进来。',
    code: 'Bun.serve({ fetch: router.fetch })',
  },
];

const packageGroups = [
  {
    label: '核心与工具',
    items: [
      'remix',
      'cli',
      'component',
      'component-hmr',
      'ui',
      'test',
      'terminal',
      'node-tsx',
      'node-hmr',
      'assert',
      'fs',
      'lazy-file',
      'mime',
      'headers',
    ],
  },
  {
    label: '路由与服务器',
    items: [
      'fetch-router',
      'route-pattern',
      'fetch-proxy',
      'node-fetch-server',
      'response',
      'html-template',
      'assets',
      'static-middleware',
      'compression-middleware',
      'logger-middleware',
      'method-override-middleware',
      'async-context-middleware',
      'form-data-middleware',
    ],
  },
  {
    label: '会话与认证',
    items: [
      'auth',
      'auth-middleware',
      'session',
      'session-middleware',
      'session-storage-memcache',
      'session-storage-redis',
      'cookie',
    ],
  },
  {
    label: '安全中间件',
    items: ['cop-middleware', 'cors-middleware', 'csrf-middleware'],
  },
  {
    label: '数据与解析',
    items: [
      'data-schema',
      'data-table',
      'data-table-mysql',
      'data-table-postgres',
      'data-table-sqlite',
      'form-data-parser',
      'multipart-parser',
      'tar-parser',
    ],
  },
  {
    label: '文件存储',
    items: ['file-storage', 'file-storage-s3'],
  },
];

const pipeline = [
  { label: 'Request', detail: '标准 Web 请求' },
  { label: 'Router', detail: '匹配类型化路由' },
  { label: 'Middleware', detail: '身份、会话、渲染' },
  { label: 'Action', detail: '读数据、做变更' },
  { label: 'Response', detail: 'HTML / JSON / 流 / 文件' },
];

const routeTabs = [
  {
    file: 'app/routes.ts',
    lang: 'ts',
    code: `import { get, route } from "remix/routes";

export const routes = route({
  home: "/",
  albums: {
    show: get("/albums/:albumId"),
    reviews: get("/albums/:albumId/reviews"),
  },
});`,
  },
  {
    file: 'app/actions/albums.tsx',
    lang: 'tsx',
    code: `import { createController } from "remix/router";

export default createController(routes.albums, {
  actions: {
    async show(ctx) {
      let album = await db.albums.find(ctx.params.albumId);
      if (!album) return new Response("Not Found", { status: 404 });
      return ctx.render(<AlbumPage album={album} />);
    },
  },
});`,
  },
];

const routerTab = {
  file: 'app/router.ts',
  lang: 'ts',
  code: `import { createRouter } from "remix/router";
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
});`,
};

const pad = (n: number) => String(n).padStart(2, '0');

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="flex-1 overflow-hidden">
        {/* Hero */}
        <section className="relative isolate">
          <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />
          <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />
          <div className="landing-wrap flex flex-col items-center pt-16 pb-14 text-center md:pt-24 md:pb-16">
            <a
              href="https://github.com/remix-run/remix"
              target="_blank"
              rel="noreferrer"
              className="group mb-7 inline-flex items-center gap-2 rounded-full border border-(--lp-line) bg-(--lp-surface)/80 py-1.5 pr-3 pl-1.5 text-xs text-(--lp-muted) backdrop-blur transition hover:border-fd-primary/40 hover:text-fd-foreground"
            >
              <span className="font-mono-code rounded-full bg-fd-primary/12 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-fd-primary">
                REMIX 3
              </span>
              在 Shopify 的生产应用中经受检验
              <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
            </a>

            <h1 className="font-display max-w-3xl text-[2rem] leading-[1.2] font-semibold text-balance md:text-[3.2rem] md:leading-[1.16] lg:text-[3.7rem]">
              一个框架，
              <br />
              从请求一直做到{' '}
              <span className="whitespace-nowrap text-fd-primary">整个应用</span>
            </h1>

            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-(--lp-muted) text-pretty md:text-base md:leading-8">
              Remix 是用于构建 Web 应用的全栈 TypeScript 框架。类型化路由、中间件、服务端渲染、
              浏览器水合、数据校验、会话与资源编译全部内置，而它们连接的仍然是你熟悉的{' '}
              <code className="font-mono-code text-[0.9em] text-fd-foreground">Request</code> 与{' '}
              <code className="font-mono-code text-[0.9em] text-fd-foreground">Response</code>。
            </p>

            <div className="mt-8 flex w-full max-w-md flex-col items-center gap-4">
              <CopyCommand command="npx remix@next new my-remix-app" />
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/docs/$"
                  params={{ _splat: 'start-here' }}
                  className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition hover:opacity-90"
                >
                  阅读中文文档
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#capabilities"
                  className="inline-flex items-center gap-2 rounded-lg border border-(--lp-line) bg-(--lp-surface)/70 px-5 py-2.5 text-sm font-medium text-fd-foreground backdrop-blur transition hover:border-(--lp-line-strong)"
                >
                  看看能力
                </a>
                <a
                  href="https://github.com/remix-run/remix"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub 仓库"
                  className="grid size-10 place-items-center rounded-lg border border-(--lp-line) bg-(--lp-surface)/70 text-(--lp-muted) backdrop-blur transition hover:border-(--lp-line-strong) hover:text-fd-foreground"
                >
                  <GitBranch className="size-4" />
                </a>
              </div>
              <p className="text-xs text-(--lp-muted)">
                当前为 Remix 3 Beta，安装 <code className="font-mono-code">remix@next</code>
              </p>
            </div>

            <dl className="mt-12 grid w-full max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-(--lp-line) bg-(--lp-line) md:grid-cols-4">
              {[
                ['1', '个运行时依赖'],
                ['47', '个可组合包'],
                ['0', '打包器依赖'],
                ['100%', 'Web 标准'],
              ].map(([value, label]) => (
                <div key={label} className="bg-(--lp-surface) px-4 py-4 text-center">
                  <dt className="font-display tracking-display text-xl font-semibold text-fd-foreground md:text-2xl">
                    {value}
                  </dt>
                  <dd className="mt-1 text-[11px] tracking-wide text-(--lp-muted)">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Pipeline */}
        <section id="pipeline" className="scroll-mt-24 border-y border-(--lp-line) bg-(--lp-surface-2)/60">
          <div className="landing-wrap py-16 md:py-20">
            <SectionHead
              eyebrow="请求即契约"
              title="一个请求，一条看得懂的路径"
              lede="没有隐藏的编译产物，也没有约定俗成的目录魔法。请求从服务器适配器进来，穿过你写的中间件，命中你声明的路由，最后由你的 action 返回任意 Web 响应。"
            />

            <ol className="mt-10 flex flex-col items-stretch gap-1.5 md:flex-row md:gap-0">
              {pipeline.map((step, index) => (
                <Fragment key={step.label}>
                  {index > 0 && (
                    <li aria-hidden="true" className="flex items-center justify-center md:px-2">
                      <ArrowRight className="size-4 rotate-90 text-(--lp-muted)/50 md:rotate-0" />
                    </li>
                  )}
                  <li className="flex flex-1 items-center gap-3 rounded-lg border border-(--lp-line) bg-(--lp-surface) px-4 py-3">
                    <span className="font-mono-code text-[11px] font-medium text-fd-primary">
                      {pad(index + 1)}
                    </span>
                    <span className="min-w-0">
                      <span className="font-mono-code block text-[13px] font-medium text-fd-foreground">
                        {step.label}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-(--lp-muted)">
                        {step.detail}
                      </span>
                    </span>
                  </li>
                </Fragment>
              ))}
            </ol>

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <h3 className="font-display text-lg font-semibold">
                  URL 与处理器分离，类型贯穿全栈
                </h3>
                <p className="mt-3 text-sm leading-7 text-(--lp-muted)">
                  在 <code className="font-mono-code text-fd-foreground">routes.ts</code> 里声明 URL，
                  在 <code className="font-mono-code text-fd-foreground">actions/</code> 里决定返回什么。
                  链接、表单、重定向与测试导入同一份类型化路由对象，改 URL 时编译器会告诉你哪里要跟着改。
                </p>
                <ul className="mt-6 space-y-3 text-sm text-(--lp-muted)">
                  {[
                    '只声明一次 URL，处处获得补全与类型检查',
                    'GET / POST 等 HTTP 方法是一等公民',
                    '同一个 action 可以返回 HTML、重定向、JSON、文件或流',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-fd-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs leading-6 text-(--lp-muted)/80">
                  切换右侧标签页，看同一条路由如何在控制器里变成响应。
                </p>
              </div>

              <CodeBlock tabs={routeTabs} footer="remix/routes · remix/router" />
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="landing-wrap scroll-mt-24 py-16 md:py-20">
          <SectionHead
            eyebrow="能力"
            title="构建应用需要的，它都已经在里面"
            lede="这些不是可选的插件市场，而是同一个框架里的普通 API。它们共享同一套请求与响应模型，所以可以自由组合，也可以只用其中一部分。"
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {powers.map(({ icon: Icon, title, body, code }, index) => (
              <article
                key={title}
                className="card-lift flex flex-col rounded-xl border border-(--lp-line) bg-(--lp-surface) p-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-(--lp-line) bg-(--lp-surface-2) text-fd-primary">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="font-display text-[15px] font-semibold">{title}</h3>
                  <span className="font-mono-code ml-auto text-[11px] text-(--lp-muted)/60">
                    {pad(index + 1)}
                  </span>
                </div>
                <p className="flex-1 text-[13px] leading-6 text-(--lp-muted)">{body}</p>
                <code className="font-mono-code mt-4 block rounded-md border border-(--lp-line) bg-(--lp-surface-2) px-3 py-2 text-[11px] leading-5 break-words whitespace-pre-wrap text-fd-foreground/80">
                  {code}
                </code>
              </article>
            ))}
          </div>
        </section>

        {/* Composition */}
        <section className="border-y border-(--lp-line) bg-(--lp-surface-2)/60">
          <div className="landing-wrap py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <CodeBlock tabs={[routerTab]} footer="中间件就是函数，顺序就是行为" />
              <div>
                <Eyebrow>组合</Eyebrow>
                <h2 className="font-display text-[1.7rem] leading-snug font-semibold text-balance md:text-[2.05rem]">
                  需要什么就接什么，
                  <br />
                  不需要就不在路径上
                </h2>
                <p className="mt-4 text-sm leading-7 text-(--lp-muted)">
                  编译、会话、CSRF、CORS、压缩、日志都是中间件。它们只通过{' '}
                  <code className="font-mono-code text-fd-foreground">Request</code>、
                  <code className="font-mono-code text-fd-foreground">Response</code>{' '}
                  与上下文通信，所以可以单独测试、单独替换，也能在现有 Fetch 服务器里只用其中一个。
                </p>
                <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-(--lp-line) bg-(--lp-line) sm:grid-cols-2">
                  {[
                    { icon: Terminal, title: '内置 CLI', desc: 'new / routes / doctor / test' },
                    { icon: Layers, title: 'UI 组件模型', desc: 'SSR + 水合，无虚拟 DOM 绑定' },
                    { icon: Server, title: '多运行时', desc: 'Node、Bun、Deno、Workers' },
                    { icon: Zap, title: '流式与取消', desc: 'Frame 补流、request.signal 贯穿' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="bg-(--lp-surface) p-4">
                      <div className="flex items-center gap-2">
                        <Icon className="size-4 shrink-0 text-fd-primary" />
                        <span className="text-[13px] font-medium">{title}</span>
                      </div>
                      <div className="font-mono-code mt-1.5 text-[11px] text-(--lp-muted)">
                        {desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section id="principles" className="landing-wrap scroll-mt-24 py-16 md:py-20">
          <SectionHead
            eyebrow="设计原则"
            title="六条原则，决定每一个 API 的形状"
            lede="Remix 不追逐抽象层，而是把浏览器与服务器共有的部分做到极致——让应用更容易被人和模型理解。"
          />
          <ol className="mt-10 grid gap-x-10 border-b border-(--lp-line) md:grid-cols-2">
            {principles.map(({ icon: Icon, title, body }, index) => (
              <li key={title} className="flex gap-4 border-t border-(--lp-line) py-5">
                <span className="font-mono-code pt-0.5 text-sm font-medium text-fd-primary">
                  {pad(index + 1)}
                </span>
                <div>
                  <h3 className="font-display flex items-center gap-2 text-[15px] font-semibold">
                    <Icon className="size-4 shrink-0 text-fd-primary" />
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-6 text-(--lp-muted)">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Packages */}
        <section id="packages" className="scroll-mt-24 border-y border-(--lp-line) bg-(--lp-surface-2)/60">
          <div className="landing-wrap py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <Eyebrow>可组合的生态</Eyebrow>
                <h2 className="font-display text-[1.7rem] leading-snug font-semibold text-balance md:text-[2.05rem]">
                  一个 remix 包，
                  <br />
                  也能按需拆开使用
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-(--lp-muted)">
                  大多数包都是独立的 JavaScript/TypeScript 工具：Fetch 路由器、multipart 解析器、
                  数据表、会话存储、资源服务器……<code className="font-mono-code text-fd-foreground">remix</code>{' '}
                  只是把它们统一起来分发与文档化。已经有服务器？单独装一个包即可。
                </p>
                <p className="font-mono-code mt-6 text-[11px] tracking-wide text-(--lp-muted)/80">
                  {packageGroups.reduce((n, g) => n + g.items.length, 0)} packages · 1 runtime
                  dependency
                </p>
              </div>

              <div className="overflow-hidden rounded-xl border border-(--lp-line) bg-(--lp-surface)">
                {packageGroups.map((group, index) => (
                  <div
                    key={group.label}
                    className={cn(
                      'grid gap-3 px-5 py-4 md:grid-cols-[9rem_1fr] md:items-start',
                      index > 0 && 'border-t border-(--lp-line)',
                    )}
                  >
                    <div className="flex items-baseline gap-2 md:flex-col md:gap-1">
                      <span className="text-[13px] font-medium">{group.label}</span>
                      <span className="font-mono-code text-[11px] text-(--lp-muted)">
                        {group.items.length} 个包
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((name) => (
                        <span
                          key={name}
                          className="font-mono-code rounded-md border border-(--lp-line) bg-(--lp-surface-2) px-2 py-1 text-[11px] text-(--lp-muted) transition hover:border-fd-primary/50 hover:text-fd-foreground"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="landing-wrap py-16 md:py-24">
          <div className="relative overflow-hidden rounded-2xl border border-(--lp-line) bg-(--lp-surface) px-6 py-14 text-center md:px-16 md:py-16">
            <div className="hero-glow pointer-events-none absolute inset-0 opacity-70" />
            <div className="relative">
              <Braces className="mx-auto mb-5 size-7 text-fd-primary" />
              <h2 className="font-display mx-auto max-w-2xl text-[1.7rem] font-semibold text-balance md:text-[2.05rem]">
                先跑起来，再读细节
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-(--lp-muted)">
                用一条命令创建应用，跟着中文指南把路由、渲染、表单、认证与部署走一遍。
                文档内容跟随 remix-run/remix 上游同步更新。
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/docs/$"
                  params={{ _splat: 'start-here' }}
                  className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition hover:opacity-90"
                >
                  阅读中文文档
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="https://docs.remix.run"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-(--lp-line) bg-(--lp-surface-2)/70 px-5 py-2.5 text-sm font-medium transition hover:border-(--lp-line-strong)"
                >
                  官方文档
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-(--lp-line)">
          <div className="landing-wrap flex flex-col items-center justify-between gap-4 py-8 text-xs text-(--lp-muted) md:flex-row">
            <img
              src="/remix-logo.svg"
              alt="Remix"
              className="size-4 dark:invert"
              width={16}
              height={16}
            />
            <div className="flex items-center gap-5">
              <Link to="/docs/$" params={{ _splat: '' }} className="hover:text-fd-foreground">
                文档
              </Link>
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