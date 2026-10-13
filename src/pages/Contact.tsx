import { useState, type FormEvent } from 'react'
import { ArrowRight } from '../components/Icons'
import { company, whatsappLink } from '../data/company'
import contactHero from '../assets/contactpage.png'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
    e.currentTarget.reset()
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#fafaf9] p-3 sm:p-5 lg:p-7 pb-10 flex flex-col items-center">
      <div className="w-full max-w-[1400px] flex-1 flex flex-col relative bg-[#f7f7f5] rounded-2xl sm:rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">
        
        {/* HERO BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={contactHero}
            alt="Brothers Furniture factory & studio"
            className="w-full h-full object-cover object-center"
          />
          {/* Desktop: Smooth left-to-right gradient fade ensuring text readability while keeping the image vibrant */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f7f5] via-[#f7f7f5]/90 to-transparent hidden lg:block" />
          {/* Mobile/Tablet: Soft overlay for pristine readability */}
          <div className="absolute inset-0 bg-[#f7f7f5]/92 backdrop-blur-[2px] lg:hidden" />
        </div>

        {/* MAIN LAYOUT GRID (Responsive 1-col on mobile/tablet -> 12-col on desktop) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-4 sm:p-6 lg:p-10 items-start">
          
          {/* LEFT COLUMN: Header, Direct Contact Info Cards, Map & Studio */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8">
            
            {/* 1. Hero Text */}
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3.5 py-1.5 text-[11px] sm:text-[11.5px] font-medium text-white mb-3 sm:mb-4 shadow-sm">
                <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Contact Us
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold leading-[1.08] tracking-tight text-slate-900">
                Let's Build<br />Better Spaces<br />
                <span className="text-stone-400">Together.</span>
              </h1>
              <p className="mt-3 sm:mt-4 max-w-lg text-xs sm:text-[14px] leading-relaxed text-slate-600">
                Have a question, need a project quotation, or want to plan your workspace layout? Our factory-direct team is here to help you every step of the way.
              </p>
            </div>

            {/* 2. Contact Info Cards (3-part responsive grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/80 rounded-2xl bg-white border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
              {/* Factory & Studio */}
              <div className="p-3.5 sm:p-4 flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-slate-800 mt-0.5">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500">Factory & Studio</p>
                  <address className="mt-1 text-[11.5px] sm:text-[12px] not-italic leading-[1.4] text-slate-700">
                    Plot No. 24, Sri Moogambigai Nagar, Kallikuppam, Ambattur, Chennai — 600 053
                  </address>
                </div>
              </div>

              {/* Call Us */}
              <div className="p-3.5 sm:p-4 flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-slate-800 mt-0.5">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500">Call Us</p>
                  <div className="mt-1 space-y-1 text-[11.5px] sm:text-[12px] leading-[1.4] text-slate-700">
                    {company.phones.map((p) => (
                      <a key={p.tel} href={`tel:${p.tel}`} className="block hover:text-accent font-medium transition">
                        {p.display}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="p-3.5 sm:p-4 flex items-start gap-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-slate-800 mt-0.5">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500">Email</p>
                  <a href={`mailto:${company.email}`} className="mt-1 block text-[11.5px] sm:text-[12px] leading-[1.4] text-slate-700 hover:text-accent font-medium transition truncate">
                    {company.email}
                  </a>
                </div>
              </div>
            </div>

            {/* 3. Interactive Map & Studio/WhatsApp blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
              {/* Map */}
              <div className="sm:col-span-7 group relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-sm min-h-[190px] sm:min-h-[210px]">
                <iframe
                  src={company.map.embed}
                  title="Brothers Furniture Location"
                  loading="lazy"
                  className="h-full w-full min-h-[190px] sm:min-h-[210px] border-0 grayscale transition duration-700 group-hover:grayscale-0"
                />
                <a
                  href={company.map.link}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-2 text-[11px] sm:text-[11.5px] font-semibold text-slate-900 shadow-md hover:bg-slate-900 hover:text-white transition"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Get Directions
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>

              {/* Studio + WhatsApp */}
              <div className="sm:col-span-5 flex flex-col gap-3 justify-between">
                <div className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-sm border border-stone-200/80">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">Visit Our Studio</p>
                  <p className="mt-1 text-[11.5px] sm:text-[12px] leading-relaxed text-slate-600">
                    Explore raw materials, test ergonomic seating, and discuss custom floor plans at our Ambattur, Chennai facility.
                  </p>
                </div>
                <div className="bg-[#e7f5ec] rounded-2xl p-3 sm:p-3.5 flex items-center justify-between group hover:bg-[#d8f0e0] transition border border-[#cbe8d5]">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#128c7e]">Instant Response</p>
                    <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 mt-0.5 text-xs sm:text-[13px] font-bold text-slate-900">
                      <div className="flex h-5 w-5 rounded-full bg-[#25d366] items-center justify-center text-white shrink-0">
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                      Chat on WhatsApp
                    </a>
                  </div>
                  <ArrowRight className="h-4 w-4 text-emerald-800/60 group-hover:text-emerald-800 transition" />
                </div>
              </div>
            </div>
            
          </div>

          {/* RIGHT COLUMN: Contact Form Card (Get in Touch - shown first on mobile & tab) */}
          <div className="order-1 lg:order-2 lg:col-span-5 w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.08)] border border-stone-200/80 flex flex-col gap-3 sm:gap-3.5">
            
            <div className="flex items-center gap-2 text-stone-500 mb-0.5">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">Send Us a Message</span>
            </div>
            <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 leading-tight">Get in Touch</h2>
            <p className="text-xs sm:text-[13px] leading-relaxed text-slate-500 mb-1">
              Fill in your details and our team will get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-3 sm:space-y-3.5">
              <div className="grid grid-cols-1 min-[440px]:grid-cols-2 gap-3 sm:gap-3.5">
                <label className="block">
                  <span className="text-[11.5px] font-semibold text-slate-800 mb-1 block">Your Name <span className="text-accent">*</span></span>
                  <input required name="name" placeholder="Enter your name" className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-3.5 py-2.5 sm:py-3 text-[13.5px] outline-none transition placeholder:text-stone-400 focus:border-slate-900 focus:bg-white" />
                </label>
                <label className="block">
                  <span className="text-[11.5px] font-semibold text-slate-800 mb-1 block">Phone Number <span className="text-accent">*</span></span>
                  <input required type="tel" name="phone" autoComplete="tel" placeholder="Enter your number" className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-3.5 py-2.5 sm:py-3 text-[13.5px] outline-none transition placeholder:text-stone-400 focus:border-slate-900 focus:bg-white" />
                </label>
              </div>

              <label className="block">
                <span className="text-[11.5px] font-semibold text-slate-800 mb-1 block">Email Address <span className="text-accent">*</span></span>
                <input required type="email" name="email" placeholder="Enter your email" className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-3.5 py-2.5 sm:py-3 text-[13.5px] outline-none transition placeholder:text-stone-400 focus:border-slate-900 focus:bg-white" />
              </label>

              <label className="block">
                <span className="text-[11.5px] font-semibold text-slate-800 mb-1 block">Select Inquiry Type</span>
                <div className="relative">
                  <select name="subject" className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-3.5 py-2.5 sm:py-3 text-[13.5px] text-slate-800 outline-none transition focus:border-slate-900 focus:bg-white appearance-none pr-9">
                    <option>General inquiry</option>
                    <option>Office fit-out / bulk quote</option>
                    <option>Space planning</option>
                    <option>Delivery & returns</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-500">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </label>

              <label className="block">
                <span className="text-[11.5px] font-semibold text-slate-800 mb-1 block">Your Message <span className="text-accent">*</span></span>
                <textarea required name="message" rows={3} placeholder="Tell us about your requirements..." className="w-full min-h-[85px] sm:min-h-[95px] rounded-xl border border-stone-200 bg-stone-50/60 px-3.5 py-2.5 sm:py-3 text-[13.5px] outline-none transition placeholder:text-stone-400 focus:border-slate-900 focus:bg-white resize-none" />
              </label>

              <div className="pt-1">
                <button className="group flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-slate-900 px-6 py-3.5 text-sm sm:text-[14.5px] font-semibold text-white shadow-md transition-all duration-300 hover:bg-accent hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                  <span>Send Message</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                {sent && (
                  <p className="text-center text-xs text-emerald-700 font-medium mt-2 bg-emerald-50 py-1.5 rounded-lg border border-emerald-200">
                    Thank you — we'll be in touch within one business day.
                  </p>
                )}
                <p className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 mt-3">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Your information is safe and treated confidentially.
                </p>
              </div>
            </form>
          </div>

        </div>

      </div>

      {/* 4. Bottom Features Strip (Responsive Grid) */}
      <div className="mx-auto w-full max-w-[1400px] mt-4 sm:mt-5 rounded-2xl bg-white border border-stone-200/80 p-2 sm:p-3 shadow-sm grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/80">
        {[
          {
            d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z',
            title: 'Quick Response',
            desc: 'We reply within 24 hours',
          },
          {
            d: 'M12 20h9|M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z',
            title: 'Customized Solutions',
            desc: 'Tailored to your floor plan',
          },
          {
            d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
            title: 'Trusted Support',
            desc: 'From planning to installation',
          },
        ].map((f) => (
          <div key={f.title} className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 lg:px-6">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-stone-100/90 text-slate-800">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {f.d.split('|').map((p, i) => <path key={i} d={p} />)}
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-[13px] font-bold text-slate-900">{f.title}</p>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

