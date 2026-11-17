type Lang = 'en' | 'es';

const toastText: Record<Lang, { copied: string; arcade: string }> = {
  en: {
    copied: 'Copied to clipboard.',
    arcade: 'ACHIEVEMENT UNLOCKED — arcade mode',
  },
  es: {
    copied: 'Copiado al portapapeles.',
    arcade: 'LOGRO DESBLOQUEADO — modo arcade',
  },
};

let revealObserver: IntersectionObserver | undefined;
let toastTimer: number | undefined;

function currentLang(): Lang {
  return document.documentElement.lang === 'es' ? 'es' : 'en';
}

function showToast(message: string): void {
  const toast = document.querySelector<HTMLElement>('[data-toast]');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

function initReveal(): void {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (items.length === 0) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  revealObserver?.disconnect();
  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        revealObserver?.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );

  items.forEach((item) => {
    if (item.classList.contains('is-visible')) return;
    revealObserver?.observe(item);
  });
}

function initNav(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const nav = document.querySelector<HTMLElement>('[data-nav]');

  const setScrolled = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  setScrolled();
  if (!document.documentElement.dataset.scrollBound) {
    document.documentElement.dataset.scrollBound = 'true';
    window.addEventListener('scroll', setScrolled, { passive: true });
  }

  if (!toggle || !nav) return;
  if (toggle.dataset.bound === 'true') return;
  toggle.dataset.bound = 'true';

  const close = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));

  if (!document.documentElement.dataset.navKeysBound) {
    document.documentElement.dataset.navKeysBound = 'true';
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      document.querySelector<HTMLElement>('[data-nav]')?.classList.remove('is-open');
      document
        .querySelector<HTMLButtonElement>('[data-nav-toggle]')
        ?.setAttribute('aria-expanded', 'false');
    });
  }
}

function initSpotlights(): void {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-project-card]').forEach((card) => {
    if (card.dataset.spotlight === 'true') return;
    card.dataset.spotlight = 'true';
    card.addEventListener(
      'pointermove',
      (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      },
      { passive: true },
    );
  });
}

function initCopyButtons(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
    if (button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        showToast(toastText[currentLang()].copied);
      } catch {
        window.location.href = `mailto:${value}`;
      }
    });
  });
}

function initArcade(): void {
  if ((window as Window & { __mcArcadeBound?: boolean }).__mcArcadeBound) return;
  (window as Window & { __mcArcadeBound?: boolean }).__mcArcadeBound = true;

  const sequence = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];
  let cursor = 0;

  document.addEventListener('keydown', (event) => {
    const expected = sequence[cursor];
    const pressed = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (pressed === expected) {
      cursor += 1;
      if (cursor === sequence.length) {
        cursor = 0;
        const active = document.documentElement.classList.toggle('arcade');
        if (active) showToast(toastText[currentLang()].arcade);
      }
      return;
    }
    cursor = pressed === sequence[0] ? 1 : 0;
  });
}

function boot(): void {
  initReveal();
  initNav();
  initSpotlights();
  initCopyButtons();
  initArcade();
}

document.addEventListener('astro:page-load', boot);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
