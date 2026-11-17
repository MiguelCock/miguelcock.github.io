import type { ImageMetadata } from 'astro';
import fourUSession from '../assets/projects/4u/session-tracking.webp';
import fourUMap from '../assets/projects/4u/map-home.webp';

export type Localized = { en: string; es: string };
export type ProjectTag = 'security' | 'fullstack' | 'systems' | 'games' | 'ai';

export interface Project {
  slug: string;
  name: string;
  period: string;
  status: Localized;
  tagline: Localized;
  description: Localized;
  stack: string[];
  tags: ProjectTag[];
  repo?: string;
  image?: ImageMetadata;
  imageAlt?: Localized;
  gallery?: Array<{ image: ImageMetadata; alt: Localized }>;
  accent: string;
  glyph: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: '4u',
    name: '4U',
    period: '2026',
    status: { en: 'Icesi contract', es: 'Contrato Icesi' },
    tagline: {
      en: 'Accessible campus navigation with vision-corrected GPS',
      es: 'Navegación accesible en campus con GPS corregido por visión',
    },
    description: {
      en: 'A Flutter app plus seven FastAPI microservices that correct phone GPS from 5–20 m to under 5 m using place-recognition embeddings, Qdrant and an Unscented Kalman filter, then guide blind users with spoken turn-by-turn instructions.',
      es: 'Una app Flutter y siete microservicios FastAPI que corrigen el GPS del teléfono de 5–20 m a menos de 5 m usando embeddings de reconocimiento de lugares, Qdrant y un filtro de Kalman unscented, para guiar a usuarios ciegos con instrucciones habladas.',
    },
    stack: ['Flutter', 'Dart', 'FastAPI', 'PyTorch', 'Qdrant', 'Supabase', 'AWS EC2'],
    tags: ['fullstack', 'ai'],
    repo: 'https://github.com/MiguelCock/4u',
    image: fourUSession,
    imageAlt: {
      en: '4U session review screen comparing raw GPS, corrected position and the planned route on a campus map',
      es: 'Pantalla de revisión de sesión de 4U comparando GPS crudo, posición corregida y ruta planeada sobre el mapa del campus',
    },
    gallery: [
      {
        image: fourUMap,
        alt: {
          en: '4U mobile map screen with university search, connection filters and anchor points',
          es: 'Pantalla de mapa móvil de 4U con búsqueda de universidades, filtros de conexión y puntos ancla',
        },
      },
    ],
    accent: '#5df2a5',
    glyph: '4U',
    featured: true,
  },
  {
    slug: 'testtracker',
    name: 'TestTracker',
    period: '2026',
    status: { en: 'In development', es: 'En desarrollo' },
    tagline: {
      en: 'A local-first workspace for penetration-testing engagements',
      es: 'Un espacio de trabajo local-first para proyectos de pentesting',
    },
    description: {
      en: 'A desktop app that replaces spreadsheet workflows with an encrypted vault for scope, test cases, findings, evidence, review sign-offs and audit history — plus PDF, DOCX and XLSX report generation.',
      es: 'Una app de escritorio que reemplaza las hojas de cálculo con una bóveda cifrada para alcance, casos de prueba, hallazgos, evidencia, firmas de revisión e historial de auditoría, además de reportes PDF, DOCX y XLSX.',
    },
    stack: ['Rust', 'Tauri 2', 'React 19', 'TypeScript', 'SQLCipher', 'Argon2id'],
    tags: ['security', 'fullstack'],
    repo: 'https://github.com/MiguelCock/TestTracker',
    accent: '#ff5f9e',
    glyph: 'TT',
    featured: true,
  },
  {
    slug: 'yun',
    name: 'yun',
    period: '2026',
    status: { en: 'Open source', es: 'Código abierto' },
    tagline: {
      en: 'A canvas-based code IDE written in C3',
      es: 'Un IDE basado en lienzo escrito en C3',
    },
    description: {
      en: 'Files live as movable cards on an infinite canvas instead of tabs. Built with C3 and raylib 6, with tree-sitter highlighting for 30+ languages, LSP hover/definitions/completion, project-wide search and a Vim-inspired keyboard flow.',
      es: 'Los archivos viven como tarjetas movibles en un lienzo infinito en vez de pestañas. Hecho con C3 y raylib 6, con resaltado de tree-sitter para más de 30 lenguajes, LSP, búsqueda global y un flujo de teclado inspirado en Vim.',
    },
    stack: ['C3', 'raylib', 'tree-sitter', 'LSP'],
    tags: ['systems'],
    repo: 'https://github.com/MiguelCock/yun',
    accent: '#6ee7ff',
    glyph: 'Y',
    featured: true,
  },
  {
    slug: 'functional-c3',
    name: 'FunctionalC3',
    period: '2026',
    status: { en: 'Open source', es: 'Código abierto' },
    tagline: {
      en: 'Functional programming extensions for C3',
      es: 'Extensiones de programación funcional para C3',
    },
    description: {
      en: 'map, filter, for_each, contains and other functional operations for C3 slices of any type, built with C3 generics and aliases in pure C3.',
      es: 'map, filter, for_each, contains y otras operaciones funcionales para slices de C3 de cualquier tipo, construidas con genéricos y alias en C3 puro.',
    },
    stack: ['C3', 'Generics', 'Functional programming'],
    tags: ['systems'],
    repo: 'https://github.com/MiguelCock/FunctionalC3',
    accent: '#ffcc66',
    glyph: 'λ',
    featured: true,
  },
  {
    slug: 'flecs-c3',
    name: 'flecsC3',
    period: '2026',
    status: { en: 'Open source', es: 'Código abierto' },
    tagline: {
      en: 'Idiomatic Flecs bindings for C3',
      es: 'Bindings idiomáticos de Flecs para C3',
    },
    description: {
      en: 'Bindings for the Flecs 4.1.6 entity component system that bundle the amalgamated C sources, so the library is self-contained and needs no system-wide Flecs install.',
      es: 'Bindings para el entity component system Flecs 4.1.6 que incluyen las fuentes C amalgamadas, así que la librería es autocontenida y no requiere una instalación global de Flecs.',
    },
    stack: ['C3', 'Flecs', 'ECS', 'C interop'],
    tags: ['systems', 'games'],
    repo: 'https://github.com/MiguelCock/flecsC3',
    accent: '#b388ff',
    glyph: 'E',
    featured: false,
  },
  {
    slug: 'lua54-c3l',
    name: 'lua54.c3l',
    period: '2026',
    status: { en: 'Experimental', es: 'Experimental' },
    tagline: {
      en: 'A Lua 5.4 runtime and binding for C3',
      es: 'Un runtime y binding de Lua 5.4 para C3',
    },
    description: {
      en: 'An early-stage port of Lua 5.4 to C3, packaged as a C3 library. Actively developed and intentionally experimental.',
      es: 'Un port temprano de Lua 5.4 a C3, empaquetado como librería de C3. En desarrollo activo y deliberadamente experimental.',
    },
    stack: ['C3', 'Lua 5.4', 'C interop'],
    tags: ['systems'],
    repo: 'https://github.com/MiguelCock/lua54.c3l',
    accent: '#7aa2ff',
    glyph: 'L',
    featured: false,
  },
  {
    slug: 'lua-space',
    name: 'Lua Space',
    period: '2025',
    status: { en: 'Nova / EAFIT', es: 'Nova / EAFIT' },
    tagline: {
      en: 'A tiny solar system of co-op arcade games',
      es: 'Un pequeño sistema solar de juegos arcade cooperativos',
    },
    description: {
      en: 'Each planet hosts a different game you can play with a friend: Space Invaders, Tanks and Pong. Built with LÖVE2D, with particle systems and GLSL shaders.',
      es: 'Cada planeta alberga un juego distinto para jugar con un amigo: Space Invaders, Tanks y Pong. Hecho con LÖVE2D, con sistemas de partículas y shaders GLSL.',
    },
    stack: ['Lua', 'LÖVE2D', 'GLSL'],
    tags: ['games'],
    repo: 'https://github.com/MiguelCock/lua_space',
    accent: '#ff9f5a',
    glyph: '◎',
    featured: false,
  },
  {
    slug: 'wgpu-in-odin',
    name: 'wgpu_in_odin',
    period: '2026',
    status: { en: 'Learning project', es: 'Proyecto de aprendizaje' },
    tagline: {
      en: 'Following LearnWebGPU from scratch in Odin',
      es: 'Siguiendo LearnWebGPU desde cero en Odin',
    },
    description: {
      en: 'A hands-on graphics programming notebook: implementing the LearnWebGPU guide in the Odin language to understand the pipeline beyond the tutorial.',
      es: 'Un cuaderno de programación gráfica: implementar la guía LearnWebGPU en el lenguaje Odin para entender el pipeline más allá del tutorial.',
    },
    stack: ['Odin', 'WebGPU', 'WGSL'],
    tags: ['games', 'systems'],
    repo: 'https://github.com/MiguelCock/wgpu_in_odin',
    accent: '#5eead4',
    glyph: 'W',
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const projectTags: Array<{ id: ProjectTag; en: string; es: string }> = [
  { id: 'security', en: 'security', es: 'seguridad' },
  { id: 'fullstack', en: 'full-stack', es: 'full stack' },
  { id: 'systems', en: 'systems', es: 'sistemas' },
  { id: 'games', en: 'game dev', es: 'game dev' },
  { id: 'ai', en: 'applied AI', es: 'IA aplicada' },
];
