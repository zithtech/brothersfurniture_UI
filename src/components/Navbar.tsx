import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import { categories, countIn, products, formatPrice } from '../data/products'
import { CartIcon, ChevronDown, CloseIcon, MenuIcon, SearchIcon } from './Icons'
import Logo from './Logo'
import MegaMenu from './MegaMenu'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop', mega: true },
  { to: '/ergonomic-chairs', label: 'Chairs' },
  { to: '/about', label: 'About' },
  { to: '/clients', label: 'Clients' },
  { to: '/contact', label: 'Contact' },
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
                        ? 'bg-stone-900 text-white shadow-xs'
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
                        ? 'bg-stone-900 text-white shadow-xs'
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
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-[12px] font-semibold text-white transition-all duration-200 hover:bg-accent hover:shadow-md ml-1"
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

      {/* Mobile Sheet Dropdown */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-full max-h-[calc(100vh-4.5rem)] animate-fade-in overflow-y-auto border-b border-stone-200/90 bg-white/98 backdrop-blur-2xl p-5 shadow-2xl lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to} className="border-b border-stone-100 last:border-none">
                {l.mega ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setMobileShopOpen((o) => !o)}
                      aria-expanded={mobileShopOpen}
                      className="flex w-full items-center justify-between py-3.5 text-base font-semibold text-stone-800"
                    >
                      <span>{l.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-stone-400 transition-transform duration-300 ${
                          mobileShopOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        mobileShopOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <ul className="overflow-hidden">
                        {[
                          { label: 'All products', to: '/shop', count: '' },
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
                              className="flex justify-between py-2 pl-3 text-sm font-medium text-stone-600 hover:text-accent"
                            >
                              <span>{item.label}</span>
                              <span className="text-xs text-stone-400 font-mono">{item.count}</span>
                            </Link>
                          </li>
                        ))}
                        <li className="h-2" />
                      </ul>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 py-3.5 text-base font-semibold transition ${
                        isActive ? 'text-accent' : 'text-stone-800 hover:text-stone-900'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`h-1.5 w-1.5 rounded-full bg-accent transition ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                        <span>{l.label}</span>
                      </>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-5 pt-3 border-t border-stone-100">
            <Link
              to="/contact"
              onClick={closeMobile}
              className="flex w-full items-center justify-center rounded-full bg-stone-900 py-3 text-xs font-semibold text-white transition hover:bg-accent shadow-sm"
            >
              Request a Commercial Quote
            </Link>
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
