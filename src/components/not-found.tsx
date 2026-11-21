import { Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { ArrowRight, Home } from 'lucide-react';
import { useEffect } from 'react';
import { baseOptions } from '@/lib/layout.shared';
import { PageShellContainer } from '@/components/page-shell';

export function NotFound() {
  useEffect(() => {
    document.title = '页面未找到 | Remix 中文文档';
  }, []);

  return (
    <HomeLayout {...baseOptions()} slots={{ container: PageShellContainer }}>
      <main className="landing-wrap flex flex-1 flex-col items-center justify-center py-20 text-center">
        <p className="font-mono-code rounded-full border border-(--lp-line-strong) bg-(--lp-surface) px-3 py-1 text-xs font-medium text-fd-primary">
          404
        </p>
        <h1
          id="lp-content"
          tabIndex={-1}
          className="font-display mt-5 text-[clamp(1.65rem,1.35rem+1.4vw,2.35rem)] font-semibold text-balance"
        >
          页面未找到
        </h1>
        <p className="mt-3 max-w-md text-sm leading-7 text-(--lp-muted) text-pretty">
          你访问的页面可能已被移动、重命名，或链接地址有误。
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="lp-press inline-flex min-h-(--target-size) items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground hover:opacity-90 active:brightness-95"
          >
            <Home className="size-4" aria-hidden="true" />
            返回首页
          </Link>
          <Link
            to="/docs/$"
            params={{ _splat: 'start-here' }}
            className="lp-press inline-flex min-h-(--target-size) items-center gap-2 rounded-lg border border-(--lp-line-strong) bg-(--lp-surface)/80 px-5 py-2.5 text-sm font-medium text-fd-foreground hover:bg-(--lp-surface-2) active:brightness-95"
          >
            阅读中文文档
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </main>
    </HomeLayout>
  );
}
