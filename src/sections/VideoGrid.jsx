/**
 * VideoGrid
 * Story browsing section with search, category filters, and 4-col responsive grid.
 *
 * Props:
 *   onPlay       — called with video object when a card is clicked
 *   magicReveal  — when true, fires a brief magical reveal animation over the section
 *                  (gold beam + floating sparkles at the top, section glow).
 *                  Resets automatically after ~3 s (controlled by parent).
 */
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Search } from 'lucide-react'
import VideoCard from '../components/VideoCard'
import { videos, categories } from '../data/videos'

const CATEGORY_ICONS = {
  'Tout':                  '🌟',
  'Contes de Princesses':  '👑',
  "Contes d'Animaux":      '🦊',
  'Contes Magiques':       '🔮',
  'Histoires du Soir':     '🌙',
  "Contes d'Aventure":     '⚔️',
  'Histoires Courtes':     '📖',
}

// Pre-compute sparkle positions so they're stable per reveal
const REVEAL_SPARKLES = Array.from({ length: 16 }, (_, i) => ({
  left:  `${3 + i * 6.1}%`,
  size:  10 + (i % 4) * 5,
  shape: ['✦', '✧', '✨', '⋆', '★'][i % 5],
  delay: i * 0.075,
}))

export default function VideoGrid({ onPlay, magicReveal = false }) {
  const [activeCategory, setActiveCategory] = useState('Tout')
  const [searchTerm,     setSearchTerm]     = useState('')

  const filtered = useMemo(() => {
    let result = videos
    if (activeCategory !== 'Tout') {
      result = result.filter((v) => v.category === activeCategory)
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q)
      )
    }
    return result
  }, [activeCategory, searchTerm])

  return (
    <section
      id="stories"
      className="relative py-20 px-4 overflow-hidden"
      style={{
        // Soft section glow when reveal fires — pure CSS transition, no Framer conflict
        boxShadow:  magicReveal
          ? '0 0 80px 8px rgba(139,92,246,0.35), inset 0 0 60px rgba(252,211,77,0.06)'
          : 'none',
        transition: 'box-shadow 0.8s ease',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 50% at 50% 30%, rgba(236,72,153,0.07) 0%, transparent 65%)',
        }}
      />

      {/* ── Magic reveal overlay (fires when magicReveal=true) ────────────── */}
      <AnimatePresence>
        {magicReveal && (
          <motion.div
            key="magic-reveal"
            aria-hidden="true"
            className="absolute inset-x-0 top-0 pointer-events-none overflow-hidden"
            style={{ height: 130, zIndex: 30 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Gold → pink → violet beam across the top of the section */}
            <motion.div
              className="absolute top-0 left-0 right-0"
              style={{
                height:     3,
                background: 'linear-gradient(90deg, transparent 0%, #FCD34D 25%, #EC4899 55%, #A78BFA 80%, transparent 100%)',
              }}
              animate={{ opacity: [0, 1, 1, 0.6, 0] }}
              transition={{ duration: 2.8, ease: 'easeInOut' }}
            />

            {/* Glow bloom below the beam */}
            <motion.div
              className="absolute top-0 left-0 right-0"
              style={{
                height:     80,
                background: 'linear-gradient(to bottom, rgba(252,211,77,0.18) 0%, transparent 100%)',
              }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
            />

            {/* Sparkles floating upward */}
            {REVEAL_SPARKLES.map((s, i) => (
              <motion.span
                key={i}
                className="absolute select-none"
                style={{ left: s.left, bottom: 10, fontSize: s.size }}
                initial={{ y: 0, opacity: 0, scale: 0 }}
                animate={{
                  y:       [-0, -55, -100],
                  opacity: [0, 1, 0],
                  scale:   [0, 1.3, 0],
                }}
                transition={{
                  duration: 1.7,
                  delay:    s.delay,
                  ease:     'easeOut',
                }}
              >
                {s.shape}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-fairy-pink" />
            <Sparkles className="w-5 h-5 text-fairy-pink animate-sparkle" />
            <span className="text-fairy-pink font-body font-bold text-sm tracking-widest uppercase">
              Toutes les Histoires
            </span>
            <Sparkles className="w-5 h-5 text-fairy-pink animate-sparkle" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-fairy-pink" />
          </div>

          <h2
            className="section-title text-2xl sm:text-3xl md:text-4xl gradient-text mb-3"
            style={{
              // Gentle glow pulse on title when reveal fires
              textShadow:  magicReveal ? '0 0 24px rgba(252,211,77,0.75), 0 0 48px rgba(167,139,250,0.50)' : 'none',
              transition:  'text-shadow 0.6s ease',
            }}
          >
            Choisissez Votre Aventure
          </h2>
        </motion.div>

        {/* ── Search bar ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative max-w-md mx-auto mb-8"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-fairy-mist/50" />
          <input
            type="search"
            placeholder="Rechercher des histoires…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full pl-11 pr-4 py-3 rounded-2xl
              glass border border-white/10
              text-fairy-white placeholder-fairy-mist/40
              font-body text-sm
              focus:outline-none focus:border-fairy-violet/60
              transition-colors duration-200
              bg-white/[0.03]
            "
          />
        </motion.div>

        {/* ── Category filter pills ────────────────────────────────────────── */}
        <motion.div
          id="categories"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
        >
          {categories.map((cat, i) => {
            const isActive = cat === activeCategory

            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`
                  flex items-center gap-1.5 px-4 py-2 rounded-full
                  font-body font-bold text-xs sm:text-sm
                  border transition-all duration-300
                  ${isActive
                    ? 'bg-gradient-to-r from-fairy-violet to-fairy-pink text-white border-transparent shadow-lg shadow-fairy-purple/30'
                    : 'glass border-white/10 text-fairy-mist/70 hover:text-white hover:border-fairy-violet/40'
                  }
                `}
              >
                <span>{CATEGORY_ICONS[cat] ?? '✨'}</span>
                {cat}
                {isActive && (
                  <motion.span
                    layoutId="activePill"
                    className="ml-1 text-white/70 text-[10px]"
                  >
                    {filtered.length}
                  </motion.span>
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* ── Video grid ──────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + searchTerm}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="
                grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4
                gap-4 sm:gap-5 lg:gap-6
              "
            >
              {filtered.map((video, i) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onPlay={onPlay}
                  index={i}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 flex flex-col items-center gap-4"
            >
              <span className="text-5xl">🔮</span>
              <p className="text-fairy-mist/60 font-body text-lg">
                Aucune histoire trouvée pour "<span className="text-fairy-lavender">{searchTerm}</span>"
              </p>
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('Tout') }}
                className="px-6 py-2 rounded-full glass border border-fairy-violet/30 text-fairy-lavender font-body font-bold text-sm hover:border-fairy-pink/50 transition-colors"
              >
                Effacer les filtres
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
