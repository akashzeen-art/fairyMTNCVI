import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useSubscription } from '../context/SubscriptionContext'

const NAV_LINKS = [
  { label: 'Accueil',   href: '#hero' },
  { label: 'Histoires', href: '#stories' },
  { label: 'À Propos',  href: '#about' },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const { accountQuery } = useSubscription()
  const location = useLocation()
  const isHome = location.pathname === '/'

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
    if (!isHome) return
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
            href={isHome ? '#hero' : `/${accountQuery}`}
            onClick={(e) => {
              if (isHome) { e.preventDefault(); handleNav('#hero') }
            }}
            className="flex items-center group"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <img 
              src="/logo/fairyfinal111.png" 
              alt="Fairy Tales Logo" 
              className="h-16 sm:h-16 w-auto object-contain"
            />
          </motion.a>

          {/* ── Desktop links ────────────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <motion.a
                  href={isHome ? link.href : `/${accountQuery}${link.href}`}
                  onClick={(e) => {
                    if (isHome) { e.preventDefault(); handleNav(link.href) }
                  }}
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
            <li>
              <Link to={`/account${accountQuery}`}>
                <motion.span
                  className="
                    relative px-4 py-2 font-body font-semibold text-sm
                    text-fairy-gold hover:text-white
                    rounded-full transition-colors duration-200 inline-block cursor-pointer
                  "
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Mon Compte
                </motion.span>
              </Link>
            </li>
          </ul>

          {/* ── Mobile hamburger ─────────────────────────────────────── */}
          <motion.button
            className="
              md:hidden p-2 rounded-lg glass text-fairy-lavender
              hover:text-white transition-colors
            "
            onClick={() => setMenuOpen((o) => !o)}
            whileTap={{ scale: 0.9 }}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
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
                  {isHome ? (
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
                  ) : (
                    <Link
                      to={`/${accountQuery}${link.href}`}
                      onClick={() => setMenuOpen(false)}
                      className="
                        block w-full text-left px-6 py-4 rounded-2xl
                        font-body font-bold text-xl text-fairy-mist
                        glass hover:bg-white/10
                        hover:text-white transition-all duration-200
                        border border-white/5
                      "
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.07, duration: 0.35 }}
              >
                <Link
                  to={`/account${accountQuery}`}
                  onClick={() => setMenuOpen(false)}
                  className="
                    block w-full text-left px-6 py-4 rounded-2xl
                    font-body font-bold text-xl text-fairy-gold
                    glass hover:bg-white/10
                    hover:text-white transition-all duration-200
                    border border-white/5
                  "
                >
                  Mon Compte
                </Link>
              </motion.li>
            </ul>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
