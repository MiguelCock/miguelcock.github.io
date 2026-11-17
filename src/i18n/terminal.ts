import { profile } from '../data/profile';

export interface TerminalCopy {
  windowTitle: string;
  inputLabel: string;
  hint: string;
  welcome: string[];
  commands: Record<string, string[]>;
  unknown: (command: string) => string;
  cleared: string[];
}

export const terminalCopy: Record<'en' | 'es', TerminalCopy> = {
  en: {
    windowTitle: 'miguel@medellin: ~/portfolio',
    inputLabel: 'Terminal command',
    hint: 'Type a command or click one:',
    welcome: [
      'portfolio.os v2026.11 — interactive shell',
      "Type 'help' to see what this thing can do.",
    ],
    commands: {
      help: [
        'available commands:',
        '  whoami      who I am',
        '  skills      languages, tools and dubious hobbies',
        '  projects    selected work',
        '  blog        things I write',
        '  contact     how to reach me',
        '  ls          list routes',
        '  cat         read a file (try: cat about.txt)',
        '  lang        switch to Spanish',
        '  clear       clear the screen',
      ],
      whoami: [
        profile.name,
        `${profile.role.en} · ${profile.location.en}`,
        'Pentester by trade, full-stack developer by habit.',
      ],
      skills: [
        'languages   Python · TypeScript · Dart · C3 · Lua · Go · SQL',
        'frontend    React · Astro · HTML · CSS',
        'backend     FastAPI · Django · REST · microservices',
        'cloud       AWS · Terraform · Docker · GitHub Actions · Linux',
        'security    pentesting · OWASP · Burp Suite · nmap · Wireshark',
        'applied AI  Claude Code · RAG · embeddings · PyTorch',
        'game dev    LÖVE2D · raylib · GLSL',
      ],
      projects: [
        '4U          accessible campus navigation · Flutter + FastAPI',
        'TestTracker local-first pentest workspace · Rust + React',
        'yun         canvas-based IDE · C3 + raylib',
        'FunctionalC3 functional patterns for C3',
        '',
        'Run `cd /projects` in your browser: https://miguelcock.github.io/projects/',
      ],
      blog: [
        'Recent transmissions:',
        '  /blog/correcting-gps-with-vision/',
        '  /blog/flecs-bindings-for-c3/',
        '',
        'Everything lives at https://miguelcock.github.io/blog/',
      ],
      contact: [
        `email     ${profile.email}`,
        `github    ${profile.github}`,
        `linkedin  ${profile.linkedin}`,
        '',
        'No phone number, no contact form, no tracking pixels. Just email.',
      ],
      ls: ['about/  blog/  projects/  resume/  contact.txt  secrets.enc'],
      'cat about.txt': [
        'Systems engineer from EAFIT. Cybersecurity engineer and full-stack developer',
        'at Exfil Security. I build tools, break things on purpose, and make small games.',
        '',
        'Full version: https://miguelcock.github.io/about/',
      ],
      sudo: [
        'Nice try.',
        'Permission denied. This incident has been logged.',
        '(It has not been logged. There is no backend.)',
      ],
      exit: ['There is no exit. Only more projects.'],
      pwd: ['/home/miguel/portfolio'],
      date: ['Time is a construct. The deploy is the only truth.'],
    },
    unknown: (command) => `command not found: ${command} — try 'help'`,
    cleared: ['[screen cleared]'],
  },
  es: {
    windowTitle: 'miguel@medellin: ~/portafolio',
    inputLabel: 'Comando de terminal',
    hint: 'Escribe un comando o haz clic en uno:',
    welcome: [
      'portafolio.os v2026.11 — shell interactivo',
      "Escribe 'help' para ver qué puede hacer esto.",
    ],
    commands: {
      help: [
        'comandos disponibles:',
        '  whoami      quién soy',
        '  skills      lenguajes, herramientas y hobbies dudosos',
        '  projects    trabajo seleccionado',
        '  blog        cosas que escribo',
        '  contact     cómo contactarme',
        '  ls          listar rutas',
        '  cat         leer un archivo (prueba: cat about.txt)',
        '  lang        cambiar a inglés',
        '  clear       limpiar la pantalla',
      ],
      whoami: [
        profile.name,
        `${profile.role.es} · ${profile.location.es}`,
        'Pentester de oficio, desarrollador full stack por costumbre.',
      ],
      skills: [
        'lenguajes   Python · TypeScript · Dart · C3 · Lua · Go · SQL',
        'frontend    React · Astro · HTML · CSS',
        'backend     FastAPI · Django · REST · microservicios',
        'nube        AWS · Terraform · Docker · GitHub Actions · Linux',
        'seguridad   pentesting · OWASP · Burp Suite · nmap · Wireshark',
        'IA          Claude Code · RAG · embeddings · PyTorch',
        'game dev    LÖVE2D · raylib · GLSL',
      ],
      projects: [
        '4U          navegación accesible en campus · Flutter + FastAPI',
        'TestTracker workspace de pentesting local-first · Rust + React',
        'yun         IDE basado en lienzo · C3 + raylib',
        'FunctionalC3 patrones funcionales para C3',
        '',
        'Abre /es/proyectos/ en el navegador.',
      ],
      blog: [
        'Transmisiones recientes:',
        '  /es/blog/corregir-gps-con-vision/',
        '  /es/blog/flecs-para-c3/',
        '',
        'Todo vive en https://miguelcock.github.io/es/blog/',
      ],
      contact: [
        `email     ${profile.email}`,
        `github    ${profile.github}`,
        `linkedin  ${profile.linkedin}`,
        '',
        'Sin teléfono, sin formulario, sin píxeles de rastreo. Solo correo.',
      ],
      ls: ['sobre-mi/  blog/  proyectos/  contacto.txt  secretos.enc'],
      'cat about.txt': [
        'Ingeniero de sistemas de EAFIT. Ingeniero en ciberseguridad y desarrollador',
        'full stack en Exfil Security. Construyo herramientas, rompo cosas a propósito',
        'y hago videojuegos pequeños.',
        '',
        'Versión completa: https://miguelcock.github.io/es/sobre-mi/',
      ],
      sudo: [
        'Buen intento.',
        'Permiso denegado. Este incidente quedó registrado.',
        '(No quedó registrado. No hay backend.)',
      ],
      exit: ['No hay salida. Solo más proyectos.'],
      pwd: ['/home/miguel/portafolio'],
      date: ['El tiempo es un constructo. El deploy es la única verdad.'],
    },
    unknown: (command) => `comando no encontrado: ${command} — prueba con 'help'`,
    cleared: ['[pantalla limpia]'],
  },
};
