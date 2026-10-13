import { useMemo, useState } from 'react'
import type { CatalogueItem, CatalogueType } from '../types'
import CatalogueGrid from './CatalogueGrid'
import CatalogueLightbox from './CatalogueLightbox'

const PAGE_SIZE = 16

interface Props {
  items: CatalogueItem[]
  types: CatalogueType[]
  /** `null` shows every type. */
  type: string | null
  query: string
  onTypeChange: (type: string | null) => void
  /** Singular / plural noun for the result count, e.g. ['chair', 'chairs']. */
  noun: [string, string]
}

/** Type sub-tabs, search-aware grid, paging and lightbox — used by Shop for catalogue categories. */
export default function Catalogue({ items, types, type, query, onTypeChange, noun }: Props) {
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [open, setOpen] = useState<number | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((i) => (!type || i.type === type) && (!q || i.name.toLowerCase().includes(q)))
  }, [items, type, query])

  const visible = filtered.slice(0, limit)
  const tabs = [
    { id: null, label: `All ${noun[1]}`, count: items.length },
    ...types.map((t) => ({ id: t.id, label: t.label, count: items.filter((i) => i.type === t.id).length })),
  ]

  return (
    <>
      {/* Sub-type tabs */}
      <div className={`mt-8 flex gap-2 overflow-x-auto pb-1 ${types.length ? '' : 'hidden'}`} role="tablist">
        {tabs.map((t) => {
          const active = t.id === type
          return (
            <button
              key={t.label}
              role="tab"
              aria-selected={active}
              onClick={() => {
                onTypeChange(t.id)
                setLimit(PAGE_SIZE)
              }}
              className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2 text-sm transition-all duration-300 ${
                active
                  ? 'border-ink bg-ink text-white shadow-sm'
                  : 'border-line text-ink/60 hover:border-ink/30 hover:text-ink'
              }`}
            >
              {t.label}
              <span className={`ml-2 text-[11px] tabular-nums ${active ? 'text-white/50' : 'text-muted'}`}>
                {t.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Result count */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-muted">
          Showing <span className="font-medium text-ink">{visible.length}</span> of{' '}
          <span className="font-medium text-ink">{filtered.length}</span> {filtered.length === 1 ? noun[0] : noun[1]}
          {query && <> for "<span className="text-accent">{query}</span>"</>}
        </p>
        {filtered.length > 0 && (
          <div className="hidden items-center gap-2 text-xs text-muted sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            {filtered.filter(() => true).length} available
          </div>
        )}
      </div>

      {/* Grid */}
      <div key={`${type}-${query}`} className="mt-6 animate-fade-in">
        {visible.length ? (
          <CatalogueGrid items={visible} onOpen={setOpen} />
        ) : (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="rounded-full bg-surface p-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8 text-muted">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </div>
            <p className="mt-4 text-lg font-medium text-ink/70">No {noun[1]} found</p>
            <p className="mt-1 text-sm text-muted">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Load more */}
      {filtered.length > limit && (
        <div className="mt-14 mb-4 text-center">
          <button
            onClick={() => setLimit((l) => l + PAGE_SIZE)}
            className="group inline-flex items-center gap-3 rounded-full border border-ink px-8 py-3.5 text-sm font-medium tracking-wide transition-all hover:bg-ink hover:text-white"
          >
            Load more
            <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs tabular-nums text-muted transition group-hover:bg-white/20 group-hover:text-white/70">
              {filtered.length - limit}
            </span>
          </button>
        </div>
      )}

      {open !== null && visible[open] && (
        <CatalogueLightbox items={visible} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
      )}
    </>
  )
}
