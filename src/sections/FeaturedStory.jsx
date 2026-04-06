import { motion } from 'framer-motion'
import { Play, Star, Sparkles, Clock } from 'lucide-react'
import { featuredVideo } from '../data/videos'

export default function FeaturedStory({ onPlay }) {
  const video = featuredVideo

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 40% at 50% 50%, rgba(109,40,217,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-fairy-violet" />
            <Sparkles className="w-5 h-5 text-fairy-gold animate-sparkle" />
            <span className="text-fairy-lavender font-body font-bold text-sm tracking-widest uppercase">
              Histoire à la Une
            </span>
            <Sparkles className="w-5 h-5 text-fairy-gold animate-sparkle" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-fairy-violet" />
          </div>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl gradient-text">
            Histoire du Jour
          </h2>
        </motion.div>

        {/* Featured card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="
            relative glass-strong rounded-3xl overflow-hidden
            border border-fairy-violet/20
            shadow-2xl shadow-fairy-purple/20
            grid grid-cols-1 lg:grid-cols-2
            group
          "
        >
          {/* Animated glow border */}
          <div className="
            absolute inset-0 rounded-3xl pointer-events-none
            opacity-0 group-hover:opacity-100 transition-opacity duration-700
            shadow-[0_0_60px_rgba(139,92,246,0.2),inset_0_0_40px_rgba(236,72,153,0.08)]
          " />

          {/* ── Left: Thumbnail ───────────────────────────────────── */}
          <div className="relative overflow-hidden aspect-video lg:aspect-auto min-h-[220px]">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="
                w-full h-full object-cover
                group-hover:scale-105 transition-transform duration-1000 ease-out
              "
              loading="lazy"
            />
            {/* Gradient fade toward content side */}
            <div className="
              absolute inset-0
              bg-gradient-to-r from-transparent to-fairy-darker/80
              hidden lg:block
            " />
            <div className="
              absolute inset-0
              bg-gradient-to-t from-fairy-darker/80 to-transparent
              lg:hidden
            " />

            {/* Play button centred on thumbnail */}
            <motion.button
              onClick={() => onPlay(video)}
              whileHover={{ scale: 1.12, boxShadow: '0 0 40px rgba(139,92,246,0.7)' }}
              whileTap={{ scale: 0.93 }}
              className="
                absolute inset-0 flex items-center justify-center
                focus:outline-none
              "
              aria-label={`Regarder ${video.title}`}
            >
              <div className="
                w-20 h-20 rounded-full
                bg-gradient-to-br from-fairy-violet to-fairy-pink
                flex items-center justify-center
                shadow-2xl shadow-fairy-purple/60
                ring-4 ring-white/20
                animate-glow-pulse
              ">
                <Play className="w-9 h-9 text-white ml-1" fill="white" />
              </div>
            </motion.button>

            {/* Duration */}
            <div className="
              absolute top-4 right-4 px-3 py-1 rounded-full
              bg-black/60 backdrop-blur-sm
              text-white text-xs font-body font-bold
              flex items-center gap-1.5
            ">
              <Clock className="w-3.5 h-3.5" />
              {video.duration}
            </div>
          </div>

          {/* ── Right: Details ────────────────────────────────────── */}
          <div className="
            flex flex-col justify-center gap-5
            p-6 sm:p-8 lg:p-10
          ">
            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-fairy-gold"
                  fill="#F59E0B"
                />
              ))}
            </div>

            {/* Category badge */}
            <span className="
              self-start px-4 py-1 rounded-full text-xs font-body font-bold
              bg-gradient-to-r from-pink-500 to-rose-400 text-white
            ">
              {video.category}
            </span>

            {/* Title */}
            <h3 className="
              font-cinzel font-bold
              text-xl sm:text-2xl md:text-3xl
              text-fairy-white leading-tight
            ">
              {video.title}
            </h3>

            {/* Description */}
            <p className="
              text-sm sm:text-base text-fairy-mist/70
              font-body leading-relaxed line-clamp-4
            ">
              {video.description}
            </p>

            {/* CTA */}
            <motion.button
              onClick={() => onPlay(video)}
              whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(139,92,246,0.5)' }}
              whileTap={{ scale: 0.96 }}
              className="
                self-start flex items-center gap-3
                px-7 py-3.5 rounded-2xl
                bg-gradient-to-r from-fairy-violet to-fairy-pink
                text-white font-body font-bold text-sm
                shadow-lg shadow-fairy-purple/30
                transition-all duration-300
              "
            >
              <Play className="w-4 h-4" fill="white" />
              Voir l'Histoire
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
