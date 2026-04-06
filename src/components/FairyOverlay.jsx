/**
 * FairyOverlay
 * Full-screen magical overlay triggered by "Enter Magic" button.
 *
 * Flow:
 *  1. Dark dreamy backdrop fades in
 *  2. Fairy appears at center-top of screen
 *  3. Fairy flies a wide elliptical spiral across the viewport
 *     (right → bottom-right → bottom → bottom-left → left → back center → plunge down)
 *  4. A live sparkle trail follows the fairy's exact screen position
 *  5. After ~3.8 s the page smoothly scrolls to #stories
 *  6. onComplete() is called → parent unmounts this overlay (AnimatePresence fades it out)
 */
import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

// ── Sparkle trail helpers ────────────────────────────────────────────────────
const TRAIL_COLORS = ['#FCD34D', '#A78BFA', '#EC4899', '#60A5FA', '#F0ABFC', '#67E8F9', '#fff']
const TRAIL_SHAPES = ['✦', '✧', '⋆', '★', '·', '○', '✨']

function spawnTrailDot(x, y) {
  const el    = document.createElement('span')
  el.textContent = TRAIL_SHAPES[Math.floor(Math.random() * TRAIL_SHAPES.length)]
  const size  = 6 + Math.random() * 14
  const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)]
  const angle = Math.random() * 360
  const dist  = 10 + Math.random() * 28
  const dur   = 420 + Math.random() * 380

  Object.assign(el.style, {
    position:      'fixed',
    left:          `${x + (Math.random() - 0.5) * 22}px`,
    top:           `${y + (Math.random() - 0.5) * 22}px`,
    fontSize:      `${size}px`,
    color,
    pointerEvents: 'none',
    zIndex:        9000,
    userSelect:    'none',
    lineHeight:    '1',
    opacity:       '1',
    transition:    `opacity ${dur}ms ease-out, transform ${dur}ms ease-out`,
    transform:     'translate(-50%,-50%) scale(1)',
  })
  document.body.appendChild(el)

  requestAnimationFrame(() => {
    const rad = (angle * Math.PI) / 180
    el.style.transform = `translate(calc(-50% + ${Math.cos(rad) * dist}px), calc(-50% + ${Math.sin(rad) * dist}px)) scale(0.1) rotate(${angle}deg)`
    el.style.opacity = '0'
  })
  setTimeout(() => el.remove(), dur + 50)
}

// ── Pre-computed background stars ────────────────────────────────────────────
const BG_STARS = Array.from({ length: 20 }, (_, i) => ({
  left:  `${6 + (i * 4.7) % 88}%`,
  top:   `${8 + (i * 9.3) % 80}%`,
  size:  10 + (i % 4) * 5,
  shape: ['✦', '✧', '⋆', '★', '✨', '🌟', '·'][i % 7],
  delay: i * 0.17,
}))

// ── Ambient orb config ───────────────────────────────────────────────────────
const ORBS = [
  { l: '18%', t: '22%', c: 'rgba(139,92,246,0.32)', s: 380, dur: 2.2 },
  { l: '80%', t: '52%', c: 'rgba(236,72,153,0.24)', s: 310, dur: 2.8 },
  { l: '48%', t: '74%', c: 'rgba(252,211,77,0.18)', s: 270, dur: 3.2 },
  { l: '8%',  t: '62%', c: 'rgba(96,165,250,0.20)', s: 230, dur: 2.5 },
]

