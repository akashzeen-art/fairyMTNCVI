/**
 * MagicWand (enhanced)
 * Fixed bottom-right wand widget.
 * Click → burst sparkles across the screen + message with typewriter effect.
 *
 * Improvements over v1:
 *  - Typewriter text animation for the message bubble
 *  - Four orbiting sparkle particles around the bubble
 *  - Wand button glows gold on cast
 *  - Wand UI matches the fairy-mode design system
 */
import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Constants ─────────────────────────────────────────────────────────────────
const MESSAGES = [
  '✨ La magie est partout !',
  '🌟 Croyez aux contes de fées !',
  '🧚 Un sort a été lancé !',
  '👑 Tu es magique !',
  '🔮 L\'histoire commence…',
  '🌙 Rêve grand !',
  '🦋 Tout est possible !',
  '🐉 L\'aventure t\'attend !',
]

const COLORS = ['#FCD34D', '#A78BFA', '#EC4899', '#60A5FA', '#F0ABFC', '#67E8F9', '#ffffff']

// Orbit positions for sparkle particles around the bubble
const ORBIT_SPARKLES = [
  { top: '-8px',  right: '-6px',  shape: '✦', delay: 0    },
  { top: '-6px',  left:  '-8px',  shape: '✧', delay: 0.15 },
  { bottom:'-8px',right: '-4px',  shape: '⋆', delay: 0.30 },
  { bottom:'-6px',left:  '-6px',  shape: '★', delay: 0.45 },
]

// ── Screen-wide sparkle burst (unchanged from v1) ─────────────────────────────
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

// ── Typewriter text ────────────────────────────────────────────────────────────
function TypewriterText({ text, speed = 38 }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    if (!text) return
    let i = 0
    const timer = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(timer)
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return <span>{displayed}</span>
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function MagicWand() {
  const [message, setMessage] = useState(null)
  const [casting, setCasting] = useState(false)

  const castSpell = useCallback(() => {
    if (casting) return
    setCasting(true)
    burstSparkles()
    const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
    setMessage(msg)
    setTimeout(() => setMessage(null), 3000)
    setTimeout(() => setCasting(false), 1000)
  }, [casting])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* ── Message bubble with typewriter ──────────────────────────────── */}
      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 12, scale: 0.80 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -10, scale: 0.80 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative"
          >
            {/* Orbiting sparkle particles */}
            {ORBIT_SPARKLES.map((s, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="absolute text-fairy-gold text-xs pointer-events-none select-none"
                style={{ top: s.top, right: s.right, bottom: s.bottom, left: s.left }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
                transition={{
                  duration: 1.2,
                  delay:    s.delay,
                  repeat:   1,
                  ease:     'easeInOut',
                }}
              >
                {s.shape}
              </motion.span>
            ))}

            {/* Bubble */}
            <div
              className="
                glass-strong rounded-2xl px-4 py-2.5
                text-fairy-white font-body font-bold text-sm
                max-w-[210px] text-center
                pointer-events-none select-none
              "
              style={{
                border:     '1px solid rgba(167,139,250,0.35)',
                boxShadow:  '0 0 18px rgba(139,92,246,0.30), 0 4px 16px rgba(0,0,0,0.25)',
              }}
            >
              {/* Floating motion on the text itself */}
              <motion.span
                className="block"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <TypewriterText text={message} />
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Wand button ─────────────────────────────────────────────────── */}
      <motion.button
        onClick={castSpell}
        animate={casting
          ? { rotate: [0, -22, 22, -12, 12, 0], scale: [1, 1.22, 1] }
          : { rotate: [0, -5, 5, 0] }
        }
        transition={casting
          ? { duration: 0.65, ease: 'easeInOut' }
          : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.90 }}
        className="
          w-14 h-14 rounded-full
          flex items-center justify-center
          text-2xl
          border border-white/20
          animate-glow-pulse
        "
        style={{
          background: casting
            ? 'linear-gradient(135deg, #D97706 0%, #7C3AED 100%)'   // gold → violet when casting
            : 'linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)',   // violet → pink at rest
          boxShadow: casting
            ? '0 0 30px rgba(252,211,77,0.70), 0 0 60px rgba(252,211,77,0.30), 0 4px 20px rgba(0,0,0,0.35)'
            : '0 0 20px rgba(139,92,246,0.55), 0 4px 20px rgba(0,0,0,0.35)',
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
        }}
        aria-label="Lancer un sort magique"
        title="Lancer un sort !"
      >
        🪄
      </motion.button>
    </div>
  )
}
