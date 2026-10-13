import type { CatalogueItem } from '../types'

/** Bordered grid of catalogue cards; clicking a card reports its index (used to open the lightbox). */
export default function CatalogueGrid({ items, onOpen }: { items: CatalogueItem[]; onOpen: (index: number) => void }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item, i) => (
        <li key={item.id}>
          <button onClick={() => onOpen(i)} className="group block w-full text-left">
            <div
              className={`relative aspect-square overflow-hidden rounded-lg transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-ink/10 ${
                item.fit === 'contain' ? 'bg-white p-4 md:p-6 ring-1 ring-line' : 'bg-surface'
              }`}
            >
              <img
                src={item.src}
                alt={item.name}
                loading="lazy"
                className={`h-full w-full transition duration-700 group-hover:scale-[1.04] ${
                  item.fit === 'contain' ? 'object-contain mix-blend-multiply' : 'object-cover'
                }`}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-ink/60 via-ink/10 to-transparent p-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <span className="translate-y-2 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-all duration-300 group-hover:translate-y-0">
                  Quick View
                </span>
              </div>

              {/* Type badge */}
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink/60 backdrop-blur-sm">
                {item.typeLabel}
              </span>
            </div>

            {/* Card footer */}
            <div className="mt-3 flex items-baseline justify-between gap-3 px-0.5">
              <span className="text-sm font-medium transition group-hover:text-accent md:text-[15px]">
                {item.name}
              </span>
              <span className="shrink-0 text-[10px] tabular-nums text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Features preview */}
            {item.features.length > 0 && (
              <p className="mt-1 line-clamp-1 px-0.5 text-[11px] text-muted">
                {item.features.slice(0, 3).join(' · ')}
              </p>
            )}
          </button>
        </li>
      ))}
    </ul>
  )
}
