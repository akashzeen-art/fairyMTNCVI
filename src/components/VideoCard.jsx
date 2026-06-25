import { motion } from 'framer-motion'
import { Play, Clock } from 'lucide-react'

const CATEGORY_COLORS = {
  'Contes de Princesses': 'from-pink-500 to-rose-400',
  "Contes d'Animaux":     'from-emerald-500 to-teal-400',
  'Contes De Fées':      'from-violet-500 to-purple-400',
  'Histoires du Soir':    'from-indigo-500 to-blue-400',
  "Contes d'Aventure":    'from-amber-500 to-orange-400',
  'Histoires Courtes':    'from-cyan-500 to-sky-400',
}

export default function VideoCard({ video, onPlay, index = 0 }) {
  const badgeGradient = CATEGORY_COLORS[video.category] ?? 'from-fairy-violet to-fairy-pink'

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      exit={{    opacity: 0, y: 20, scale: 0.94 }}
      transition={{
        duration: 0.45,
        delay:    index * 0.05,
        ease:     'easeOut',
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={() => onPlay(video)}
      className="
        group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer
        glass card-glow border border-white/[0.06]
        hover:border-fairy-violet/40
        transition-all duration-300
      "
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onPlay(video)}
      aria-label={`Regarder ${video.title}`}
    >
      {/* ── Thumbnail ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden aspect-video bg-fairy-dark/80">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          decoding="async"
          className="
            w-full h-full object-cover
            group-hover:scale-110 transition-transform duration-700 ease-out
          "
          onError={(e) => {
            // Fallback gradient placeholder if image fails
            e.currentTarget.style.display = 'none'
          }}
        />

        {/* Dark overlay on hover */}
        <div className="
          absolute inset-0 bg-fairy-darker/40
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
        " />

        {/* ── Play button overlay ─────────────────────────────────── */}
        <motion.div
          className="
            absolute inset-0 flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
          "
          initial={false}
        >
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            className="
              w-16 h-16 rounded-full
              bg-gradient-to-br from-fairy-violet to-fairy-pink
              flex items-center justify-center
              shadow-2xl shadow-fairy-purple/60
              ring-2 ring-white/30
            "
          >
            <Play className="w-7 h-7 text-white ml-1" fill="white" />
          </motion.div>
        </motion.div>

        {/* Duration badge */}
        <div className="
          absolute bottom-2 right-2
          px-2 py-0.5 rounded-md
          bg-black/70 backdrop-blur-sm
          text-white text-xs font-body font-semibold
          flex items-center gap-1
        ">
          <Clock className="w-3 h-3" />
          {video.duration}
        </div>
      </div>

      {/* ── Card body ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        {/* Category badge */}
        <span className={`
          self-start px-3 py-0.5 rounded-full text-xs font-body font-bold
          bg-gradient-to-r ${badgeGradient} text-white
          shadow-sm
        `}>
          {video.category}
        </span>

        {/* Title */}
        <h3 className="
          font-title font-semibold text-sm sm:text-base leading-snug
          text-fairy-white group-hover:gradient-text transition-all duration-300
          line-clamp-2
        ">
          {video.title}
        </h3>

        {/* Description snippet */}
        <p className="text-xs text-fairy-mist/60 font-body line-clamp-2 leading-relaxed">
          {video.description}
        </p>

        {/* Watch button (appears on hover via CSS) */}
        <motion.div
          className="
            mt-auto pt-2 flex items-center gap-1.5
            text-fairy-lavender text-xs font-body font-bold
            opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
            transition-all duration-300
          "
        >
          <Play className="w-3.5 h-3.5" />
          Regarder
        </motion.div>
      </div>

      {/* ── Glow border animation on hover ────────────────────────── */}
      <div className="
        absolute inset-0 rounded-2xl pointer-events-none
        opacity-0 group-hover:opacity-100 transition-opacity duration-500
        shadow-[inset_0_0_20px_rgba(139,92,246,0.15)]
      " />
    </motion.article>
  )
}
