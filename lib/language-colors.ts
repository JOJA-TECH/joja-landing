const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#e0b33a',
  Python: '#3572A5',
  Dart: '#00B4AB',
  'C++': '#f34b7d',
  C: '#6e6e6e',
  'C#': '#178600',
  HCL: '#844FBA',
  Makefile: '#427819',
  CMake: '#DA3434',
  Shell: '#89e051',
  PowerShell: '#012456',
  Dockerfile: '#384d54',
  HTML: '#e34c26',
  CSS: '#663399',
  SQL: '#e38c00',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
  Kotlin: '#A97BFF',
}

export function getLanguageColor(language: string) {
  return languageColors[language] ?? '#A4A88A'
}
