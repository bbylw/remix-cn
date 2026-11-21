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
  Layers,
  Package,
  Puzzle,
  Rocket,
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

const principles = [
  {
    icon: Sparkles,
    title: '模型优先开发',
    body: '为 LLM 优化源代码、文档、工具与抽象层，并提供把模型直接用在产品里的原语。',
  },
  {
    icon: Globe,
    title: '构建于 Web API',
    body: '路由接收 Request、返回 Response。全栈共享 URL、FormData、Headers 与 Cookie，代码天然可移植。',
  },
  {
    icon: Cpu,
    title: '彻底运行时化',
    body: '不依赖打包器、类型生成或静态分析。路由、中间件、控制器与测试都是普通的运行时代码。',
  },
  {
    icon: Package,
    title: '避免依赖',
    body: '谨慎选择依赖，把它们封装在自己的边界内，并逐步用专注的自有包替换。',
  },
  {
    icon: Puzzle,
    title: '主张组合',
    body: '每个包只做一件事、可被替换、也能独立使用。功能变化时可以自由增删。',
  },
  {
    icon: Boxes,
    title: '保持内聚地分发',
    body: '所有可组合的部分通过一个 remix 包与一条文档路径分发，学习成本更低。',
  },
];

const chapters = [
  { slug: 'start-here', title: '从这里开始', desc: 'Remix 的整体心智模型与第一个全栈功能' },
  { slug: 'routing-and-controllers', title: '路由与控制器', desc: '用类型化的路由约定 URL 与请求处理' },
  { slug: 'request-handling', title: '请求处理', desc: '从 Request 到 Response 的中间件流水线' },
  { slug: 'rendering-ui', title: '渲染 UI', desc: '组件模型、文档外壳、样式与 HTML 响应' },
  { slug: 'interactivity', title: '交互', desc: '水合边界、事件、受控输入与客户端导航' },
  { slug: 'streaming-ui-with-frames', title: '用 Frame 流式渲染', desc: '流式回退、局部刷新与服务端帧解析' },
  { slug: 'animation', title: '动画', desc: 'CSS 优先的动效模型与尊重渲染状态的辅助函数' },
  { slug: 'data-and-validation', title: '数据与校验', desc: '模式校验、关系数据、查询与 SQL 迁移' },
  { slug: 'forms-and-mutations', title: '表单与变更', desc: '原生表单、校验失败、重定向与增强提交' },
  { slug: 'auth-sessions-security', title: '认证、会话与安全', desc: '身份解析、路由保护与浏览器请求边界' },
  { slug: 'files-and-assets', title: '文件与资源', desc: '静态文件、源资源编译、上传与文件响应' },
  { slug: 'errors-and-cancellation', title: '错误与取消', desc: '失败如何在服务端、渲染与浏览器中传播' },
  { slug: 'testing', title: '测试', desc: '选择合适的测试边界并覆盖完整请求流程' },
  { slug: 'cli-and-tooling', title: 'CLI 与工具链', desc: '创建、检查、测试与运行 TypeScript 项目' },
  { slug: 'production', title: '生产环境', desc: '启动、缓存、可观测性与优雅关闭' },
];

