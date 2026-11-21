import { Check, Copy, TriangleAlert } from 'lucide-react';
import {
  Fragment,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/cn';
import { installCopyCommands } from '@/lib/copy';

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

let focusgroupPolyfillPromise: Promise<void> | null = null;

function ensureFocusgroupPolyfill() {
  if (
    Object.hasOwn(HTMLElement.prototype, 'focusGroup') ||
    Object.hasOwn(HTMLElement.prototype, 'focusgroup')
  ) {
    return;
  }
  focusgroupPolyfillPromise ??= import('@microsoft/focusgroup-polyfill').then(
    ({ polyfillBodyAndObserve }) => polyfillBodyAndObserve(),
  );
}

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

function CopyButton({ targetId, label }: { targetId: string; label: string }) {
  return (
    <span className="copy-wrap">
      <button
        type="button"
        aria-label={label}
        {...({ command: '--copy', commandfor: targetId } as object)}
        className="copy-button lp-press grid shrink-0 place-items-center rounded-md text-[#8b949e] hover:bg-white/8 hover:text-[#e6edf3] active:brightness-95"
      >
        <Copy className="copy-idle size-3.5" aria-hidden="true" />
        <Check className="copy-done size-3.5" aria-hidden="true" />
        <TriangleAlert className="copy-failed size-3.5" aria-hidden="true" />
      </button>
      <span className="copy-tip font-mono-code" role="status" />
    </span>
  );
}

function CodeLines({ code }: { code: string }) {
  return (
    <>
      {/* The newline text nodes are the copy source: innerText drops empty lines. */}
      {code
        .replace(/\n$/, '')
        .split('\n')
        .map((line, lineIndex) => (
          <Fragment key={lineIndex}>
            {lineIndex > 0 && '\n'}
            <span className="code-line">
              <span className="code-text">{highlightLine(line, `l${lineIndex}`)}</span>
            </span>
          </Fragment>
        ))}
    </>
  );
}

export function CodeBlock({
  tabs,
  label,
  footer,
  className,
}: {
  tabs: CodeTab[];
  label: string;
  footer?: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const tablistRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasTabs = tabs.length > 1;
  const tab = tabs[active];

  useEffect(() => {
    installCopyCommands();
    if (hasTabs) ensureFocusgroupPolyfill();
  }, [hasTabs]);

  useEffect(() => {
    if (!hasTabs) return;
    panelRefs.current.forEach((node, index) => {
      if (!node) return;
      // React only renders `hidden` as a boolean attribute, so `until-found` has to be
      // applied imperatively for find-in-page to reach inactive panels.
      if (index === active) node.removeAttribute('hidden');
      else node.setAttribute('hidden', 'until-found');
    });
  }, [active, hasTabs]);

  useEffect(() => {
    if (!hasTabs) return;
    const cleanups: (() => void)[] = [];
    panelRefs.current.forEach((node, index) => {
      if (!node) return;
      const sync = () => select(index, false);
      node.addEventListener('beforematch', sync);
      cleanups.push(() => node.removeEventListener('beforematch', sync));
    });
    return () => cleanups.forEach((fn) => fn());
  }, [hasTabs, tabs.length]);

  function select(index: number, scrollTab = true) {
    setActive(index);
    if (!scrollTab) return;
    const list = tablistRef.current;
    if (list && list.scrollWidth > list.clientWidth) {
      tabRefs.current[index]?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
        container: 'nearest',
      } as ScrollIntoViewOptions);
    }
  }

  return (
    <figure
      className={cn(
        'lp-editor overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] shadow-[0_24px_60px_-32px_rgba(0,0,0,0.9)]',
        className,
      )}
      style={{ '--lp-tab-anchor': `--lp-tab-${uid}` } as CSSProperties}
    >
      <div className="flex items-stretch border-b border-[#21262d] bg-[#11151a]">
        {hasTabs ? (
          <div
            ref={tablistRef}
            role="tablist"
            aria-label={label}
            {...({ focusgroup: 'tablist nomemory' } as object)}
            className="lp-tablist flex min-w-0 flex-1 items-stretch overflow-x-auto"
          >
            {tabs.map((t, index) => (
              <button
                key={t.file}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${index}`}
                aria-selected={index === active}
                {...(index === active ? ({ focusgroupstart: '' } as object) : {})}
                onFocus={() => {
                  if (index !== active) select(index);
                }}
                onClick={() => select(index)}
                className={cn(
                  'lp-tab lp-press font-mono-code flex shrink-0 items-center px-4 py-2.5 text-xs',
                  index === active
                    ? 'bg-[#0d1117] text-[#e6edf3]'
                    : 'text-[#8b949e] hover:bg-white/4 hover:text-[#c9d1d9]',
                )}
              >
                {t.file}
              </button>
            ))}
          </div>
        ) : (
          <figcaption
            id={`${uid}-caption`}
            className="font-mono-code flex min-w-0 flex-1 items-center border-t-2 border-fd-primary bg-[#0d1117] px-4 py-2.5 text-xs text-[#e6edf3]"
          >
            {tab.file}
          </figcaption>
        )}
        <div className="flex items-center gap-2 border-l border-[#21262d] px-2.5">
          <span className="font-mono-code hidden text-[0.6875rem] tracking-wide text-[#8b949e] uppercase sm:inline">
            {tab.lang ?? 'ts'}
          </span>
          <CopyButton targetId={`${uid}-code-${active}`} label={`复制 ${tab.file} 代码`} />
        </div>
      </div>

      {hasTabs ? (
        <div className="lp-panels">
          {tabs.map((t, index) => (
            <div
              key={t.file}
              ref={(node) => {
                panelRefs.current[index] = node;
              }}
              role="tabpanel"
              id={`${uid}-panel-${index}`}
              aria-labelledby={`${uid}-tab-${index}`}
              className="lp-panel"
              {...(index === active ? {} : { hidden: true })}
            >
              <pre
                role="region"
                aria-labelledby={`${uid}-tab-${index}`}
                className="font-mono-code overflow-x-auto py-4 text-[0.8125rem] leading-[1.85] text-[#d7e0ea]"
                tabIndex={index === active ? 0 : undefined}
              >
                <code id={`${uid}-code-${index}`}>
                  <CodeLines code={t.code} />
                </code>
              </pre>
            </div>
          ))}
        </div>
      ) : (
        <pre
          role="region"
          aria-labelledby={`${uid}-caption`}
          className="font-mono-code overflow-x-auto py-4 text-[0.8125rem] leading-[1.85] text-[#d7e0ea]"
          tabIndex={0}
        >
          <code id={`${uid}-code-0`}>
            <CodeLines code={tab.code} />
          </code>
        </pre>
      )}

      {footer && (
        <div className="font-mono-code border-t border-[#21262d] px-4 py-2.5 text-[0.6875rem] text-[#8b949e]">
          {footer}
        </div>
      )}
    </figure>
  );
}
