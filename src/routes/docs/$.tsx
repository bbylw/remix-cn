import { createFileRoute, notFound } from '@tanstack/react-router';
import type { Root as PageTreeRoot } from 'fumadocs-core/page-tree';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { docs, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { baseOptions } from '@/lib/layout.shared';
import { getPageImageUrl, gitConfig } from '@/lib/shared';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import { Suspense, use } from 'react';
import { useMDXComponents } from '@/components/mdx';

export const Route = createFileRoute('/docs/$')({
  component: Page,
  loader: async ({ params }) => {
    // No server function: GitHub Pages is static, so this loader also runs in
    // the browser during client-side navigation.
    const slugs = params._splat?.split('/').filter((v) => v.length > 0) ?? [];
    const page = source.getPage(slugs);
    if (!page) throw notFound();

    await docs.getPage(page.path)?.preload();

    return {
      path: page.path,
      title: page.data.title,
      description: page.data.description,
      markdownUrl: `${page.url}.md`,
      imageUrl: getPageImageUrl(page).url,
      // Serialization renders icon/name nodes with react-dom/server, which
      // cannot run in the browser. Client navigation can use the tree as-is.
      pageTree: import.meta.env.SSR
        ? await source.serializePageTree(source.getPageTree())
        : source.getPageTree(),
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | Remix 中文文档` },
          ...(loaderData.description
            ? [{ name: 'description', content: loaderData.description }]
            : []),
          { property: 'og:image', content: loaderData.imageUrl },
        ]
      : [],
  }),
});

function Content({ path, markdownUrl }: { path: string; markdownUrl: string }) {
  const page = docs.getPage(path);
  if (!page) throw new Error(`unknown page: ${path}`);

  const { toc } = use(page.load());
  const MDX = page.body;

  return (
    <DocsPage toc={toc}>
      <DocsTitle>{page.title}</DocsTitle>
      <DocsDescription>{page.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b -mt-4 pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${encodeURI(path)}`}
        />
      </div>
      <DocsBody>
        <MDX components={useMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

function Page() {
  const { path, pageTree, markdownUrl } = useFumadocsLoader(Route.useLoaderData());

  return (
    <DocsLayout {...baseOptions()} links={[]} tree={pageTree as PageTreeRoot}>
      <Suspense>
        <Content path={path} markdownUrl={markdownUrl} />
      </Suspense>
    </DocsLayout>
  );
}
