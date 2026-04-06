import { motion } from 'framer-motion'
import { Sparkles, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative pt-10 pb-6 px-4 overflow-hidden border-t border-white/[0.06]">
      {/* Top glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), rgba(236,72,153,0.6), transparent)' }}
      />

      <div className="absolute inset-0 bg-fairy-darker/60 -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-fairy-gold animate-sparkle" />
            <span className="font-cinzel font-bold text-lg gradient-text">Contes de Fées</span>
          </div>

          <p className="text-fairy-mist/50 font-body text-xs leading-relaxed max-w-sm">
            Un monde vidéo magique créé avec amour pour les petits rêveurs du monde entier.
          </p>

          {/* Copyright only */}
          <p className="flex items-center gap-1 text-fairy-mist/35 font-body text-xs mt-1">
            © {new Date().getFullYear()} Contes de Fées · Fait avec
            <Heart className="w-3 h-3 text-fairy-pink mx-0.5" fill="#EC4899" />
            pour les petits rêveurs
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
