import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Catalogue from '../components/Catalogue'
import CatalogueOverview from '../components/CatalogueOverview'
import PageHeader from '../components/PageHeader'
import { SearchIcon } from '../components/Icons'
import { allCatalogueItems, catalogues } from '../data/catalogues'
import { categories } from '../data/products'
import type { Category } from '../types'

const isCategory = (v: string | null): v is Category => categories.some((c) => c === v)

/* Category icons (inline SVGs for each category) */
const categoryIcons: Record<string, React.JSX.Element> = {
  All: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Workstations: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <rect x="2" y="4" width="20" height="12" rx="1.5" />
      <path d="M7 20h10M12 16v4" />
    </svg>
  ),
  'Office Chairs': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M7 11V7a5 5 0 0110 0v4" />
      <rect x="5" y="11" width="14" height="5" rx="1" />
      <path d="M12 16v3M8 22h8M12 19l-4 3M12 19l4 3" />
    </svg>
  ),
  Desks: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M3 10h18M5 10v10M19 10v10M3 10l2-5h14l2 5" />
    </svg>
  ),
  'Meeting Tables': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <ellipse cx="12" cy="10" rx="9" ry="4" />
      <path d="M5 14v2M19 14v2M12 14v4" />
    </svg>
  ),
  Storage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <rect x="4" y="3" width="16" height="6" rx="1" />
      <rect x="4" y="12" width="16" height="9" rx="1" />
      <line x1="10" y1="6" x2="14" y2="6" />
      <line x1="10" y1="16.5" x2="14" y2="16.5" />
    </svg>
  ),
  Lounge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M5 12V8a2 2 0 012-2h10a2 2 0 012 2v4" />
      <path d="M3 12a2 2 0 012 2v1h14v-1a2 2 0 014 0v3H1v-3a2 2 0 012-2z" />
      <path d="M5 19v2M19 19v2" />
    </svg>
  ),
}

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const categoryParam = params.get('category')
  const category: Category | 'All' = isCategory(categoryParam) ? categoryParam : 'All'
  const query = params.get('q') ?? ''
  const catalogue = category === 'All' ? null : catalogues[category]
  const typeParam = params.get('type')
  const catalogueType = catalogue?.types.some((t) => t.id === typeParam) ? typeParam : null

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (!value || value === 'All') next.delete(key)
    else next.set(key, value)
    if (key === 'category') next.delete('type')
    setParams(next, { replace: true })
    if (key === 'category') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <PageHeader eyebrow="Collection" title={category === 'All' ? 'Shop' : category}>
        {catalogue?.intro ?? 'Furniture for focused work, better meetings and spaces people want to come back to.'}
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* ── Filter bar ── */}
        <div className="flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {(['All', ...categories] as const).map((c) => {
              const active = category === c
              const count = c === 'All' ? allCatalogueItems.length : catalogues[c].items.length
              return (
                <button
                  key={c}
                  onClick={() => update('category', c)}
                  className={`group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium transition-all duration-300 ${
                    active
                      ? 'bg-ink text-white shadow-md shadow-ink/20'
                      : 'bg-surface text-ink/70 hover:bg-ink/5 hover:text-ink'
                  }`}
                >
                  <span className={`transition ${active ? 'text-white/70' : 'text-ink/40 group-hover:text-ink/60'}`}>
                    {categoryIcons[c] ?? categoryIcons.All}
                  </span>
                  <span>{c}</span>
                  <span
                    className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${
                      active ? 'bg-white/15 text-white/70' : 'bg-ink/5 text-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search field */}
          <div className="relative lg:w-72">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
            <input
              type="search"
              placeholder={category === 'All' ? `Search all ${allCatalogueItems.length} products…` : `Search ${category.toLowerCase()}…`}
              value={query}
              onChange={(e) => update('q', e.target.value)}
              className="w-full rounded-full border border-line bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-ink/30 focus:border-ink/30 focus:ring-1 focus:ring-ink/10"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent" />

        {catalogue ? (
          <Catalogue
            key={category}
            items={catalogue.items}
            types={catalogue.types}
            noun={catalogue.noun}
            type={catalogueType}
            query={query}
            onTypeChange={(t) => update('type', t ?? '')}
          />
        ) : query ? (
          <Catalogue items={allCatalogueItems} types={[]} noun={['product', 'products']} type={null} query={query} onTypeChange={() => {}} />
        ) : (
          <CatalogueOverview onSelect={(c) => update('category', c)} />
        )}
      </div>
    </>
  )
}