export default function FairyOverlay({ onComplete }) {
  const fairyControls = useAnimation()
  const fairyWrapRef  = useRef(null)  // tracks fairy's DOM position for trail
  const trailRef      = useRef(null)  // setInterval id
  const doneRef       = useRef(false) // guard against double-completion

  useEffect(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight

    // ── Start sparkle trail ticker ─────────────────────────────────────────
    trailRef.current = setInterval(() => {
      if (!fairyWrapRef.current) return
      const r  = fairyWrapRef.current.getBoundingClientRect()
      const cx = r.left + r.width  / 2
      const cy = r.top  + r.height / 2
      spawnTrailDot(cx, cy)
      // Extra dot for density on wider screens
      if (Math.random() < 0.45) spawnTrailDot(cx, cy)
    }, 65)

    // ── Fairy spiral path animation ────────────────────────────────────────
    // Offsets are relative to the fixed anchor point (50%vw, 25%vh).
    // Path: start → arc right → bottom-right → bottom → bottom-left → left → back → plunge to stories
    const run = async () => {
      await fairyControls.start({
        x: [
          0,
          vw * 0.27,   // drift right
          vw * 0.22,   // bottom-right arc
          0,           // bottom center
          -vw * 0.22,  // bottom-left arc
          -vw * 0.29,  // left side
          -vw * 0.05,  // returning to center
          vw * 0.03,   // center (slight wobble)
        ],
        y: [
          0,
          vh * 0.10,   // slight dip right
          vh * 0.38,   // deeper arc
          vh * 0.50,   // bottom center
          vh * 0.38,   // mirror arc
          vh * 0.10,   // back up left
          -vh * 0.03,  // overshoot top
          vh * 0.58,   // plunge toward stories
        ],
        rotate: [0, 20, -12, 5, -18, 14, 4, 0],
        scale:  [0,  1.15,  1, 1.05,  1, 1.1, 1.05, 0.65],
        opacity:[0,  1,     1,  1,    1,  1,   1,    0   ],
        transition: {
          duration: 3.8,
          ease:     'easeInOut',
          times:    [0, 0.10, 0.28, 0.45, 0.60, 0.76, 0.90, 1.00],
        },
      })

      if (doneRef.current) return
      doneRef.current = true

      clearInterval(trailRef.current)

      // Scroll to stories section after fairy finishes
      document.querySelector('#stories')?.scrollIntoView({ behavior: 'smooth' })

      // Give scroll a moment, then unmount the overlay
      setTimeout(() => onComplete?.(), 900)
    }

    run()

    return () => clearInterval(trailRef.current)
  }, [fairyControls, onComplete])

  return (
    <motion.div
      aria-hidden="true"
      // pointer-events: auto so it blocks accidental clicks during animation
      className="fixed inset-0"
      style={{ zIndex: 68, cursor: 'default' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
    >
      {/* ── Dreamy backdrop ──────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 85% 75% at 50% 30%, rgba(80,0,160,0.62) 0%, rgba(5,1,15,0.80) 100%)',
        }}
      />

      {/* ── Ambient glow orbs ────────────────────────────────────────────── */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            left:      orb.l,
            top:       orb.t,
            width:     orb.s,
            height:    orb.s,
            background:orb.c,
            transform: 'translate(-50%,-50%)',
          }}
          animate={{ scale: [1, 1.45, 1], opacity: [0.4, 0.88, 0.4] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Background twinkle stars ─────────────────────────────────────── */}
      {BG_STARS.map((s, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="absolute select-none pointer-events-none"
          style={{ left: s.left, top: s.top, fontSize: s.size }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 0.92, 0.55, 0.92, 0],
            scale:   [0, 1.25, 1.0,  1.15, 0],
            rotate:  [0, 40,   0,   -30,   0],
          }}
          transition={{
            duration: 3.2,
            delay:    s.delay,
            ease:     'easeInOut',
          }}
        >
          {s.shape}
        </motion.span>
      ))}

      {/* ── Fairy anchor (positioned at 50%vw, 25%vh) ────────────────────── */}
      {/* The motion.div inside is animated via fairyControls (x/y offsets). */}
      <div
        style={{
          position:  'fixed',
          left:      '50%',
          top:       '25%',
          transform: 'translate(-50%, -50%)',
          zIndex:    72,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          ref={fairyWrapRef}
          initial={{ scale: 0, opacity: 0 }}
          animate={fairyControls}
        >
          {/* Outer warm glow blob */}
          <motion.div
            aria-hidden="true"
            className="absolute rounded-full blur-2xl"
            style={{
              left:       '50%',
              top:        '50%',
              transform:  'translate(-50%,-50%)',
              width:      100,
              height:     100,
              background: 'radial-gradient(circle, rgba(252,211,77,0.88) 0%, rgba(236,72,153,0.52) 44%, transparent 68%)',
              pointerEvents: 'none',
            }}
            animate={{ scale: [1, 1.65, 1], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 0.72, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Inner spinning ring */}
          <motion.div
            aria-hidden="true"
            className="absolute rounded-full"
            style={{
              left:       '50%',
              top:        '50%',
              transform:  'translate(-50%,-50%)',
              width:      62,
              height:     62,
              border:     '2px solid rgba(252,211,77,0.72)',
              boxShadow:  '0 0 14px rgba(252,211,77,0.55), inset 0 0 14px rgba(139,92,246,0.35)',
              pointerEvents: 'none',
            }}
            animate={{ rotate: [0, 360], scale: [1, 1.25, 1], opacity: [0.85, 0.25, 0.85] }}
            transition={{
              rotate:  { duration: 1.1, repeat: Infinity, ease: 'linear' },
              scale:   { duration: 1.1, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 1.1, repeat: Infinity, ease: 'easeInOut' },
            }}
          />

          {/* Fairy emoji — floats up/down while flying */}
          <motion.span
            className="relative block select-none"
            style={{
              fontSize:  'clamp(3rem, 7vw, 4.5rem)',
              lineHeight: 1,
              filter:    'drop-shadow(0 0 16px rgba(252,211,77,0.95))',
            }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 0.68, repeat: Infinity, ease: 'easeInOut' }}
          >
            🧚
          </motion.span>
        </motion.div>
      </div>

      {/* ── Guide message bubble ─────────────────────────────────────────── */}
      <motion.div
        aria-live="polite"
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none text-center"
        style={{ top: '10%', zIndex: 73, maxWidth: '90vw' }}
        initial={{ opacity: 0, y: -12, scale: 0.82 }}
        animate={{
          opacity: [0, 1,    1,    1,    0],
          y:       [-12, 0,  0,    0,   -10],
          scale:   [0.82, 1, 1,    1,  0.88],
        }}
        transition={{
          duration: 3.6,
          times:    [0, 0.12, 0.5, 0.85, 1],
          ease:     'easeInOut',
        }}
      >
        <div
          className="inline-block px-6 py-3 rounded-full font-body font-bold text-sm sm:text-base text-fairy-white whitespace-nowrap"
          style={{
            background:     'rgba(70,0,140,0.60)',
            backdropFilter: 'blur(18px)',
            border:         '1px solid rgba(167,139,250,0.40)',
            boxShadow:      '0 0 22px rgba(139,92,246,0.45), 0 4px 16px rgba(0,0,0,0.30)',
          }}
        >
          ✨ La fée vous guide vers les histoires… 🧚
        </div>
      </motion.div>
    </motion.div>
  )
}
