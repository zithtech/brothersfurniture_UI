import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import { categories, countIn, products, formatPrice } from '../data/products'
import {
  ArrowRight,
  BuildingIcon,
  CartIcon,
  ChairIcon,
  ChevronDown,
  CloseIcon,
  HomeIcon,
  MailIcon,
  MenuIcon,
  SearchIcon,
  ShopBagIcon,
  UsersIcon,
} from './Icons'
import { company, whatsappLink } from '../data/company'
import Logo from './Logo'
import MegaMenu from './MegaMenu'

const links = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/shop', label: 'Shop', mega: true, icon: ShopBagIcon },
  { to: '/ergonomic-chairs', label: 'Chairs', icon: ChairIcon },
  { to: '/about', label: 'About', icon: BuildingIcon },
  { to: '/clients', label: 'Clients', icon: UsersIcon },
  { to: '/contact', label: 'Contact', icon: MailIcon },
]

const CLOSE_DELAY_MS = 120

export default function Navbar() {
  const { count } = useCart()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileShopOpen, setMobileShopOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const closeTimer = useRef<number>(undefined)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openMega = () => {
    window.clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const closeMega = (delay = CLOSE_DELAY_MS) => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), delay)
  }
  const closeMobile = () => {
    setMenuOpen(false)
    setMobileShopOpen(false)
  }

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 50)
    } else {
      setSearchQuery('')
    }
  }, [searchOpen])

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = searchQuery.trim()
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
    setSearchOpen(false)
  }

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, 5)
  }, [searchQuery])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-stone-200/90 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.08)]'
          : 'bg-white/90 backdrop-blur-lg border-stone-200/60 shadow-xs'
      }`}
      onKeyDown={(e) => e.key === 'Escape' && closeMega(0)}
    >
      <nav
        aria-label="Main Navigation"
        className="mx-auto flex h-[66px] sm:h-[72px] max-w-7xl items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 lg:px-10"
      >
        {/* Left: Brand Logo */}
        <div className="flex items-center shrink-0">
          <Logo className="h-7.5 sm:h-8" />
        </div>

        {/* Center: Desktop Navigation Links (Pill Style) */}
        <ul className="hidden items-center gap-1 xl:gap-1.5 lg:flex">
          {links.map((l) =>
            l.mega ? (
              <li
                key={l.to}
                onMouseEnter={openMega}
                onMouseLeave={() => closeMega()}
                onFocus={openMega}
                onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && closeMega(0)}
              >
                <NavLink
                  to={l.to}
                  onClick={() => closeMega(0)}
                  aria-haspopup="true"
                  aria-expanded={megaOpen}
                  aria-controls="shop-menu"
                  className={({ isActive }) =>
                    `relative inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[12px] font-semibold tracking-wide transition-all duration-200 ${
                      isActive || megaOpen
                        ? 'bg-stone-700 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
                    }`
                  }
                >
                  <span>{l.label}</span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`}
                  />
                </NavLink>
                <MegaMenu open={megaOpen} onNavigate={() => closeMega(0)} />
              </li>
            ) : (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `relative inline-flex items-center rounded-full px-3.5 py-1.5 text-[12px] font-semibold tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'bg-stone-700 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ),
          )}
        </ul>

        {/* Right: Search, Cart, CTA, Mobile Menu */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Search Trigger */}
          <button
            type="button"
            aria-label="Search collection"
            onClick={() => setSearchOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          >
            <SearchIcon className="h-4.5 w-4.5" />
          </button>

          {/* Cart Trigger */}
          <Link
            to="/cart"
            aria-label={`Shopping cart, ${count} items`}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          >
            <CartIcon className="h-4.5 w-4.5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[9.5px] font-bold text-white shadow-xs ring-2 ring-white">
                {count}
              </span>
            )}
          </Link>

          {/* Quote Button (Desktop) */}
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-stone-700 px-4 py-2 text-[12px] font-semibold text-white transition-all duration-200 hover:bg-accent hover:shadow-md ml-1"
          >
            <span>Get Quote</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => (menuOpen ? closeMobile() : setMenuOpen(true))}
          >
            <MenuIcon open={menuOpen} className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Backdrop Dimmer for Clean Isolation */}
      {menuOpen && (
        <div
          className="fixed inset-0 top-[66px] sm:top-[72px] z-40 bg-black/40 backdrop-blur-xs lg:hidden animate-fade-in"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sheet Dropdown (Compact Minimal Premium UI) */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-full z-50 max-h-[calc(100vh-4.5rem)] animate-fade-in overflow-y-auto border-b border-stone-200/90 bg-white p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.18)] lg:hidden">
          <ul className="flex flex-col gap-0.5">
            {links.map((l) => (
              <li key={l.to}>
                {l.mega ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => setMobileShopOpen((o) => !o)}
                      aria-expanded={mobileShopOpen}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-[13.5px] transition-all ${
                        mobileShopOpen
                          ? 'bg-stone-100 text-stone-900 font-medium'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-normal'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-6.5 w-6.5 items-center justify-center rounded-md transition-colors ${
                            mobileShopOpen
                              ? 'bg-white text-stone-900 shadow-2xs'
                              : 'text-stone-400'
                          }`}
                        >
                          <l.icon className="h-4 w-4" />
                        </span>
                        <span className="tracking-tight">{l.label}</span>
                      </div>
                      <ChevronDown
                        className={`h-3.5 w-3.5 text-stone-400 transition-transform duration-200 ${
                          mobileShopOpen ? 'rotate-180 text-accent' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${
                        mobileShopOpen ? 'grid-rows-[1fr] my-1' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="rounded-xl bg-stone-50/90 border border-stone-100 p-2.5">
                          <ul className="grid grid-cols-2 gap-1.5">
                            {[
                              { label: 'All Products', to: '/shop', count: '' },
                              ...categories.map((c) => ({
                                label: c,
                                to: `/shop?category=${encodeURIComponent(c)}`,
                                count: countIn(c).split(' ')[0],
                              })),
                            ].map((item) => (
                              <li key={item.label}>
                                <Link
                                  to={item.to}
                                  onClick={closeMobile}
                                  className="group flex items-center justify-between rounded-lg bg-white p-2 border border-stone-200/50 shadow-xs hover:border-accent transition"
                                >
                                  <span className="text-[12px] font-medium text-stone-800 group-hover:text-accent transition truncate">
                                    {item.label}
                                  </span>
                                  {item.count && (
                                    <span className="text-[9.5px] font-mono text-stone-400 shrink-0 ml-1">
                                      {item.count}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>

                          <Link
                            to="/ergonomic-chairs"
                            onClick={closeMobile}
                            className="mt-2 flex items-center justify-between rounded-lg bg-[#eef7f5] px-2.5 py-1.5 text-[11.5px] font-semibold text-stone-900 border border-[#d2ece5] hover:bg-mint transition"
                          >
                            <span>Ergonomic Chairs range</span>
                            <ArrowRight className="h-3 w-3 text-accent" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-lg px-2.5 py-2 text-[13.5px] transition-all ${
                        isActive
                          ? 'bg-stone-700 text-white font-medium shadow-xs'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-normal'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`flex h-6.5 w-6.5 items-center justify-center rounded-md transition-colors ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'text-stone-400'
                            }`}
                          >
                            <l.icon className="h-4 w-4" />
                          </span>
                          <span className="tracking-tight">{l.label}</span>
                        </div>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-accent mr-1" />
                        )}
                      </>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* Bottom Commercial Section (Compact) */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex flex-col gap-2">
            <Link
              to="/contact"
              onClick={closeMobile}
              className="group flex w-full items-center justify-between rounded-lg bg-stone-700 px-3.5 py-2.5 text-[11.5px] font-semibold uppercase tracking-wider text-white transition hover:bg-accent shadow-xs"
            >
              <span>Request Commercial Quote</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Quick Contact & WhatsApp Strip */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${company.phones[0].tel}`}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-stone-50 border border-stone-200/70 py-2 px-2.5 text-[11px] font-medium text-stone-700 hover:bg-stone-100 transition"
              >
                <svg className="h-3 w-3 text-stone-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
                <span>Call Factory</span>
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg bg-[#eef7f2] border border-[#cbe8d5] py-2 px-2.5 text-[11px] font-medium text-emerald-900 hover:bg-[#e2f2e8] transition"
              >
                <svg className="h-3 w-3 text-[#25d366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Luxury Rounded Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex animate-fade-in items-start justify-center bg-black/40 backdrop-blur-md px-4 pt-[10vh] sm:pt-[14vh]"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-[2.25rem] border border-stone-200/80 bg-white shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4.5 bg-stone-50/50">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                Search Collections & Products
              </p>
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <form
                onSubmit={submitSearch}
                className="flex items-center border-b-2 border-stone-900 pb-3 transition-colors focus-within:border-accent"
              >
                <input
                  ref={searchRef}
                  type="search"
                  placeholder="Chairs, desks, workstations…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
                  className="w-full bg-transparent py-1 text-xl sm:text-2xl font-normal outline-none placeholder:text-stone-300 text-stone-900"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="p-2 text-stone-900 transition hover:text-accent"
                >
                  <SearchIcon className="h-6 w-6" />
                </button>
              </form>

              {searchQuery.trim() && (
                <div className="mt-6 animate-fade-in max-h-[45vh] overflow-y-auto pr-1">
                  {searchResults.length > 0 ? (
                    <ul className="flex flex-col gap-2.5">
                      {searchResults.map((p) => (
                        <li key={p.id} className="animate-rise">
                          <Link
                            to={`/product/${p.id}`}
                            onClick={() => setSearchOpen(false)}
                            className="group flex items-center gap-4 p-2.5 rounded-2xl hover:bg-stone-50 transition"
                          >
                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-100 border border-stone-100">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-stone-900 truncate transition-colors group-hover:text-accent">
                                {p.name}
                              </h4>
                              <p className="text-xs text-stone-500">{p.category}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-semibold text-stone-900">
                                {formatPrice(p.price)}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="py-10 text-center">
                      <p className="text-base font-medium text-stone-800">
                        No results found for "{searchQuery}"
                      </p>
                      <p className="mt-1 text-xs text-stone-500">
                        Try checking for typos or searching a different term.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
