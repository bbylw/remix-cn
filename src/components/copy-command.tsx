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
    <div className="flex items-center gap-3 rounded-xl border border-fd-border bg-fd-card/80 py-2 pr-2 pl-4 font-mono-code text-[13px] shadow-sm backdrop-blur">
      <span className="text-fd-muted-foreground select-none">$</span>
      <code className="flex-1 truncate text-fd-foreground">{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label="复制安装命令"
        className="grid size-8 shrink-0 place-items-center rounded-lg text-fd-muted-foreground transition hover:bg-fd-accent hover:text-fd-accent-foreground"
      >
        {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
      </button>
    </div>
  );
}
