import { Check, Copy } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type CodeTab = {
  file: string;
  lang?: string;
  code: string;
};

const TOKEN_STYLE = [
  'tok-comment',
  'tok-string',
  'tok-keyword',
  'tok-literal',
  'tok-number',
  'tok-tag',
  'tok-type',
  'tok-fn',
  'tok-prop',
  'tok-punct',
] as const;

const RULE =
  /(\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b(?:import|from|export|const|let|var|async|await|return|if|else|new|default|function|type|interface|class|extends|for|of|in|try|catch|throw|as|typeof)\b)|(\b(?:true|false|null|undefined|this)\b)|(\b\d+(?:\.\d+)?\b)|(<\/?[A-Za-z][\w.]*)|(\b[A-Z][A-Za-z0-9_]*\b)|([A-Za-z_$][\w$]*(?=\s*\())|([A-Za-z_$][\w$]*(?=\s*:))|([{}[\]().,;:=<>+\-*/%&|!?]+)/g;

function highlightLine(line: string, keyBase: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  RULE.lastIndex = 0;
  while ((match = RULE.exec(line))) {
    if (match.index > last) nodes.push(line.slice(last, match.index));
    const group = match.slice(1).findIndex((g) => g !== undefined);
    const text = match[0];
    if (group === 5) {
      const bracket = text.startsWith('</') ? '</' : '<';
      nodes.push(
        <span key={`${keyBase}-${i++}`} className="tok-punct">
          {bracket}
        </span>,
        <span key={`${keyBase}-${i++}`} className="tok-tag">
          {text.slice(bracket.length)}
        </span>,
      );
    } else {
      nodes.push(
        <span key={`${keyBase}-${i++}`} className={TOKEN_STYLE[group]}>
          {text}
        </span>,
      );
    }
    last = match.index + text.length;
  }
  if (last < line.length) nodes.push(line.slice(last));
  return nodes;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? '已复制' : '复制代码'}
      className="grid size-7 shrink-0 place-items-center rounded-md text-[#8b949e] transition hover:bg-white/8 hover:text-[#e6edf3]"
    >
      {copied ? <Check className="size-3.5 text-[#3fb950]" /> : <Copy className="size-3.5" />}
    </button>
  );
}

export function CodeBlock({
  tabs,
  footer,
  className,
}: {
  tabs: CodeTab[];
  footer?: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  const lines = tab.code.replace(/\n$/, '').split('\n');

  return (
    <div
      className={cn(
        'lp-editor overflow-hidden rounded-xl border border-[#2b3138] bg-[#0d1117] shadow-[0_24px_60px_-32px_rgba(0,0,0,0.9)]',
        className,
      )}
    >
      <div className="flex items-stretch border-b border-[#21262d] bg-[#11151a]">
        <div className="flex min-w-0 flex-1 items-stretch overflow-x-auto" role="tablist">
          {tabs.map((t, index) => (
            <button
              key={t.file}
              type="button"
              role="tab"
              aria-selected={index === active}
              onClick={() => setActive(index)}
              className={cn(
                'font-mono-code relative flex shrink-0 items-center gap-2 px-4 py-2.5 text-[11.5px] transition',
                index === active
                  ? 'bg-[#0d1117] text-[#e6edf3]'
                  : 'text-[#7d8590] hover:bg-white/4 hover:text-[#adbac7]',
              )}
            >
              {index === active && (
                <span className="absolute inset-x-0 top-0 h-px bg-[#4d9bff]" />
              )}
              {t.file}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 border-l border-[#21262d] px-2.5">
          <span className="font-mono-code hidden text-[10px] tracking-wide text-[#7d8590] uppercase sm:inline">
            {tab.lang ?? 'ts'}
          </span>
          <CopyButton text={tab.code} />
        </div>
      </div>

      <pre className="font-mono-code overflow-x-auto py-4 text-[12.5px] leading-6 text-[#d7e0ea]">
        <code>
          {lines.map((line, index) => (
            <span key={index} className="code-line">
              <span className="code-gutter" aria-hidden="true">
                {index + 1}
              </span>
              <span className="code-text">{highlightLine(line, `l${index}`)}</span>
            </span>
          ))}
        </code>
      </pre>

      {footer && (
        <div className="font-mono-code border-t border-[#21262d] px-4 py-2.5 text-[11px] text-[#7d8590]">
          {footer}
        </div>
      )}
    </div>
  );
}