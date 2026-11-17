export type Localized = { en: string; es: string };
export type LocalizedList = { en: string[]; es: string[] };

export interface ExperienceItem {
  company: string;
  role: Localized;
  period: Localized;
  location: Localized;
  summary: Localized;
  highlights: LocalizedList;
  stack: string[];
}

export interface EducationItem {
  school: string;
  degree: Localized;
  period: Localized;
  detail?: Localized;
}

export interface SkillGroup {
  label: Localized;
  items: string[];
}

export interface Certification {
  issuer: string;
  items: string[];
}

export interface Stat {
  label: Localized;
  value: Localized;
}

export const profile = {
  name: 'Miguel Angel Cock Cano',
  displayName: 'Miguel Cock',
  email: 'mcockc@outlook.com',
  location: {
    en: 'Medellín, Colombia',
    es: 'Medellín, Colombia',
  },
  github: 'https://github.com/MiguelCock',
  githubHandle: 'MiguelCock',
  linkedin: 'https://www.linkedin.com/in/miguel-angel-cock-cano-50b88b243/',
  linkedinHandle: 'miguel-angel-cock-cano-50b88b243',
  role: {
    en: 'Cybersecurity engineer & full-stack developer',
    es: 'Ingeniero en ciberseguridad y desarrollador full stack',
  },
  tagline: {
    en: 'I build tools that ship, break things on purpose, and occasionally make games.',
    es: 'Construyo herramientas que funcionan, rompo cosas a propósito y de vez en cuando hago videojuegos.',
  },
  summary: {
    en: `Systems engineer from EAFIT with a specialization in software development and a master's in engineering in progress. I work as a pentester and full-stack developer at Exfil Security, a US company, where I have built internal tools end-to-end with Python, React, AWS and Terraform. I care about software that is useful, secure, and pleasant to use.`,
    es: `Ingeniero de sistemas de EAFIT, con especialización en desarrollo de software y una maestría en ingeniería en curso. Trabajo como pentester y desarrollador full stack en Exfil Security, una empresa de Estados Unidos, donde he construido herramientas internas de extremo a extremo con Python, React, AWS y Terraform. Me importa el software útil, seguro y agradable de usar.`,
  },
  now: {
    en: 'Building internal security tooling at Exfil Security, finishing an MSc in Software Development at EAFIT, and writing C3 libraries on the side. Open to full-stack roles in Medellín.',
    es: 'Construyendo herramientas internas de seguridad en Exfil Security, terminando una maestría en Desarrollo de Software en EAFIT y escribiendo librerías de C3 por gusto. Abierto a roles full stack en Medellín.',
  },
  stats: [
    {
      label: { en: 'Current role', es: 'Rol actual' },
      value: { en: 'Exfil Security', es: 'Exfil Security' },
    },
    {
      label: { en: 'Base', es: 'Base' },
      value: { en: 'Medellín, CO', es: 'Medellín, CO' },
    },
    {
      label: { en: 'Studying', es: 'Estudiando' },
      value: { en: 'MSc @ EAFIT', es: 'Maestría @ EAFIT' },
    },
    {
      label: { en: 'Building', es: 'Construyendo' },
      value: { en: 'C3 libraries', es: 'Librerías C3' },
    },
  ] satisfies Stat[],
  experience: [
    {
      company: 'Exfil Security',
      role: {
        en: 'Cybersecurity Engineer & Full Stack Developer',
        es: 'Ingeniero en Ciberseguridad y Desarrollador Full Stack',
      },
      period: { en: 'Jan 2025 — present', es: 'Ene 2025 — presente' },
      location: { en: 'Remote · United States', es: 'Remoto · Estados Unidos' },
      summary: {
        en: 'Pentesting by day, internal product engineering the rest of the time. I ship tools that make the security team faster.',
        es: 'Pentesting de día, ingeniería de producto interno el resto del tiempo. Construyo herramientas que hacen más rápido al equipo de seguridad.',
      },
      highlights: {
        en: [
          'Designed and shipped an end-to-end SOW generation application with a React frontend.',
          'Built a retrieval-augmented chatbot over internal documentation, also with a React frontend.',
          'Provisioned AWS infrastructure with Terraform and managed application secrets.',
          'Modeled and operated data in DynamoDB and PostgreSQL/Supabase.',
          'Applied security testing and secure development practices to every project.',
          'Work 100% in English with US teams and clients.',
        ],
        es: [
          'Diseñé y entregué de extremo a extremo una aplicación de generación de SOW con frontend en React.',
          'Construí un chatbot con recuperación aumentada sobre documentación interna, también con frontend en React.',
          'Aprovisioné infraestructura en AWS con Terraform y gestioné secretos de la aplicación.',
          'Modelé y operé datos en DynamoDB y PostgreSQL/Supabase.',
          'Apliqué pruebas de seguridad y buenas prácticas de desarrollo seguro en cada proyecto.',
          'Trabajo 100% en inglés con equipos y clientes de Estados Unidos.',
        ],
      },
      stack: ['Python', 'React', 'AWS', 'Terraform', 'DynamoDB', 'Supabase', 'PostgreSQL'],
    },
    {
      company: 'Universidad Icesi',
      role: {
        en: 'Full Stack Developer · Contract',
        es: 'Desarrollador Full Stack · Contrato',
      },
      period: { en: 'Sep 2026 — Nov 2026', es: 'Sep 2026 — Nov 2026' },
      location: { en: 'Cali, Colombia · 4U', es: 'Cali, Colombia · 4U' },
      summary: {
        en: 'A three-month contract to take 4U from an idea to a working accessibility product for university campuses.',
        es: 'Un contrato de tres meses para llevar 4U de una idea a un producto de accesibilidad funcional para campus universitarios.',
      },
      highlights: {
        en: [
          'Led end-to-end development of an accessibility-first navigation app, supported by AI coding agents.',
          'Coordinated seven FastAPI microservices behind a single API gateway.',
          'Implemented visual GPS correction with place-recognition embeddings and an Unscented Kalman filter.',
          'Deployed to AWS EC2 with a GitHub Actions CI/CD pipeline.',
          'Built a Flutter app with user/admin roles, spoken navigation, and a fully localized UI.',
        ],
        es: [
          'Lideré el desarrollo de extremo a extremo de una app de navegación centrada en accesibilidad, apoyado en agentes de IA.',
          'Coordiné siete microservicios FastAPI detrás de un único API gateway.',
          'Implementé corrección visual del GPS con embeddings de reconocimiento de lugares y un filtro de Kalman unscented.',
          'Desplegué en AWS EC2 con un pipeline CI/CD en GitHub Actions.',
          'Construí una app Flutter con roles de usuario/administrador, navegación hablada y UI completamente localizada.',
        ],
      },
      stack: ['Flutter', 'Dart', 'FastAPI', 'Qdrant', 'PyTorch', 'Supabase', 'AWS EC2'],
    },
  ] satisfies ExperienceItem[],
  education: [
    {
      school: 'Universidad EAFIT',
      degree: {
        en: 'MSc in Engineering · Software Development',
        es: 'Maestría en Ingeniería · Desarrollo de Software',
      },
      period: { en: 'Jul 2026 — Jun 2027', es: 'Jul 2026 — Jun 2027' },
      detail: { en: 'In progress', es: 'En curso' },
    },
    {
      school: 'Universidad EAFIT',
      degree: {
        en: 'Specialization in Software Development',
        es: 'Especialización en Desarrollo de Software',
      },
      period: { en: 'Jan 2026 — Jun 2026', es: 'Ene 2026 — Jun 2026' },
    },
    {
      school: 'Universidad EAFIT',
      degree: {
        en: 'BSc in Systems Engineering',
        es: 'Ingeniería en Sistemas',
      },
      period: { en: 'Jul 2020 — Dec 2025', es: 'Jul 2020 — Dic 2025' },
    },
    {
      school: 'Universidad EAFIT',
      degree: {
        en: 'Teaching assistant · Calculus & Mathematics',
        es: 'Monitor · Cálculo y Matemáticas',
      },
      period: { en: 'Jan 2023 — Jun 2024', es: 'Ene 2023 — Jun 2024' },
      detail: {
        en: 'Calculus 1/2 and Mathematics 1/2',
        es: 'Cálculo 1/2 y Matemáticas 1/2',
      },
    },
  ] satisfies EducationItem[],
  skills: [
    {
      label: { en: 'Languages', es: 'Lenguajes' },
      items: ['Python', 'TypeScript', 'JavaScript', 'Dart', 'C3', 'Lua', 'Go', 'SQL'],
    },
    {
      label: { en: 'Frontend', es: 'Frontend' },
      items: ['React', 'Astro', 'HTML', 'CSS'],
    },
    {
      label: { en: 'Backend', es: 'Backend' },
      items: ['FastAPI', 'Django', 'REST APIs', 'Microservices'],
    },
    {
      label: { en: 'Data', es: 'Datos' },
      items: ['PostgreSQL', 'Supabase', 'DynamoDB', 'Qdrant'],
    },
    {
      label: { en: 'Cloud & DevOps', es: 'Nube y DevOps' },
      items: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'Linux'],
    },
    {
      label: { en: 'Security', es: 'Seguridad' },
      items: ['Pentesting', 'OWASP', 'Burp Suite', 'nmap', 'Wireshark', 'API security'],
    },
    {
      label: { en: 'Applied AI', es: 'IA aplicada' },
      items: ['Claude Code & agents', 'RAG', 'Embeddings', 'PyTorch'],
    },
    {
      label: { en: 'Game dev', es: 'Game dev' },
      items: ['LÖVE2D', 'raylib', 'GLSL', 'OpenGL / WebGPU'],
    },
  ] satisfies SkillGroup[],
  certifications: [
    {
      issuer: 'TryHackMe',
      items: [
        'Junior Penetration Tester',
        'Cyber Security 101',
        'Web Fundamentals',
        'Pre Security',
      ],
    },
    {
      issuer: 'API Sec University',
      items: [
        'Securing LLM and NLP APIs',
        'API Security for PCI Compliance',
        'API Security Fundamentals ’25',
        'Getting Started in API Pen-Testing',
      ],
    },
  ] satisfies Certification[],
  languages: [
    {
      name: { en: 'Spanish', es: 'Español' },
      level: { en: 'Native', es: 'Nativo' },
    },
    {
      name: { en: 'English', es: 'Inglés' },
      level: { en: 'B2 · daily professional use', es: 'B2 · uso profesional diario' },
    },
  ],
  award: {
    title: { en: 'Inventiva 2024-1 · Best Performance', es: 'Inventiva 2024-1 · Best Performance' },
    detail: {
      en: 'Awarded for DnD-AI, an AI dungeon master with an interactive map and multiplayer combat.',
      es: 'Otorgado por DnD-AI, un dungeon master con IA, mapa interactivo y combate multijugador.',
    },
  },
} as const;
