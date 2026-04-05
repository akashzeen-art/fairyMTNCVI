import { motion } from 'framer-motion'
import { Shield, Heart, Sparkles, Moon } from 'lucide-react'

const FEATURES = [
  {
    Icon:    Shield,
    color:   'from-emerald-500 to-teal-400',
    glow:    'rgba(16,185,129,0.3)',
    title:   'Safe for Kids',
    description:
      'Every story is carefully curated — no ads, no violence, no scary content. Just pure, joyful storytelling for little hearts.',
  },
  {
    Icon:    Heart,
    color:   'from-pink-500 to-rose-400',
    glow:    'rgba(236,72,153,0.3)',
    title:   'Fun Storytelling',
    description:
      'Bright visuals, warm narrations, and exciting adventures keep children engaged and spark their love for stories.',
  },
  {
    Icon:    Sparkles,
    color:   'from-violet-500 to-purple-400',
    glow:    'rgba(139,92,246,0.3)',
    title:   'Magical World',
    description:
      'A dreamy fairy-tale universe full of castles, dragons, enchanted forests, and all the wonder a child\'s imagination needs.',
  },
  {
    Icon:    Moon,
    color:   'from-indigo-500 to-blue-400',
    glow:    'rgba(99,102,241,0.3)',
    title:   'Bedtime Friendly',
    description:
      'Soothing bedtime stories with soft music and gentle narrations help little ones wind down and drift into sweet dreams.',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(109,40,217,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-fairy-cyan" />
            <span className="text-fairy-cyan font-body font-bold text-sm tracking-widest uppercase">
              About Us
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-fairy-cyan" />
          </div>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl gradient-text mb-4">
            Why Families Love Us
          </h2>
          <p className="
            text-fairy-mist/65 font-body text-sm sm:text-base
            max-w-xl mx-auto leading-relaxed
          ">
            We believe every child deserves a magical world of stories — thoughtfully crafted,
            beautifully designed, and always safe.
          </p>
        </motion.div>

        {/* ── Feature cards ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {FEATURES.map(({ Icon, color, glow, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="
                relative glass-strong rounded-2xl p-6
                border border-white/[0.07]
                hover:border-white/[0.15]
                transition-all duration-300 group
              "
            >
              {/* Card glow on hover */}
              <div
                className="
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                  transition-opacity duration-500 pointer-events-none
                "
                style={{
                  boxShadow: `0 0 40px ${glow}`,
                }}
              />

              {/* Icon */}
              <div className={`
                w-14 h-14 rounded-2xl mb-5
                bg-gradient-to-br ${color}
                flex items-center justify-center
                shadow-lg
              `}>
                <Icon className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="
                font-title font-bold text-base sm:text-lg
                text-fairy-white mb-2
              ">
                {title}
              </h3>

              {/* Description */}
              <p className="
                text-xs sm:text-sm text-fairy-mist/60
                font-body leading-relaxed
              ">
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Big decorative quote ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="
            mt-14 text-center
            glass rounded-3xl px-6 py-10
            border border-fairy-violet/20
            relative overflow-hidden
          "
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(109,40,217,0.12) 0%, transparent 70%)',
            }}
          />
          <Sparkles className="w-8 h-8 text-fairy-gold mx-auto mb-4 animate-sparkle" />
          <blockquote className="
            font-cinzel text-lg sm:text-2xl md:text-3xl
            text-fairy-white text-shadow-glow
            leading-relaxed italic max-w-2xl mx-auto
          ">
            "Every child is born believing in magic.
            <br className="hidden sm:block" />
            We just help them remember."
          </blockquote>
          <p className="mt-4 text-fairy-mist/50 font-body text-sm">
            — The FairyTales Team
          </p>
        </motion.div>
      </div>
    </section>
  )
}
