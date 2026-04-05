import { motion } from 'framer-motion'
import { Sparkles, Play, Star } from 'lucide-react'

export default function CTASection({ onWatchNow }) {
  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden">
      {/* Animated background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(109,40,217,0.25) 0%, rgba(236,72,153,0.12) 40%, transparent 70%)',
        }}
      />

      {/* Decorative star rings */}
      {[180, 320, 460].map((size, i) => (
        <motion.div
          key={size}
          className="absolute top-1/2 left-1/2 rounded-full border border-fairy-violet/10"
          style={{
            width:  size,
            height: size,
            marginLeft: -(size / 2),
            marginTop:  -(size / 2),
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.03, 1] }}
          transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Floating stars */}
      {[
        { top: '20%', left: '10%'  },
        { top: '15%', right: '12%' },
        { top: '70%', left: '8%'   },
        { top: '75%', right: '10%' },
        { top: '50%', left: '4%'   },
        { top: '40%', right: '5%'  },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none hidden sm:block"
          style={pos}
          animate={{ y: [-8, 8], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Star
            className={`${i % 2 === 0 ? 'text-fairy-gold' : 'text-fairy-pink'} ${i % 3 === 0 ? 'w-5 h-5' : 'w-3 h-3'}`}
            fill="currentColor"
          />
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto relative z-10 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-5 h-5 text-fairy-gold animate-sparkle" />
          <span className="text-fairy-gold font-body font-bold text-sm tracking-widest uppercase">
            Begin the Magic
          </span>
          <Sparkles className="w-5 h-5 text-fairy-gold animate-sparkle" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="
            font-cinzel font-black
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            leading-tight
          "
        >
          <span className="shimmer-text">Start Your</span>
          <br />
          <span className="text-fairy-white text-shadow-glow">Magical Journey</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-fairy-mist/70 font-body text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
        >
          24 enchanting fairy tales, always free, always magical.
          Snuggle up and let the stories begin!
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={onWatchNow}
            whileHover={{ scale: 1.07, boxShadow: '0 0 45px rgba(139,92,246,0.65)' }}
            whileTap={{ scale: 0.95 }}
            className="
              flex items-center gap-3 px-8 py-4 rounded-2xl
              bg-gradient-to-r from-fairy-violet via-fairy-pink to-fairy-gold
              text-white font-body font-bold text-base
              shadow-2xl shadow-fairy-purple/40
              transition-all duration-300
              animate-glow-pulse
            "
          >
            <Play className="w-5 h-5" fill="white" />
            Watch All Stories
          </motion.button>

          <motion.button
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="
              flex items-center gap-2 px-8 py-4 rounded-2xl
              glass border border-fairy-violet/40
              text-fairy-lavender hover:text-white font-body font-bold text-base
              transition-all duration-300 hover:border-fairy-pink/50
            "
          >
            <Sparkles className="w-5 h-5" />
            Learn More
          </motion.button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          {[
            { emoji: '🔒', label: '100% Safe' },
            { emoji: '🆓', label: 'Always Free' },
            { emoji: '📱', label: 'All Devices' },
            { emoji: '✨', label: 'No Ads' },
          ].map(({ emoji, label }) => (
            <div key={label} className="flex items-center gap-2 text-fairy-mist/60 font-body text-sm">
              <span>{emoji}</span>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
