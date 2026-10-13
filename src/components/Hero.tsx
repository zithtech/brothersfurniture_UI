import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import heroWorks1 from '../assets/heroworks1.png'
import heroWorks2 from '../assets/heroworks2.png'
import heroWorks3 from '../assets/heroworks3.png'
import workstationVideo from '../assets/workstation.mp4'
import loungeVideo from '../assets/loungebackground.mp4'
import chairsVideo from '../assets/chairsbackground2.mp4'
import ourplanVideo from '../assets/ourplan.mp4'
import storageVideo from '../assets/storagebox.mp4'
import storage1 from '../assets/storage1.png'
import storage2 from '../assets/storage2.png'
import storage3 from '../assets/storage3.png'
import seating3 from '../assets/seating3.png'
import loungeArmchair3 from '../assets/heroLounge3.png'
import beigeLounge1 from '../assets/Loungehero1.png'
import ourplanImage from '../assets/ourplanimage.jpg'
import ourplan2Image from '../assets/ourplan2.jpg'
import ourplan3Image from '../assets/ourplan3.jpg'
import { getProduct, unsplash } from '../data/products'

interface Slide {
  layout?: 'product' | 'split'
  productId?: string
  label?: string
  year?: string
  title: string
  subtitle?: string
  designer?: string
  bg?: string
  startsFrom?: string
  /** High-resolution square-friendly photo(s). Support up to 3 for the new layout. */
  image?: string
  images?: string[]
  /** Optional background video for the slide. */
  video?: string
  /** Short feature tags displayed as pills. */
  features?: string[]
  // Fields for 'split' layout
  eyebrow?: string
  subEyebrow?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

const slides: Slide[] = [
  {
    layout: 'product',
    productId: 'axis-ergo-chair',
    label: 'Seating',
    year: '2026',
    title: 'AXIS',
    subtitle: 'Ergonomic Mesh Chair',
    designer: 'BROTHERS_FURNITURE',
    bg: 'bg-sky',
    startsFrom: '4,XXX rs',
    buttonText: 'Shop Chairs',
    buttonLink: '/shop?category=Office%20Chairs',
    images: [unsplash('photo-1688578735427-994ecdea3ea4', 1400), unsplash('photo-1505843490538-5133c6c7d0e1', 800), seating3],
    video: chairsVideo,
    features: ['4D Armrests', 'Lumbar Support', 'Breathable Mesh'],
  },
  {
    layout: 'product',
    productId: 'orbit-workstation',
    label: 'Workstations',
    year: '2026',
    title: 'ORBIT',
    subtitle: '6-Seater Open Plan Cluster',
    designer: 'BROTHERS_FURNITURE',
    bg: 'bg-mint',
    startsFrom: '12,XXX rs',
    buttonText: 'Shop Workstations',
    buttonLink: '/shop?category=Workstations',
    images: [heroWorks1, heroWorks2, heroWorks3],
    video: workstationVideo,
    features: ['Acoustic Screens', 'Cable Management', 'Modular Design'],
  },
  {
    layout: 'product',
    productId: 'haven-lounge-chair',
    label: 'Lounge',
    year: '2026',
    title: 'HAVEN',
    subtitle: 'Swivel Lounge Chair',
    designer: 'BROTHERS_FURNITURE',
    bg: 'bg-sand',
    images: [beigeLounge1, unsplash('photo-1586023492125-27b2c045efd7', 800), loungeArmchair3],
    video: loungeVideo,
    features: ['Wool Blend', '360° Swivel', 'Soft Cushion'],
  },
  {
    layout: 'product',
    label: 'Storage & Tables',
    year: '2026',
    title: 'VAULT',
    subtitle: 'Modular Storage & Tables',
    description:
      'Engineered credenzas, pedestals, and executive storage systems crafted with precision locking systems and durable finishes.',
    designer: 'BROTHERS_FURNITURE',
    bg: 'bg-stone-200',
    images: [storage1, storage2, storage3],
    video: storageVideo,
    features: ['Lockable Cabinets', 'Modular Shelving', 'Durable Finish'],
    buttonText: 'Shop Storage',
    buttonLink: '/shop?category=Storage',
  },
  {
    layout: 'product',
    label: 'Office Fit-Outs',
    year: '2026',
    title: 'YOUR WHOLE FLOOR,\nPLANNED FOR YOU.',
    subtitle: 'Turnkey Solutions',
    description:
      'Send us your floor plan and headcount. Our designers return a furnished layout, a single quote and an install date — usually within 48 hours.',
    buttonText: 'Request a layout',
    buttonLink: '/contact',
    images: [ourplanImage, ourplan2Image, ourplan3Image],
    video: ourplanVideo,
    bg: 'bg-[#e4eff5]',
    features: ['Furnished Layouts', 'Single Quote', '48h Turnaround'],
  },
]

const AUTOPLAY_MS = 6500
const pad = (n: number) => String(n).padStart(2, '0')

/* Small diamond SVG used in the premium badge */
const Diamond = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
    <path d="M8 0L10.5 5.5L16 8L10.5 10.5L8 16L5.5 10.5L0 8L5.5 5.5Z" />
  </svg>
)

