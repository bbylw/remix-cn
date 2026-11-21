import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="font-mono-code flex w-full items-center gap-3 rounded-lg border border-(--lp-line) bg-(--lp-surface) py-2 pr-2 pl-4 text-[13px] shadow-sm">
      <span className="text-fd-primary select-none">$</span>
      <code className="flex-1 truncate text-left text-fd-foreground">{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? '已复制安装命令' : '复制安装命令'}
        className="flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] text-(--lp-muted) transition hover:bg-fd-accent hover:text-fd-accent-foreground"
      >
        {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
        <span className="hidden sm:inline">{copied ? '已复制' : '复制'}</span>
      </button>
    </div>
  );
}