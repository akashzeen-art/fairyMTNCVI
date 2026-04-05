import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Search } from 'lucide-react'
import VideoCard from '../components/VideoCard'
import { videos, categories } from '../data/videos'

const CATEGORY_ICONS = {
  All:              '🌟',
  'Princess Tales': '👑',
  'Animal Tales':   '🦊',
  'Magic Tales':    '🔮',
  'Bedtime Stories':'🌙',
  'Adventure Tales':'⚔️',
  'Short Stories':  '📖',
}

export default function VideoGrid({ onPlay }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm,     setSearchTerm]     = useState('')

  const filtered = useMemo(() => {
    let result = videos
    if (activeCategory !== 'All') {
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
    <section id="stories" className="relative py-20 px-4 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 50% at 50% 30%, rgba(236,72,153,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Section header ──────────────────────────────────────── */}
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
              All Stories
            </span>
            <Sparkles className="w-5 h-5 text-fairy-pink animate-sparkle" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-fairy-pink" />
          </div>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl gradient-text mb-3">
            Choose Your Adventure
          </h2>
        </motion.div>

        {/* ── Search bar ──────────────────────────────────────────── */}
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
            placeholder="Search stories…"
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

        {/* ── Category filter pills ────────────────────────────────── */}
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

        {/* ── Video grid ──────────────────────────────────────────── */}
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
                No stories found for "<span className="text-fairy-lavender">{searchTerm}</span>"
              </p>
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('All') }}
                className="px-6 py-2 rounded-full glass border border-fairy-violet/30 text-fairy-lavender font-body font-bold text-sm hover:border-fairy-pink/50 transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
