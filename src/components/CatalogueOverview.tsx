import { useState } from 'react'
import { catalogues } from '../data/catalogues'
import type { CatalogueItem, Category } from '../types'
import CatalogueGrid from './CatalogueGrid'
import CatalogueLightbox from './CatalogueLightbox'
import { ArrowRight } from './Icons'

const PREVIEW_COUNT = 4

/** Shop "All" view — a short preview row for every category, each linking to its full listing. */
export default function CatalogueOverview({ onSelect }: { onSelect: (category: Category) => void }) {
  const [lightbox, setLightbox] = useState<{ items: CatalogueItem[]; index: number } | null>(null)
  const entries = Object.entries(catalogues) as [Category, (typeof catalogues)[Category]][]
  const total = entries.reduce((n, [, c]) => n + c.items.length, 0)

  return (
    <>
      {/* Summary stats */}
      <div className="mt-10 flex items-center gap-6">
        <p className="text-sm text-muted">
          <span className="text-lg font-semibold text-ink">{total}</span> products across{' '}
          <span className="font-medium text-ink">{entries.length}</span> categories
        </p>
        <div className="hidden h-px flex-1 bg-gradient-to-r from-line to-transparent sm:block" />
      </div>

      <div className="mt-10 space-y-24">
        {entries.map(([category, c], i) => {
          const preview = c.items.slice(0, PREVIEW_COUNT)
          return (
            <section key={category} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              {/* Section header */}
              <div className="mb-8 flex items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-xs font-semibold tabular-nums text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="h-px w-6 bg-line" />
                  </div>
                  <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
                    {category}
                    <span className="ml-3 align-middle text-sm font-medium text-muted">{c.items.length}</span>
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-muted">{c.intro}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.types.map((t) => (
                      <span key={t.id} className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-ink/50">
                        {t.label}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => onSelect(category)}
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium transition hover:border-ink hover:bg-ink hover:text-white"
                >
                  <span>View all {c.items.length}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <CatalogueGrid items={preview} onOpen={(index) => setLightbox({ items: preview, index })} />
            </section>
          )
        })}
      </div>

      {lightbox && (
        <CatalogueLightbox
          items={lightbox.items}
          index={lightbox.index}
          onChange={(index) => setLightbox({ ...lightbox, index })}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}
