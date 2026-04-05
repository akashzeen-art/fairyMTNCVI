/**
 * MagicWand
 * A floating wand widget fixed to the bottom-right corner.
 * Click it to scatter a burst of sparkles across the screen.
 */

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MESSAGES = [
  '✨ Magic is everywhere!',
  '🌟 Believe in fairy tales!',
  '🧚 A spell has been cast!',
  '👑 You are magical!',
  '🔮 The story begins...',
  '🌙 Dream big!',
  '🦋 Anything is possible!',
  '🐉 Adventure awaits!',
]

const COLORS = ['#FCD34D', '#A78BFA', '#EC4899', '#60A5FA', '#F0ABFC', '#67E8F9', '#ffffff']

function burstSparkles() {
  const count = 30
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('span')
      el.textContent = ['✦', '✧', '⋆', '★', '✨', '🌟'][Math.floor(Math.random() * 6)]
      const size  = 14 + Math.random() * 20
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const x     = Math.random() * window.innerWidth
      const y     = Math.random() * window.innerHeight
      const dur   = 900 + Math.random() * 600

      Object.assign(el.style, {
        position:      'fixed',
        left:          `${x}px`,
        top:           `${y}px`,
        fontSize:      `${size}px`,
        color,
        pointerEvents: 'none',
        zIndex:        9998,
        userSelect:    'none',
        opacity:       '1',
        transform:     'scale(1)',
        transition:    `opacity ${dur}ms ease-out, transform ${dur}ms ease-out`,
      })
      document.body.appendChild(el)
      requestAnimationFrame(() => {
        el.style.opacity   = '0'
        el.style.transform = 'scale(2.5) rotate(30deg)'
      })
      setTimeout(() => el.remove(), dur + 50)
    }, i * 40)
  }
}

export default function MagicWand() {
  const [message, setMessage] = useState(null)
  const [casting, setCasting] = useState(false)

  const castSpell = useCallback(() => {
    if (casting) return
    setCasting(true)
    burstSparkles()
    const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
    setMessage(msg)
    setTimeout(() => setMessage(null), 2500)
    setTimeout(() => setCasting(false), 1000)
  }, [casting])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Floating message bubble */}
      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -10, scale: 0.85 }}
            transition={{ duration: 0.3 }}
            className="
              glass-strong rounded-2xl px-4 py-2.5
              border border-fairy-violet/30
              text-fairy-white font-body font-bold text-sm
              shadow-lg shadow-fairy-purple/20
              max-w-[200px] text-center
              pointer-events-none
            "
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wand button */}
      <motion.button
        onClick={castSpell}
        animate={casting
          ? { rotate: [0, -20, 20, -10, 10, 0], scale: [1, 1.2, 1] }
          : { rotate: [0, -5, 5, 0] }
        }
        transition={casting
          ? { duration: 0.6, ease: 'easeInOut' }
          : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.92 }}
        className="
          w-14 h-14 rounded-full
          bg-gradient-to-br from-fairy-violet to-fairy-pink
          flex items-center justify-center
          shadow-xl shadow-fairy-purple/50
          border border-white/20
          text-2xl
          animate-glow-pulse
        "
        aria-label="Cast a magic spell"
        title="Cast a spell!"
      >
        🪄
      </motion.button>
    </div>
  )
}
