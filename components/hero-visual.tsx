const modules = [
  { x: 40, y: 48, w: 150, h: 64, label: 'core.ts', tone: 'dark' },
  { x: 290, y: 30, w: 150, h: 64, label: 'infra.tf', tone: 'light' },
  { x: 170, y: 178, w: 140, h: 72, label: 'engine', tone: 'accent' },
  { x: 30, y: 300, w: 150, h: 64, label: 'lab.cpp', tone: 'light' },
  { x: 300, y: 300, w: 150, h: 64, label: 'deploy', tone: 'cream' },
] as const

const connections = [
  'M115 112 C115 150, 200 150, 220 178',
  'M365 94 C365 140, 280 150, 262 178',
  'M210 250 C210 280, 120 280, 105 300',
  'M270 250 C270 280, 360 280, 375 300',
  'M190 80 L290 62',
]

const toneStyles = {
  dark: { fill: '#242321', stroke: '#242321', text: '#FAF7F2', dot: '#C76B4A' },
  light: { fill: '#FFFDF9', stroke: '#E4DCCF', text: '#242321', dot: '#A4A88A' },
  accent: { fill: '#C76B4A', stroke: '#A94F32', text: '#FFFDF9', dot: '#FAF7F2' },
  cream: { fill: '#F0E9DE', stroke: '#E4DCCF', text: '#242321', dot: '#C76B4A' },
} as const

export function HeroVisual({ label }: { label: string }) {
  return (
    <div className="relative mx-auto aspect-[480/400] w-full max-w-md lg:max-w-none">
      <svg viewBox="0 0 480 400" role="img" aria-label={label} className="size-full">
        <defs>
          <filter id="module-shadow" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#242321" floodOpacity="0.08" />
          </filter>
        </defs>

        <circle cx="240" cy="214" r="150" fill="none" stroke="#E4DCCF" strokeDasharray="2 6" />
        <circle cx="240" cy="214" r="96" fill="none" stroke="#E4DCCF" />

        {connections.map((d) => (
          <g key={d}>
            <path d={d} fill="none" stroke="#E4DCCF" strokeWidth="1.5" />
            <path
              d={d}
              fill="none"
              stroke="#C76B4A"
              strokeWidth="1.5"
              strokeDasharray="4 16"
              strokeLinecap="round"
              className="animate-dash-flow"
            />
          </g>
        ))}

        {modules.map((module, index) => {
          const tone = toneStyles[module.tone]
          return (
            <g
              key={module.label}
              className="animate-float-y"
              style={{ animationDelay: `${index * -1.2}s` }}
              filter="url(#module-shadow)"
            >
              <rect
                x={module.x}
                y={module.y}
                width={module.w}
                height={module.h}
                rx="8"
                fill={tone.fill}
                stroke={tone.stroke}
              />
              <circle cx={module.x + 18} cy={module.y + 20} r="3.5" fill={tone.dot} />
              <rect x={module.x + 30} y={module.y + 17} width={module.w * 0.35} height="6" rx="3" fill={tone.text} opacity="0.18" />
              <text
                x={module.x + 16}
                y={module.y + module.h - 18}
                fill={tone.text}
                fontFamily="var(--font-geist-mono), monospace"
                fontSize="13"
              >
                {module.label}
              </text>
            </g>
          )
        })}

        <circle cx="240" cy="134" r="5" fill="#A94F32" className="animate-soft-pulse" />
        <circle cx="390" cy="214" r="4" fill="#A4A88A" className="animate-soft-pulse" style={{ animationDelay: '1.4s' }} />
      </svg>
    </div>
  )
}
