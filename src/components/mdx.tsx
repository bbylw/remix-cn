import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';

const DefaultPre = defaultMdxComponents.pre;
const DefaultTable = defaultMdxComponents.table;

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    pre: ({
      title,
      viewportProps,
      ...props
    }: ComponentProps<typeof DefaultPre> & {
      title?: string;
      viewportProps?: ComponentProps<'div'>;
    }) => (
      <DefaultPre
        {...props}
        {...({
          title,
          viewportProps: {
            role: 'region',
            'aria-label': title ? `${title} 代码示例` : '代码示例',
            ...viewportProps,
          },
        } as object)}
      />
    ),
    table: (props: ComponentProps<typeof DefaultTable>) => (
      <div
        role="region"
        aria-label="数据表"
        tabIndex={0}
        className="relative my-6 overflow-auto rounded-lg prose-no-margin focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-fd-primary"
      >
        <table {...props} />
      </div>
    ),
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
