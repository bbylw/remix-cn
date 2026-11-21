import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold">
          <img
            src="/remix-logo.svg"
            alt=""
            className="size-6 dark:invert"
            width={24}
            height={24}
          />
          <span>{appName}</span>
        </span>
      ),
    },
    links: [
      { type: 'main', text: '文档', url: '/docs' },
      { type: 'main', text: '入门指南', url: '/docs/start-here' },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
