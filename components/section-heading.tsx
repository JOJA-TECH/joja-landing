import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  id?: string
  eyebrow: string
  title: ReactNode
  description?: string
  className?: string
  action?: ReactNode
}

export function SectionHeading({ id, eyebrow, title, description, className, action }: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-6 md:flex-row md:items-end md:justify-between', className)}>
      <div className="max-w-2xl">
        <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-primary uppercase">
          <span aria-hidden="true" className="h-px w-8 bg-primary" />
          {eyebrow}
        </p>
        <h2 id={id} className="text-3xl font-medium tracking-tight text-balance text-foreground md:text-4xl">
          {title}
        </h2>
        {description ? <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  )
}
