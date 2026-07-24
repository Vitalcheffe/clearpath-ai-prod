'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useI18n } from '@/i18n'

interface NavbarProps {
  scrolled?: boolean
}

export default function Navbar({ scrolled: scrolledProp }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [internalScrolled, setInternalScrolled] = useState(false)
  const { t, locale, setLocale } = useI18n()

  useEffect(() => {
    const onScroll = () => setInternalScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrolled = scrolledProp ?? internalScrolled

  const navLinks = [
    { label: t.nav.howItWorks, href: '/how-it-works' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.responsibleAI, href: '/responsible-ai' },
    { label: t.nav.blog, href: '/blog' },
    { label: t.nav.team, href: '/team' },
    { label: t.nav.contact, href: '/contact' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 header-glass transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_20px_rgba(0,0,0,0.03)]' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-md shadow-gray-900/20 group-hover:shadow-lg group-hover:shadow-gray-900/30 transition-shadow overflow-hidden">
                <Image src="/logo.svg" alt="CP" width={20} height={20} className="w-5 h-5" priority />
              </div>
              <span className="text-[15px] font-bold tracking-tight text-gray-900">
                ClearPath AI
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50/80 transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="relative group">
                <button className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50/80 transition-all">
                  {t.nav.more}
                  <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute top-full right-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                  {navLinks.slice(3).map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block px-4 py-2.5 text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Desktop CTA + Language Toggle */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1 p-0.5 bg-gray-100/80 rounded-lg border border-gray-200/60">
                <button
                  onClick={() => setLocale('en')}
                  className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-md transition-all ${
                    locale === 'en'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  aria-label="English"
                  aria-pressed={locale === 'en'}
                >
                  EN
                </button>
                <button
                  onClick={() => setLocale('fr')}
                  className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-md transition-all ${
                    locale === 'fr'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  aria-label="Français"
                  aria-pressed={locale === 'fr'}
                >
                  FR
                </button>
              </div>
              <Link
                href="/app"
                className="px-5 py-2.5 text-[13px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.97]"
              >
                {t.nav.tryClearPath}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={t.nav.toggleMenu}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-out */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <span className="text-[15px] font-bold tracking-tight text-gray-900">{t.nav.menu}</span>
                  <button
                    className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                    onClick={() => setMobileOpen(false)}
                    aria-label={t.nav.closeMenu}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex flex-col p-4 gap-1 overflow-y-auto flex-1">
                  <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Platform</p>
                  <div className="flex items-center gap-1 p-0.5 bg-gray-100 rounded-lg border border-gray-200 mb-2">
                    <button
                      onClick={() => setLocale('en')}
                      className={`flex-1 px-3 py-2 text-[12px] font-semibold rounded-md transition-all ${
                        locale === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                      }`}
                    >
                      🇺🇸 EN
                    </button>
                    <button
                      onClick={() => setLocale('fr')}
                      className={`flex-1 px-3 py-2 text-[12px] font-semibold rounded-md transition-all ${
                        locale === 'fr' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                      }`}
                    >
                      🇫🇷 FR
                    </button>
                  </div>
                  {navLinks.slice(0, 3).map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="px-4 py-3 text-[14px] font-medium text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-all"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2">{t.nav.more}</p>
                  {navLinks.slice(3).map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="px-4 py-3 text-[14px] font-medium text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-all"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 my-2" />
                  <Link href="/privacy" className="px-4 py-3 text-[13px] font-medium text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-50 transition-all" onClick={() => setMobileOpen(false)}>{t.nav.privacy}</Link>
                  <Link href="/terms" className="px-4 py-3 text-[13px] font-medium text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-50 transition-all" onClick={() => setMobileOpen(false)}>{t.nav.terms}</Link>
                </nav>
                <div className="mt-auto p-4 border-t border-gray-100">
                  <Link
                    href="/app"
                    className="block w-full text-center px-5 py-3 text-[13px] font-semibold text-white rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 shadow-md shadow-blue-500/20 transition-all"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t.nav.tryClearPath}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
