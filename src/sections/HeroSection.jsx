/**
 * HeroSection
 * Main hero with animated floating decorations, title, subtitle,
 * "Enter Magic" button (triggers fairy overlay), and "Explore Stories" CTA.
 *
 * Props:
 *   onFairyMode  — called when user clicks "Enter Magic"
 *   fairyActive  — true while fairy overlay is running (disables the button)
 */
import { motion } from 'framer-motion'
import { Sparkles, BookOpen, Star, Moon, Cloud } from 'lucide-react'
import FairyModeButton from '../components/FairyModeButton'

// ── Framer Motion variants ───────────────────────────────────────────────────
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

// ── Floating decoration config ───────────────────────────────────────────────
const FLOATERS = [
  { Icon: Star,     className: 'text-fairy-gold     w-5  h-5',  style: { top: '15%', left: '8%'  }, anim: { y: [-10, 10], rotate: [0,  20], duration: 5   } },
  { Icon: Star,     className: 'text-fairy-pink     w-3  h-3',  style: { top: '25%', left: '15%' }, anim: { y: [0, -15],  rotate: [0, -20], duration: 4   } },
  { Icon: Sparkles, className: 'text-fairy-lavender w-6  h-6',  style: { top: '20%', right: '10%'}, anim: { y: [-8, 12],  rotate: [0,  30], duration: 6   } },
  { Icon: Moon,     className: 'text-fairy-amber    w-7  h-7',  style: { top: '10%', right: '20%'}, anim: { y: [-5, 8],   rotate: [-5, 5],  duration: 7   } },
  { Icon: Star,     className: 'text-white          w-4  h-4',  style: { top: '70%', left: '5%'  }, anim: { y: [-12, 8],  rotate: [0,  15], duration: 5.5 } },
  { Icon: Cloud,    className: 'text-fairy-mist/40  w-10 h-10', style: { top: '35%', left: '3%'  }, anim: { y: [0, -10],  rotate: [0,   5], duration: 9   } },
  { Icon: Cloud,    className: 'text-fairy-mist/30  w-8  h-8',  style: { top: '30%', right: '5%' }, anim: { y: [-5, 10],  rotate: [0,  -5], duration: 11  } },
  { Icon: Sparkles, className: 'text-fairy-gold     w-5  h-5',  style: { top: '60%', right: '8%' }, anim: { y: [-10, 5],  rotate: [0,  45], duration: 4.5 } },
  { Icon: Star,     className: 'text-fairy-cyan     w-3  h-3',  style: { top: '80%', right: '15%'}, anim: { y: [0, -18],  rotate: [0,  30], duration: 3.5 } },
]

export default function HeroSection({ onFairyMode, fairyActive }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16"
    >
      {/* ── Floating decorations ─────────────────────────────────────────── */}
      {FLOATERS.map(({ Icon, className, style, anim }, i) => (
        <motion.div
          key={i}
          className={`absolute pointer-events-none hidden sm:block ${className}`}
          style={style}
          animate={{ y: anim.y, rotate: anim.rotate }}
          transition={{ duration: anim.duration, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <Icon className="w-full h-full" />
        </motion.div>
      ))}

      {/* ── Central radial glow ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(109,40,217,0.25) 0%, transparent 70%)',
        }}
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-6"
      >
        {/* Eyebrow label */}
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-fairy-violet" />
          <span className="px-4 py-1.5 rounded-full glass border border-fairy-violet/30 text-fairy-lavender text-sm font-body font-bold tracking-widest uppercase">
            ✨ Un Monde de Merveilles
          </span>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-fairy-violet" />
        </motion.div>

        {/* Main title */}
        <motion.h1 variants={itemVariants} className="leading-tight">
          <span className="
            block font-cinzel font-black
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            shimmer-text
          ">
            Magiques
          </span>
          <span className="
            block font-cinzel font-black
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            text-fairy-white text-shadow-glow
            mt-1
          ">
            Contes de Fées
          </span>
          <span className="
            block font-cinzel font-bold
            text-xl sm:text-2xl md:text-3xl
            gradient-text
            mt-2
          ">
            pour Enfants
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="
            max-w-lg mx-auto text-base sm:text-lg
            text-fairy-mist/75 font-body font-medium leading-relaxed
          "
        >
          Plongez dans un monde enchanté de contes — où princesses, dragons
          et magie prennent vie dans chaque belle histoire.
        </motion.p>

        {/* ── CTA Buttons ─────────────────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
        >
          {/* ✨ Fairy Magic button (primary CTA) */}
          <FairyModeButton
            onClick={onFairyMode}
            disabled={fairyActive}
          />

          {/* Explore Stories (secondary CTA) */}
          <motion.button
            onClick={() => document.querySelector('#stories')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="
              flex items-center gap-2 px-8 py-4 rounded-2xl
              glass border border-fairy-violet/40
              text-fairy-lavender hover:text-white
              font-body font-bold text-base
              transition-all duration-300
              hover:border-fairy-pink/50
            "
          >
            <BookOpen className="w-5 h-5" />
            Explorer les Histoires
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-4"
        >
          {[
            { value: '24+',  label: 'Contes de Fées' },
            { value: '6',    label: 'Catégories'    },
            { value: '100%', label: 'Sécurisé'      },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-cinzel font-bold text-2xl sm:text-3xl gradient-text-gold">
                {value}
              </div>
              <div className="text-fairy-mist/60 text-xs font-body tracking-wider uppercase mt-0.5">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-fairy-violet/40 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-fairy-violet" />
        </motion.div>
      </motion.div>
    </section>
  )
}
