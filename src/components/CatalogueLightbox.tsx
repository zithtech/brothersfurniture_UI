import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { CatalogueItem } from '../types'
import { ChevronLeft, ChevronRight, CloseIcon } from './Icons'

interface Props {
  items: CatalogueItem[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
}

export default function CatalogueLightbox({ items, index, onChange, onClose }: Props) {
  const item = items[index]
  const step = (dir: 1 | -1) => onChange((index + dir + items.length) % items.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [index, items.length, onChange, onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-ink/50 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative grid max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl shadow-ink/20 md:grid-cols-[3fr_2fr]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2.5 text-ink/60 backdrop-blur-sm transition hover:bg-ink hover:text-white"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {/* Image */}
        <div className="flex items-center justify-center rounded-l-2xl bg-surface p-6 md:p-10">
          <img
            key={item.id}
            src={item.src}
            alt={item.name}
            className="aspect-square w-full max-w-[520px] animate-fade-in object-contain mix-blend-multiply"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col p-8 md:p-10">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            {item.typeLabel}
          </span>

          <h2 key={item.id} className="mt-5 animate-fade-in text-3xl font-light leading-tight tracking-tight">
            {item.name}
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-ink/60">{item.blurb}</p>

          {/* Features */}
          <div className="mt-8 border-t border-line pt-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Features</p>
            <ul className="mt-4 space-y-2.5">
              {[...item.features, 'Bulk & wholesale pricing available'].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-ink/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom actions */}
          <div className="mt-auto pt-10">
            <Link
              to="/contact"
              className="block w-full rounded-full bg-ink py-4 text-center text-[15px] font-medium tracking-[0.06em] text-white transition hover:bg-accent"
            >
              Request a Quote
            </Link>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm tabular-nums text-muted">
                {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => step(-1)}
                  aria-label="Previous item"
                  className="rounded-full border border-line p-2.5 text-ink/50 transition hover:border-ink hover:text-ink"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => step(1)}
                  aria-label="Next item"
                  className="rounded-full border border-line p-2.5 text-ink/50 transition hover:border-ink hover:text-ink"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
