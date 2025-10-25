// Lightweight client-side protections to deter casual users from opening DevTools.
// NOTE: This cannot fully prevent determined users from opening DevTools. It only
// prevents common keyboard shortcuts, disables the context menu, and tries to detect
// when DevTools is opened to optionally show a lock overlay. Use for UX deterrence only.

function preventShortcuts() {
  function onKey(e: KeyboardEvent) {
    const key = e.key.toUpperCase();

    // Common DevTools or view-source shortcuts
    const blocked = (
      // F12
      e.key === 'F12' ||
      // Ctrl/Cmd + Shift + I / J / C / K
      ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I', 'J', 'C', 'K'].includes(key)) ||
      // Ctrl/Cmd + U (view source)
      ((e.ctrlKey || e.metaKey) && key === 'U')
    );

    if (blocked) {
      e.preventDefault();
      e.stopPropagation();
      // optional gentle feedback
      // console.log('Shortcut blocked');
      return false;
    }
  }

  window.addEventListener('keydown', onKey, { capture: true });
}

function disableContextMenu() {
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
}

function createLockOverlay() {
  const id = 'devtools-lock-overlay';
  let el = document.getElementById(id) as HTMLDivElement | null;
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    Object.assign(el.style, {
      position: 'fixed',
      inset: '0',
      background: 'rgba(0,0,0,0.85)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '999999',
      padding: '24px',
      textAlign: 'center'
    });
    el.innerHTML = '<div style="max-width:720px"><h2 style="margin-bottom:12px">Developer tools detected</h2><p style="opacity:0.9">For security reasons this page has disabled the UI while developer tools are open. Please close developer tools to continue.</p></div>';
    document.body.appendChild(el);
  }
  return el;
}

function removeLockOverlay() {
  const el = document.getElementById('devtools-lock-overlay');
  if (el && el.parentNode) el.parentNode.removeChild(el);
}

function detectDevTools(opts: { onOpen?: () => void; onClose?: () => void } = {}) {
  let open = false;

  function check() {
    const threshold = 160; // px
    const widthDiff = Math.abs(window.outerWidth - window.innerWidth);
    const heightDiff = Math.abs(window.outerHeight - window.innerHeight);

    const isOpen = widthDiff > threshold || heightDiff > threshold || /./.toString() !== /./.toString();
    if (isOpen && !open) {
      open = true;
      opts.onOpen && opts.onOpen();
    } else if (!isOpen && open) {
      open = false;
      opts.onClose && opts.onClose();
    }
  }

  const id = window.setInterval(check, 1000);
  return () => window.clearInterval(id);
}

export default function installDevtoolsProtections() {
  if (typeof window === 'undefined') return;

  preventShortcuts();
  disableContextMenu();

  // show a lock overlay (deterrent) when devtools are detected
  const stop = detectDevTools({
    onOpen: () => createLockOverlay(),
    onClose: () => removeLockOverlay()
  });

  // return cleanup
  return () => stop();
}
