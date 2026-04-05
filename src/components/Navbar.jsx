import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Menu, X, Star } from 'lucide-react'
// Sparkles used in logo only

const NAV_LINKS = [
  { label: 'Home',    href: '#hero' },
  { label: 'Stories', href: '#stories' },
  { label: 'About',   href: '#about' },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)

  // Detect scroll for glass-nav intensification
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change / resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNav = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          ${scrolled
            ? 'glass-strong shadow-[0_4px_30px_rgba(139,92,246,0.2)] py-3'
            : 'bg-transparent py-5'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNav('#hero') }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative">
              <Sparkles className="w-7 h-7 text-fairy-gold animate-sparkle" />
              <Star className="w-3 h-3 text-fairy-pink absolute -top-1 -right-1 animate-twinkle" />
            </div>
            <span className="font-cinzel text-lg sm:text-xl font-bold gradient-text leading-none">
              FairyTales
            </span>
          </motion.a>

          {/* ── Desktop links ────────────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <motion.a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                  className="
                    relative px-4 py-2 font-body font-semibold text-sm
                    text-fairy-mist/80 hover:text-white
                    rounded-full transition-colors duration-200 group
                  "
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {link.label}
                  <span className="
                    absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0
                    bg-gradient-to-r from-fairy-violet to-fairy-pink
                    rounded-full group-hover:w-4/5 transition-all duration-300
                  " />
                </motion.a>
              </li>
            ))}
          </ul>

          {/* ── Mobile hamburger ─────────────────────────────────────── */}
          <motion.button
            className="
              md:hidden p-2 rounded-lg glass text-fairy-lavender
              hover:text-white transition-colors
            "
            onClick={() => setMenuOpen((o) => !o)}
            whileTap={{ scale: 0.9 }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* ── Mobile menu overlay ──────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="
              fixed inset-0 z-40 flex flex-col
              pt-24 pb-10 px-6
              glass-strong
            "
          >
            {/* Gradient backdrop */}
            <div className="absolute inset-0 bg-fairy-darker/90 -z-10" />

            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                >
                  <button
                    onClick={() => handleNav(link.href)}
                    className="
                      w-full text-left px-6 py-4 rounded-2xl
                      font-body font-bold text-xl text-fairy-mist
                      glass hover:bg-white/10
                      hover:text-white transition-all duration-200
                      border border-white/5
                    "
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
