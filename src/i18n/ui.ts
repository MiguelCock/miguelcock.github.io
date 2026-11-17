export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const routes = {
  home: { en: '/', es: '/es/' },
  projects: { en: '/projects/', es: '/es/proyectos/' },
  about: { en: '/about/', es: '/es/sobre-mi/' },
  blog: { en: '/blog/', es: '/es/blog/' },
} as const;

export type RouteKey = keyof typeof routes;

export function route(lang: Lang, key: RouteKey): string {
  return routes[key][lang];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'es' : 'en';
}

export interface UIStrings {
  nav: {
    home: string;
    projects: string;
    about: string;
    blog: string;
  };
  skip: string;
  menu: string;
  language: string;
  languageShort: string;
  footer: {
    built: string;
    rights: string;
    elsewhere: string;
    contact: string;
    exit: string;
  };
  common: {
    viewAll: string;
    readMore: string;
    backToBlog: string;
    backHome: string;
    repo: string;
    stack: string;
    copyEmail: string;
    copied: string;
    featured: string;
    latest: string;
    filterAll: string;
    openInNewTab: string;
  };
  notFound: {
    code: string;
    title: string;
    body: string;
    hint: string;
    home: string;
  };
}

const en: UIStrings = {
  nav: {
    home: 'home',
    projects: 'projects',
    about: 'about',
    blog: 'blog',
  },
  skip: 'Skip to content',
  menu: 'Toggle navigation',
  language: 'Ver en español',
  languageShort: 'ES',
  footer: {
    built: 'Built with Astro. Static HTML, no cookies, no trackers, no analytics.',
    rights: 'All rights reserved.',
    elsewhere: 'Elsewhere',
    contact: 'Contact',
    exit: 'exit 0',
  },
  common: {
    viewAll: 'View all projects',
    readMore: 'Read more',
    backToBlog: 'All posts',
    backHome: 'Back to home',
    repo: 'Repository',
    stack: 'Stack',
    copyEmail: 'Copy email',
    copied: 'Copied!',
    featured: 'Selected work',
    latest: 'Latest transmissions',
    filterAll: 'all',
    openInNewTab: 'opens in a new tab',
  },
  notFound: {
    code: 'PAGE_NOT_FOUND',
    title: 'Segmentation fault (core dumped)',
    body: 'This route does not exist. It may have moved, been deleted, or never been deployed.',
    hint: 'Try one of these instead:',
    home: 'Back to home',
  },
};

const es: UIStrings = {
  nav: {
    home: 'inicio',
    projects: 'proyectos',
    about: 'sobre mí',
    blog: 'blog',
  },
  skip: 'Saltar al contenido',
  menu: 'Abrir navegación',
  language: 'View in English',
  languageShort: 'EN',
  footer: {
    built: 'Hecho con Astro. HTML estático, sin cookies, sin rastreadores, sin analítica.',
    rights: 'Todos los derechos reservados.',
    elsewhere: 'En otros lugares',
    contact: 'Contacto',
    exit: 'exit 0',
  },
  common: {
    viewAll: 'Ver todos los proyectos',
    readMore: 'Leer más',
    backToBlog: 'Todas las entradas',
    backHome: 'Volver al inicio',
    repo: 'Repositorio',
    stack: 'Stack',
    copyEmail: 'Copiar correo',
    copied: '¡Copiado!',
    featured: 'Trabajo seleccionado',
    latest: 'Últimas transmisiones',
    filterAll: 'todos',
    openInNewTab: 'abre en una pestaña nueva',
  },
  notFound: {
    code: 'PAGE_NOT_FOUND',
    title: 'Segmentation fault (core dumped)',
    body: 'Esta ruta no existe. Puede que se haya movido, eliminado o que nunca se haya desplegado.',
    hint: 'Prueba con una de estas:',
    home: 'Volver al inicio',
  },
};

export const ui: Record<Lang, UIStrings> = { en, es };

export function t(lang: Lang): UIStrings {
  return ui[lang];
}