/* Star icon for rating */
const Star = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-amber-400">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length),
    [],
  )

  // Warm the cache for the other slides
  useEffect(() => {
    slides.slice(1).forEach((s) => {
      const imgs = s.images || (s.image ? [s.image] : [])
      imgs.forEach(src => {
        const img = new Image()
        img.src = src
      })
    })
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => go(1), AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [index, paused, go])

  const slide = slides[index]
  const product = slide.productId ? getProduct(slide.productId) : null

  return (
    <section
      className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-10"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          {slide.layout === 'split' ? (
            <div
              key={index}
              className={`relative z-[2] grid min-h-[560px] sm:min-h-[600px] md:grid-cols-2 lg:min-h-[680px] ${slide.bg}`}
            >
              {/* Left Copy */}
              <div className="flex flex-col justify-center px-6 py-12 sm:px-10 md:px-8 md:py-16 lg:px-14 xl:pl-20">
                <div className="animate-rise border-l border-ink pl-4">
                  <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-ink">{slide.eyebrow}</p>
                  <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-ink mt-0.5">{slide.subEyebrow}</p>
                </div>
                <h1 className="mt-8 sm:mt-12 animate-rise text-3xl font-medium leading-tight text-ink sm:text-4xl md:text-5xl lg:text-[56px] whitespace-pre-line [animation-delay:160ms]">
                  {slide.title}
                </h1>
                <p className="mt-4 sm:mt-8 animate-rise max-w-md text-xs sm:text-[15px] leading-relaxed text-ink/75 [animation-delay:240ms]">
                  {slide.description}
                </p>
                <div className="mt-8 sm:mt-12 animate-rise [animation-delay:320ms]">
                  <Link
                    to={slide.buttonLink!}
                    className="inline-flex items-center justify-center border border-ink px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-[13px] font-medium tracking-wide text-ink transition hover:bg-ink hover:text-white"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
              
              {/* Right Visual */}
              <div className="relative hidden md:block">
                {slide.video && (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <source src={slide.video} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Background video */}
              {slide.video && (
                <video
                  key={slide.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 z-0 h-full w-full object-cover scale-105"
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              )}

              {/* Gradient overlays for premium depth */}
              <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/45 to-black/25" />
              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              <div
                key={index}
                className="relative z-[2] grid min-h-[540px] sm:min-h-[580px] md:grid-cols-[5fr_6fr] lg:min-h-[660px]"
              >
                {/* ─── Left Copy ─── */}
                <div className="relative z-10 flex flex-col justify-center px-5 pb-6 pt-10 sm:px-8 sm:pb-8 sm:pt-12 md:px-7 md:py-12 lg:px-14 xl:pl-20">
                  {/* Premium badge */}
                  <div className="animate-rise flex items-center gap-2 text-amber-300/90">
                    <Diamond />
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em]">
                      Premium Quality
                    </span>
                    <Diamond />
                  </div>

                  {/* Category + Year label */}
                  <div className="mt-3.5 sm:mt-5 animate-rise border-l-2 border-white/40 pl-3 sm:pl-4 text-[11px] sm:text-xs md:text-sm font-medium uppercase leading-snug tracking-wider text-white/80 [animation-delay:80ms]">
                    {slide.label}
                    <br />
                    {slide.year} Collection
                  </div>

                  {/* Title */}
                  <h1 
                    className={`mt-4 sm:mt-6 md:mt-7 animate-rise font-semibold text-white whitespace-pre-line [animation-delay:160ms] ${
                      slide.title.length > 20 
                        ? 'text-2xl sm:text-3xl md:text-3xl lg:text-[42px] leading-[1.2] tracking-[0.05em] sm:tracking-[0.08em]' 
                        : 'text-4xl sm:text-5xl md:text-5xl lg:text-[76px] xl:text-[92px] 2xl:text-[104px] leading-none tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.14em]'
                    }`}
                  >
                    {slide.buttonLink ? (
                      <Link to={slide.buttonLink} className="transition-opacity hover:opacity-90">
                        {slide.title}
                      </Link>
                    ) : (
                      slide.title
                    )}
                  </h1>

                  {/* Subtitle */}
                  <p className="mt-2 animate-rise text-xs sm:text-sm md:text-[15px] lg:text-lg font-light tracking-wide text-white/70 [animation-delay:200ms]">
                    {slide.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-2.5 sm:mt-3.5 max-w-sm sm:max-w-md animate-rise text-xs sm:text-[13px] leading-relaxed text-white/60 [animation-delay:240ms]">
                    {slide.description || product?.description}
                  </p>

                  {/* Feature pills */}
                  <div className="mt-3.5 sm:mt-4.5 flex animate-rise flex-wrap gap-1.5 sm:gap-2 [animation-delay:280ms]">
                    {slide.features?.map((feat) => (
                      <span
                        key={feat}
                        className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9.5px] sm:text-[10.5px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Price + Rating */}
                  {product && (
                    <div className="mt-5 sm:mt-6 flex animate-rise items-end gap-4 sm:gap-6 [animation-delay:320ms]">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-white/50">
                          Starts from
                        </span>
                        <span className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold text-white whitespace-nowrap">
                          {slide.startsFrom || '12,XXX rs'}
                        </span>
                      </div>
                      <div className="mb-0.5 flex items-center gap-1 shrink-0">
                        <Star />
                        <span className="text-xs sm:text-sm font-medium text-white/80">{product.rating}</span>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-5 sm:mt-7 flex animate-rise flex-wrap items-center gap-3 sm:gap-4 [animation-delay:360ms]">
                    <Link
                      to={slide.buttonLink || `/product/${product?.id}`}
                      className="group relative inline-flex items-center justify-center overflow-hidden border-[1.5px] border-white px-6 sm:px-8 md:px-7 lg:px-11 py-2.5 sm:py-3 lg:py-3.5 text-xs sm:text-[13px] lg:text-[14px] font-medium tracking-[0.08em] text-white transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white"
                    >
                      <span className="relative z-10">{slide.buttonText || 'Shop Now'}</span>
                    </Link>
                    {slide.buttonLink ? (
                      <Link
                        to={slide.buttonLink}
                        className="text-xs sm:text-[13px] font-medium tracking-wide text-white/70 underline underline-offset-4 transition hover:text-white"
                      >
                        {slide.label ? `Explore ${slide.label} →` : 'Browse Catalogue →'}
                      </Link>
                    ) : product ? (
                      <Link
                        to={`/product/${product.id}`}
                        className="text-xs sm:text-[13px] font-medium tracking-wide text-white/70 underline underline-offset-4 transition hover:text-white"
                      >
                        View Details →
                      </Link>
                    ) : null}
                  </div>

                  {/* Material info */}
                  {product?.material && (
                    <div className="mt-4 sm:mt-5 animate-rise [animation-delay:400ms]">
                      <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-white/40">
                        Material
                      </p>
                      <p className="mt-0.5 text-[10.5px] sm:text-xs font-medium tracking-wide text-white/75">
                        {product.material}
                      </p>
                    </div>
                  )}
                </div>

                {/* ─── Right Visual ─── */}
                <div className="relative flex min-h-[260px] sm:min-h-[300px] md:min-h-0 min-w-0 items-center justify-center p-4 sm:p-6 md:p-6 lg:p-8 pb-16 sm:pb-20 md:pb-6">
                  {/* Square 3-image layout */}
                  <Link
                    to={slide.buttonLink || (product ? `/product/${product.id}` : '#')}
                    className="relative aspect-square w-[80%] sm:w-[75%] md:w-[85%] lg:w-[80%] max-w-[320px] sm:max-w-[400px] md:max-w-[380px] lg:max-w-[480px] animate-rise [animation-delay:150ms] group block cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                  >
                    {slide.images && slide.images.length >= 3 ? (
                      <div className="grid absolute inset-0 grid-cols-2 gap-2.5 sm:gap-3.5">
                        <div className="border border-white/30 relative h-full w-full overflow-hidden bg-white/5 p-1 shadow-2xl backdrop-blur-sm">
                          <img
                            src={slide.images[0]}
                            alt={product?.name || slide.title}
                            decoding="async"
                            fetchPriority={index === 0 ? 'high' : 'auto'}
                            className="absolute inset-1 h-[calc(100%-8px)] w-[calc(100%-8px)] object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="grid h-full w-full grid-rows-2 gap-2.5 sm:gap-3.5">
                          <div className="border border-white/30 relative h-full w-full overflow-hidden bg-white/5 p-1 shadow-2xl backdrop-blur-sm">
                            <img
                              src={slide.images[1]}
                              alt={`${product?.name || slide.title} detail 1`}
                              decoding="async"
                              className="absolute inset-1 h-[calc(100%-8px)] w-[calc(100%-8px)] object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="border border-white/30 relative h-full w-full overflow-hidden bg-white/5 p-1 shadow-2xl backdrop-blur-sm">
                            <img
                              src={slide.images[2]}
                              alt={`${product?.name || slide.title} detail 2`}
                              decoding="async"
                              className="absolute inset-1 h-[calc(100%-8px)] w-[calc(100%-8px)] object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="border border-white/30 absolute inset-0 overflow-hidden bg-white/5 p-1 shadow-2xl backdrop-blur-sm">
                        <img
                          src={slide.images?.[0] || slide.image}
                          alt={product?.name || slide.title}
                          decoding="async"
                          fetchPriority={index === 0 ? 'high' : 'auto'}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                  </Link>
                  
                  {/* Floating dimensions badge */}
                  {product?.dimensions && (
                    <div className="absolute bottom-16 right-4 sm:bottom-18 sm:right-6 md:bottom-4 md:right-4 lg:bottom-6 lg:right-6 animate-rise rounded-lg border border-white/20 bg-black/40 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-3.5 md:py-2 text-center shadow-xl [animation-delay:400ms] pointer-events-none">
                      <p className="text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.12em] text-white/50">
                        Dimensions
                      </p>
                      <p className="mt-0.5 text-[10.5px] sm:text-xs font-medium text-white/80 whitespace-nowrap">{product.dimensions}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

        </div>

        {/* Dynamic Dot Pagination (Auto-Swapping) */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/50 px-3 sm:px-3.5 py-1 sm:py-1.5 backdrop-blur-md border border-white/15 shadow-xl transition-all">
          {slides.map((s, i) => {
            const diff = Math.abs(i - index)
            const dotSizeClass =
              diff === 0
                ? 'h-3.5 w-3.5 sm:h-4 sm:w-4 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] ring-2 ring-white/50'
                : diff === 1
                ? 'h-2 w-2 sm:h-2.5 sm:w-2.5 bg-white/75 hover:bg-white'
                : 'h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white/45 hover:bg-white/80'

            return (
              <button
                key={s.title}
                aria-label={`Go to slide ${i + 1}: ${s.title}`}
                onClick={() => setIndex(i)}
                className="group relative flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center transition-transform hover:scale-110 focus:outline-none"
              >
                <span
                  className={`rounded-full transition-all duration-300 ease-out ${dotSizeClass}`}
                />
              </button>
            )
          })}
        </div>

        <span className="sr-only" aria-live="polite">
          Slide {pad(index + 1)} of {pad(slides.length)}: {slide.title}
        </span>
      </div>
    </section>
  )
}
