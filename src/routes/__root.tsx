import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import * as React from 'react';
import appCss from '@/styles/app.css?url';
import { zhCnTranslations } from '@/lib/i18n';
import { RootProvider } from 'fumadocs-ui/provider/tanstack';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'color-scheme', content: 'light dark' },
      { name: 'text-scale', content: 'scale' },
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      {
        title: 'Remix 中文文档 — 构建于 Web 标准之上的全栈框架',
      },
      {
        name: 'description',
        content:
          'Remix 3 中文文档：基于 Web API 的全栈 TypeScript 框架，模型优先、彻底运行时、零依赖、可组合。包含完整的中文指南与 API 示例。',
      },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/favicon.ico' },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <HeadContent />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f5f6f8" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#101216" />
      </head>
      <body className="flex flex-col min-h-dvh">
        <RootProvider
          i18n={{ locale: 'zh-CN', translations: zhCnTranslations }}
          theme={{ defaultTheme: 'dark' }}
          search={{ options: { type: 'static', api: '/api/search' } }}
        >
          <Outlet />
        </RootProvider>
        <Scripts />
      </body>
    </html>
  );
}