const packages = [
  'assert',
  'assets',
  'async-context-middleware',
  'auth',
  'auth-middleware',
  'cli',
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

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-fd-muted-foreground uppercase">
      <span className="h-px w-6 bg-fd-primary/60" />
      {children}
    </div>
  );
}

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="flex-1 overflow-hidden">
        {/* Hero */}
        <section className="relative isolate">
          <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />
          <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />
          <div className="landing-wrap flex flex-col items-center pt-20 pb-16 text-center md:pt-28 md:pb-24">
            <a
              href="https://github.com/remix-run/remix"
              target="_blank"
              rel="noreferrer"
              className="group mb-7 inline-flex items-center gap-2 rounded-full border border-fd-border/80 bg-fd-card/70 py-1.5 pr-3 pl-1.5 text-xs text-fd-muted-foreground backdrop-blur transition hover:border-fd-primary/40 hover:text-fd-foreground"
            >
              <span className="rounded-full bg-fd-primary/12 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-fd-primary">
                REMIX 3
              </span>
              跟随上游文档持续更新
              <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
            </a>

            <h1 className="font-display max-w-4xl text-[2.6rem] leading-[1.08] font-semibold text-balance md:text-6xl lg:text-[4.25rem]">
              <span className="text-gradient">让 Web 开发</span>
              <br />
              <span className="bg-gradient-to-r from-[#3992ff] via-[#6fb3ff] to-[#f97316] bg-clip-text text-transparent">
                回到 Web 本身
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-[15px] leading-7 text-fd-muted-foreground text-pretty md:text-base md:leading-8">
              Remix 是一个建立在 <code className="font-mono-code text-[0.9em] text-fd-foreground">Request</code> 与{' '}
              <code className="font-mono-code text-[0.9em] text-fd-foreground">Response</code>{' '}
              之上的全栈 TypeScript 框架。类型化路由、服务端渲染、浏览器水合、数据校验、会话与资源编译，
              几乎一切都来自 Web 标准。
            </p>

            <div className="mt-9 flex w-full max-w-md flex-col items-center gap-4">
              <CopyCommand command="npx remix@next new my-remix-app" />
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/docs/$"
                  params={{ _splat: 'start-here' }}
                  className="inline-flex items-center gap-2 rounded-xl bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition hover:opacity-90"
                >
                  <Rocket className="size-4" />
                  开始阅读文档
                </Link>
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
                ['44', '个可组合包'],
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

        {/* Code preview */}
        <section className="landing-wrap pb-20 md:pb-28">
          <div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-2xl border border-fd-border bg-fd-card/60 p-6 backdrop-blur md:p-8">
              <Eyebrow>请求即契约</Eyebrow>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                URL 与处理器分离，类型贯穿全栈
              </h2>
              <p className="mt-4 text-sm leading-7 text-fd-muted-foreground">
                路由定义在 <code className="font-mono-code text-fd-foreground">routes.ts</code>，
                控制器放在 <code className="font-mono-code text-fd-foreground">actions/</code>。
                链接、表单、重定向和测试导入同一份类型化路由对象，生成 URL 时无需加载处理代码。
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

            <div className="overflow-hidden rounded-2xl border border-fd-border bg-[#0d1117] shadow-2xl shadow-black/30">
              <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono-code text-[11px] text-white/45">app/routes.ts</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono-code text-[12.5px] leading-6 text-[#e6edf3] md:p-6">
                <code>{`import { get, route } from "remix/routes";

export const routes = route({
  assets: get("/assets/*path"),
  home: "/",
  albums: {
    show: get("/albums/:albumId"),
  },
});

// app/actions/albums/show.ts
export async function show({ params }) {
  const album = await db.albums.find(params.albumId);
  if (!album) return new Response("Not Found", { status: 404 });

  return render(<AlbumPage album={album} />);
}`}</code>
              </pre>
              <div className="flex items-center justify-between border-t border-white/8 px-5 py-3 text-[11px] text-white/40">
                <span className="font-mono-code">remix/routes · remix/response</span>
                <span>TypeScript</span>
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="border-y border-fd-border/70 bg-fd-card/30">
          <div className="landing-wrap py-20 md:py-24">
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
                <div
                  key={title}
                  className="card-lift rounded-2xl border border-fd-border bg-fd-card/70 p-6"
                >
                  <div className="mb-4 grid size-10 place-items-center rounded-xl border border-fd-border bg-fd-background/60 text-fd-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-display text-base font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapters */}
        <section className="landing-wrap py-20 md:py-24">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <Eyebrow>中文指南</Eyebrow>
              <h2 className="font-display text-3xl font-semibold md:text-4xl">
                从请求出发，系统学习 Remix
              </h2>
              <p className="mt-4 text-sm leading-7 text-fd-muted-foreground">
                与官方 15 章文档同步，从路由、渲染、交互，一路走到数据、安全、测试与生产部署。
              </p>
            </div>
            <Link
              to="/docs/$"
              params={{ _splat: '' }}
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-fd-primary hover:underline"
            >
              查看全部文档
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map((chapter, index) => (
              <Link
                key={chapter.slug}
                to="/docs/$"
                params={{ _splat: chapter.slug }}
                className="card-lift group flex items-start gap-4 rounded-xl border border-fd-border bg-fd-card/50 p-4"
              >
                <span className="font-mono-code mt-0.5 text-[11px] text-fd-muted-foreground/70">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-fd-foreground">
                    {chapter.title}
                    <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-fd-muted-foreground">
                    {chapter.desc}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section className="border-t border-fd-border/70 bg-fd-card/30">
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
                  大多数包都是独立的 JavaScript/TypeScript 工具：fetch 路由器、multipart 解析器、
                  数据表、会话存储、资源服务器……<code className="font-mono-code text-fd-foreground">remix</code>{' '}
                  只是把它们统一起来分发与文档化。
                </p>
                <div className="mt-7 grid max-w-md grid-cols-2 gap-3">
                  {[
                    { icon: Server, title: '多运行时', desc: 'Node、Bun、Deno、Workers' },
                    { icon: Terminal, title: '内置 CLI', desc: 'new / routes / doctor / test' },
                    { icon: Layers, title: 'UI 组件模型', desc: 'SSR + 水合，无虚拟 DOM 绑定' },
                    { icon: Zap, title: '流式渲染', desc: 'Frame 局部刷新与回退' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="rounded-xl border border-fd-border bg-fd-card/70 p-3.5">
                      <Icon className="mb-2 size-4 text-fd-primary" />
                      <div className="text-xs font-medium">{title}</div>
                      <div className="mt-0.5 text-[11px] text-fd-muted-foreground">{desc}</div>
                    </div>
                  ))}
                </div>
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
                读文档，也读源码
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-fd-muted-foreground">
                本站内容跟随 remix-run/remix 的上游文档更新，并翻译为中文。如果发现偏差，
                欢迎在 GitHub 上提出 issue 或 PR。
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/docs/$"
                  params={{ _splat: 'start-here' }}
                  className="inline-flex items-center gap-2 rounded-xl bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition hover:opacity-90"
                >
                  阅读第一章
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="https://github.com/bbylw/remix-cn"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-fd-border bg-fd-background/50 px-5 py-2.5 text-sm font-medium transition hover:border-fd-primary/40"
                >
                  <GitBranch className="size-4" />
                  参与翻译
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
              <a href="https://docs.remix.run" target="_blank" rel="noreferrer" className="hover:text-fd-foreground">
                官方文档
              </a>
              <a href="https://remix.run" target="_blank" rel="noreferrer" className="hover:text-fd-foreground">
                remix.run
              </a>
              <a href="https://github.com/remix-run/remix" target="_blank" rel="noreferrer" className="hover:text-fd-foreground">
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </main>
    </HomeLayout>
  );
}
