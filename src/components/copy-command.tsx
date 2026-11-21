import { Check, Copy, TriangleAlert } from 'lucide-react';
import { useEffect, useId } from 'react';
import { installCopyCommands } from '@/lib/copy';

export function CopyCommand({ command }: { command: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');

  useEffect(installCopyCommands, []);

  return (
    <div className="font-mono-code flex w-full items-center gap-3 rounded-lg border border-(--lp-line-strong) bg-(--lp-surface) py-2 pr-2 pl-4 text-[0.8125rem] shadow-sm">
      <span className="text-fd-primary select-none" aria-hidden="true">
        $
      </span>
      <code id={`${uid}-command`} className="flex-1 truncate text-left text-fd-foreground">
        {command}
      </code>
      <span className="copy-wrap">
        <button
          type="button"
          {...({ command: '--copy', commandfor: `${uid}-command` } as object)}
          className="copy-button lp-press flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[0.6875rem] text-(--lp-muted) hover:bg-fd-accent hover:text-fd-accent-foreground active:brightness-95"
        >
          <Copy className="copy-idle size-3.5" aria-hidden="true" />
          <Check className="copy-done size-3.5" aria-hidden="true" />
          <TriangleAlert className="copy-failed size-3.5" aria-hidden="true" />
          <span>
            复制<span className="sr-only">安装命令</span>
          </span>
        </button>
        <span className="copy-tip font-mono-code" role="status" />
      </span>
    </div>
  );
}
