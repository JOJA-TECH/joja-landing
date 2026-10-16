const en = {
  meta: {
    title: 'JOJA-TECH — Building ideas into technology',
    description:
      'JOJA-TECH is a software development organization exploring ideas, building useful tools, and creating technology through engineering and open-source collaboration.',
  },
  nav: {
    projects: 'Projects',
    about: 'About',
    technologies: 'Technologies',
    github: 'GitHub',
    primaryLabel: 'Main navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    skipToContent: 'Skip to content',
  },
  hero: {
    badge: 'Open source on GitHub',
    titleStart: 'Building ideas',
    titleEmphasis: 'into technology.',
    description:
      'JOJA-TECH is a software development organization exploring ideas, building useful tools, and creating technology through engineering and open-source collaboration.',
    primaryCta: 'Explore our projects',
    secondaryCta: 'View on GitHub',
    visualLabel: 'Abstract diagram of interconnected software modules',
  },
  featured: {
    eyebrow: 'Featured work',
    title: 'Selected projects',
    description: 'A closer look at a few repositories from the organization.',
  },
  catalog: {
    eyebrow: 'Repository catalog',
    title: 'Every public project',
    description: 'Search and filter the public repositories of the JOJA-TECH organization on GitHub.',
    searchLabel: 'Search projects',
    searchPlaceholder: 'Search by name, description or topic…',
    filterLabel: 'Filter by language',
    allLanguages: 'All',
    results: '{count} of {total} projects',
    emptyTitle: 'No projects match your search',
    emptyDescription: 'Try a different keyword or clear the active filters.',
    clearFilters: 'Clear filters',
    noReposTitle: 'No public repositories yet',
    noReposDescription: 'New projects will appear here as soon as they are published on GitHub.',
    errorTitle: 'Repositories could not be loaded',
    errorDescription: 'GitHub did not respond as expected. You can still browse every project directly on GitHub.',
    rateLimitDescription:
      'The GitHub API rate limit was reached. The list will refresh automatically shortly — meanwhile you can browse the projects on GitHub.',
    viewAll: 'View all repositories',
  },
  card: {
    openApp: 'Open application',
    viewRepo: 'View repository',
    readDocs: 'Read documentation',
    source: 'Source',
    updated: 'Updated {date}',
    noDescription: 'No description provided yet.',
    featured: 'Featured',
    archived: 'Archived',
    live: 'Live',
    opensInNewTab: '(opens in a new tab)',
  },
  about: {
    eyebrow: 'About',
    titleStart: 'Technology built with',
    titleEmphasis: 'curiosity and purpose.',
    body: 'We believe meaningful software begins with curiosity, thoughtful engineering, and a willingness to experiment. JOJA-TECH brings projects and ideas together in one place, from practical tools to exploratory software.',
    principles: [
      { title: 'Engineering', description: 'Thoughtful solutions built with maintainable code.' },
      { title: 'Exploration', description: 'Experimentation with new tools, technologies, and ideas.' },
      { title: 'Open source', description: 'Sharing projects and making software accessible whenever possible.' },
    ],
  },
  technologies: {
    eyebrow: 'Technologies',
    title: 'What our repositories are made of',
    description: 'Detected automatically from the language metadata of each public repository.',
    repoCount: '{count} repos',
    repoCountOne: '1 repo',
    empty: 'Technology data will appear once repository metadata is available.',
  },
  footer: {
    description: 'A software development organization building ideas into technology through engineering and open source.',
    navigation: 'Navigation',
    resources: 'Resources',
    organization: 'GitHub organization',
    allRepos: 'All public repositories',
    rights: 'All rights reserved.',
  },
}

export default en

type DeepString<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? DeepString<U>[]
    : { [K in keyof T]: DeepString<T[K]> }

export type Dictionary = DeepString<typeof en>
