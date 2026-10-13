import { Link } from 'react-router-dom'
import { ergonomicChairs } from '../data/ergonomicChairs'
import { categories, countIn, formatPrice, getProduct } from '../data/products'
import { ArrowRight } from './Icons'
import ergoMeasurementsImg from '../assets/Ergonomic Office Chair Measurements.png'

const featuredIds = ['orbit-workstation', 'axis-ergo-chair']

export default function MegaMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <div
      id="shop-menu"
      className={`absolute inset-x-0 top-[calc(100%+12px)] rounded-[2.25rem] border border-stone-200/90 bg-white/95 backdrop-blur-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.18)] transition-all duration-300 overflow-hidden ${
        open ? 'visible translate-y-0 opacity-100 pointer-events-auto' : 'invisible -translate-y-2 opacity-0 pointer-events-none'
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 p-8 lg:p-9">
        <div className="col-span-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">Shop by category</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6">
            {categories.map((c) => (
              <li key={c}>
                <Link
                  to={`/shop?category=${encodeURIComponent(c)}`}
                  onClick={onNavigate}
                  className="group/item flex items-baseline justify-between border-b border-stone-100 py-2.5 text-[14px] font-medium text-stone-700 transition hover:text-accent"
                >
                  <span className="transition-transform duration-300 group-hover/item:translate-x-1">{c}</span>
                  <span className="text-[11px] font-mono text-stone-400">{countIn(c).split(' ')[0]}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/ergonomic-chairs"
            onClick={onNavigate}
            className="group/ergo mt-5 flex items-center justify-between rounded-xl bg-stone-50 border border-stone-200/60 px-4 py-2.5 text-[14px] font-medium text-stone-800 transition hover:bg-mint hover:border-mint"
          >
            <span>
              Ergonomic chair range
              <span className="ml-2 text-xs text-stone-500 font-normal">{ergonomicChairs.length} models</span>
            </span>
            <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover/ergo:translate-x-1" />
          </Link>
          <Link
            to="/shop"
            onClick={onNavigate}
            className="group/all mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-stone-900"
          >
            <span className="border-b border-stone-900 pb-0.5 transition group-hover/all:border-accent group-hover/all:text-accent">
              View all products
            </span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/all:translate-x-1 group-hover/all:text-accent" />
          </Link>
        </div>

        <div className="col-span-5 grid grid-cols-2 gap-5">
          {featuredIds.map((id) => {
            const p = getProduct(id)!
            const isAxis = id === 'axis-ergo-chair'
            return (
              <Link key={id} to={`/product/${id}`} onClick={onNavigate} className="group/card">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-stone-50 border border-stone-100">
                  <img
                    src={isAxis ? ergoMeasurementsImg : p.image}
                    alt={p.name}
                    className={`h-full w-full transition duration-700 group-hover/card:scale-105 ${
                      isAxis ? 'object-contain p-2 mix-blend-multiply' : p.cutout ? 'object-contain p-4 mix-blend-multiply' : 'object-cover'
                    }`}
                  />
                </div>
                <p className="mt-2.5 text-[14px] font-semibold text-stone-900 transition group-hover/card:text-accent">{p.name}</p>
                <p className="text-xs text-stone-500">
                  From <span className="line-through decoration-accent font-medium">{formatPrice(p.price)}</span>
                </p>
              </Link>
            )
          })}
        </div>

        <Link
          to="/contact"
          onClick={onNavigate}
          className="group/promo col-span-3 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-[#d5e8e4] to-[#c7e0dc] p-6 transition-colors hover:from-[#dee7f2] hover:to-[#d0dded]"
        >
          <div>
            <div className="border-l-2 border-stone-900 pl-3 text-[10px] font-bold uppercase leading-snug tracking-wider text-stone-900">
              Free service
              <br />
              Space planning
            </div>
            <p className="mt-5 text-xl font-medium leading-snug text-stone-900">Furnishing a whole office?</p>
            <p className="mt-2 text-xs text-stone-700 leading-relaxed">Send your floor plan — get a layout and one quote in 48 hours.</p>
          </div>
          <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-stone-900">
            <span>Request a layout</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/promo:translate-x-1" />
          </span>
        </Link>
      </div>
    </div>
  )
}
