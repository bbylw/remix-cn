import { createFileRoute } from '@tanstack/react-router';
import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

const server = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
});

export const Route = createFileRoute('/api/search')({
  server: {
    handlers: {
      // GitHub Pages is static: this route is prerendered into a search index
      // which the browser downloads once and queries locally.
      GET: async () => server.staticGET(),
    },
  },
});
