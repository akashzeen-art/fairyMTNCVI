/**
 * FairyModeButton
 * A glowing, animated "Enter Magic" button placed in the hero section.
 * On click: bursts sparkles outward from the button center, then triggers
 * the fairy overlay sequence via the `onClick` callback.
 */
import { useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

// ── Sparkle burst on click ───────────────────────────────────────────────────
function spawnButtonSparkles(cx, cy) {
  const COLORS = ['#FCD34D', '#A78BFA', '#EC4899', '#60A5FA', '#F0ABFC', '#67E8F9']
  const SHAPES = ['✦', '✧', '★', '✨', '⋆', '·']
  const COUNT  = 20
  for (let i = 0; i < COUNT; i++) {
    setTimeout(() => {
      const el    = document.createElement('span')
      el.textContent = SHAPES[Math.floor(Math.random() * SHAPES.length)]
      const angle = (i / COUNT) * 360 + Math.random() * 18
      const dist  = 40 + Math.random() * 65
      const size  = 10 + Math.random() * 12
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const dur   = 600 + Math.random() * 450
      Object.assign(el.style, {
        position:      'fixed',
        left:          `${cx}px`,
        top:           `${cy}px`,
        fontSize:      `${size}px`,
        color,
        pointerEvents: 'none',
        zIndex:        9997,
        userSelect:    'none',
        lineHeight:    '1',
        opacity:       '1',
        transition:    `opacity ${dur}ms ease-out, transform ${dur}ms ease-out`,
        transform:     'translate(-50%,-50%) scale(1)',
      })
      document.body.appendChild(el)
      requestAnimationFrame(() => {
        const rad = (angle * Math.PI) / 180
        el.style.transform = `translate(calc(-50% + ${Math.cos(rad) * dist}px), calc(-50% + ${Math.sin(rad) * dist}px)) scale(0) rotate(${angle}deg)`
        el.style.opacity = '0'
      })
      setTimeout(() => el.remove(), dur + 50)
    }, i * 22)
  }
}

export default function FairyModeButton({ onClick, disabled }) {
  const btnRef = useRef(null)

  const handleClick = useCallback(() => {
    if (disabled) return
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect()
      spawnButtonSparkles(r.left + r.width / 2, r.top + r.height / 2)
    }
    onClick?.()
  }, [disabled, onClick])

  return (
    <div className="relative">
      {/* ── Outer glow pulse ring ─────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(109,40,217,0.45), rgba(236,72,153,0.45))',
          filter: 'blur(14px)',
        }}
        animate={disabled ? {} : { scale: [1, 1.30, 1], opacity: [0.7, 0.15, 0.7] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Button ────────────────────────────────────────────────────────── */}
      <motion.button
        ref={btnRef}
        onClick={handleClick}
        disabled={disabled}
        initial={{ opacity: 0, y: 20, scale: 0.88 }}
        animate={{ opacity: 1,  y: 0,  scale: 1    }}
        transition={{ duration: 0.65, delay: 1.0, ease: 'easeOut' }}
        whileHover={!disabled ? { scale: 1.08, y: -3 } : {}}
        whileTap={!disabled  ? { scale: 0.93        } : {}}
        className={`
          relative overflow-hidden z-10
          flex items-center gap-3 px-8 py-4 rounded-2xl
          font-body font-black text-base text-white
          select-none
          ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        `}
        style={{
          background:  'linear-gradient(135deg, #7C3AED 0%, #DB2777 55%, #D97706 100%)',
          boxShadow: disabled
            ? 'none'
            : '0 0 22px rgba(139,92,246,0.60), 0 0 44px rgba(236,72,153,0.28), 0 6px 22px rgba(0,0,0,0.38)',
          transition:  'box-shadow 0.3s ease',
        }}
        aria-label="Entrer en mode fée et rejoindre les histoires"
      >
        {/* Shimmer sweep */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background:     'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.26) 50%, transparent 75%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 2.3, repeat: Infinity, ease: 'linear', repeatDelay: 0.6 }}
        />

        {/* Pulsing border ring */}
        {!disabled && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ border: '1.5px solid rgba(252,211,77,0.60)' }}
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Content */}
        <motion.span
          className="relative z-10 text-xl"
          aria-hidden="true"
          animate={disabled ? {} : { rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          🧚
        </motion.span>

        <span className="relative z-10 tracking-wide">
          Entrer dans la Magie
        </span>

        <motion.span
          className="relative z-10 text-base"
          aria-hidden="true"
          animate={disabled ? {} : { rotate: [0, 25, -25, 0], scale: [1, 1.35, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        >
          ✨
        </motion.span>
      </motion.button>
    </div>
  )
}
