const timers = new WeakMap<HTMLElement, number>();
let lastMessage = '';
let installed = false;

type CopyCommandEvent = Event & { command?: string; source?: Element | null };

function report(button: HTMLElement, ok: boolean) {
  const tip = button.nextElementSibling;
  if (!(tip instanceof HTMLElement)) return;

  window.clearTimeout(timers.get(button));
  button.removeAttribute('data-copied');
  button.removeAttribute('data-failed');

  let message = ok ? '已复制' : '复制失败';
  // VoiceOver drops a message identical to the previous one, even after the region was emptied.
  if (message === lastMessage) message += '\u00A0';
  lastMessage = message;

  tip.textContent = '';
  void button.offsetWidth;
  button.setAttribute(ok ? 'data-copied' : 'data-failed', '');
  requestAnimationFrame(() => {
    tip.textContent = message;
  });

  timers.set(
    button,
    window.setTimeout(() => {
      button.removeAttribute('data-copied');
      button.removeAttribute('data-failed');
      tip.textContent = '';
    }, 2000),
  );
}

async function copy(button: HTMLElement, target: HTMLElement) {
  // textContent, not innerText: copy targets carry their own line breaks in the DOM,
  // and innerText collapses empty lines away.
  const text = target.matches('input, textarea')
    ? (target as HTMLInputElement).value
    : (target.textContent ?? '');
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    report(button, true);
  } catch {
    report(button, false);
  }
}

export function installCopyCommands() {
  if (installed) return;
  installed = true;

  if ('CommandEvent' in window) {
    // command events do not bubble, and event.target is the commandfor element.
    document.addEventListener(
      'command',
      (event) => {
        const { command, source, target } = event as CopyCommandEvent;
        if (!command?.startsWith('--copy')) return;
        if (source instanceof HTMLElement && target instanceof HTMLElement) void copy(source, target);
      },
      true,
    );
    return;
  }

  document.addEventListener('click', (event) => {
    const button =
      event.target instanceof Element
        ? event.target.closest<HTMLElement>('button[command^="--copy"]')
        : null;
    if (!button) return;
    const targetId = button.getAttribute('commandfor');
    const target = targetId ? document.getElementById(targetId) : null;
    if (target) void copy(button, target);
  });
}
