import type { Dictionary } from './en'

const es: Dictionary = {
  meta: {
    title: 'JOJA-TECH — Convirtiendo ideas en tecnología',
    description:
      'JOJA-TECH es una organización de desarrollo de software que explora ideas, construye herramientas útiles y crea tecnología a través de la ingeniería y la colaboración open source.',
  },
  nav: {
    projects: 'Proyectos',
    about: 'Nosotros',
    technologies: 'Tecnologías',
    github: 'GitHub',
    primaryLabel: 'Navegación principal',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    language: 'Idioma',
    skipToContent: 'Saltar al contenido',
  },
  hero: {
    badge: 'Open source en GitHub',
    titleStart: 'Convirtiendo ideas',
    titleEmphasis: 'en tecnología.',
    description:
      'JOJA-TECH es una organización de desarrollo de software que explora ideas, construye herramientas útiles y crea tecnología a través de la ingeniería y la colaboración open source.',
    primaryCta: 'Explorar proyectos',
    secondaryCta: 'Ver en GitHub',
    visualLabel: 'Diagrama abstracto de módulos de software interconectados',
  },
  featured: {
    eyebrow: 'Trabajo destacado',
    title: 'Proyectos seleccionados',
    description: 'Una mirada más cercana a algunos repositorios de la organización.',
  },
  catalog: {
    eyebrow: 'Catálogo de repositorios',
    title: 'Todos los proyectos públicos',
    description: 'Busca y filtra los repositorios públicos de la organización JOJA-TECH en GitHub.',
    searchLabel: 'Buscar proyectos',
    searchPlaceholder: 'Busca por nombre, descripción o tema…',
    filterLabel: 'Filtrar por lenguaje',
    allLanguages: 'Todos',
    results: '{count} de {total} proyectos',
    emptyTitle: 'Ningún proyecto coincide con tu búsqueda',
    emptyDescription: 'Prueba con otra palabra clave o limpia los filtros activos.',
    clearFilters: 'Limpiar filtros',
    noReposTitle: 'Aún no hay repositorios públicos',
    noReposDescription: 'Los nuevos proyectos aparecerán aquí en cuanto se publiquen en GitHub.',
    errorTitle: 'No se pudieron cargar los repositorios',
    errorDescription: 'GitHub no respondió como se esperaba. Aun así puedes ver todos los proyectos directamente en GitHub.',
    rateLimitDescription:
      'Se alcanzó el límite de solicitudes de la API de GitHub. La lista se actualizará automáticamente en breve; mientras tanto puedes ver los proyectos en GitHub.',
    viewAll: 'Ver todos los repositorios',
  },
  card: {
    openApp: 'Abrir aplicación',
    viewRepo: 'Ver repositorio',
    readDocs: 'Leer documentación',
    source: 'Código',
    updated: 'Actualizado {date}',
    noDescription: 'Aún no tiene descripción.',
    featured: 'Destacado',
    archived: 'Archivado',
    live: 'En línea',
    opensInNewTab: '(se abre en una pestaña nueva)',
  },
  about: {
    eyebrow: 'Nosotros',
    titleStart: 'Tecnología construida con',
    titleEmphasis: 'curiosidad y propósito.',
    body: 'Creemos que el software significativo nace de la curiosidad, una ingeniería cuidadosa y la disposición a experimentar. JOJA-TECH reúne proyectos e ideas en un solo lugar, desde herramientas prácticas hasta software exploratorio.',
    principles: [
      { title: 'Ingeniería', description: 'Soluciones pensadas, construidas con código mantenible.' },
      { title: 'Exploración', description: 'Experimentación con nuevas herramientas, tecnologías e ideas.' },
      { title: 'Open source', description: 'Compartir proyectos y hacer el software accesible siempre que sea posible.' },
    ],
  },
  technologies: {
    eyebrow: 'Tecnologías',
    title: 'De qué están hechos nuestros repositorios',
    description: 'Detectadas automáticamente a partir de los metadatos de lenguaje de cada repositorio público.',
    repoCount: '{count} repos',
    repoCountOne: '1 repo',
    empty: 'Los datos de tecnologías aparecerán cuando los metadatos de los repositorios estén disponibles.',
  },
  footer: {
    description: 'Una organización de desarrollo de software que convierte ideas en tecnología mediante ingeniería y open source.',
    navigation: 'Navegación',
    resources: 'Recursos',
    organization: 'Organización en GitHub',
    allRepos: 'Todos los repositorios públicos',
    rights: 'Todos los derechos reservados.',
  },
}

export default es
