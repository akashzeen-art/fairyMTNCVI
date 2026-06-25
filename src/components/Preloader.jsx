/**
 * Preloader
 *
 * • Shows only on first visit (localStorage flag).
 * • Plays the fairy-tale intro video full-screen for 8 seconds.
 * • Fades out smoothly, then calls onComplete() so App hides it.
 * • The same video is reused as the site background — no reload needed.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Star } from 'lucide-react'

const PRELOADER_VIDEO =
  'https://vz-7431b15a-30f.b-cdn.net/b84f3a69-7654-4520-8413-4a9662ce7d75/play_480p.mp4'

const DURATION = 10000 // ms

export default function Preloader({ onComplete }) {
  const videoRef    = useRef(null)
  const timerRef    = useRef(null)
  const [progress,  setProgress]  = useState(0)        // 0-100
  const [fading,    setFading]    = useState(false)     // triggers exit animation
  const [dots,      setDots]      = useState('.')

  // ── Animated dots ──────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '.' : d + '.'))
    }, 500)
    return () => clearInterval(id)
  }, [])

  // ── Progress bar ──────────────────────────────────────────────────────
  useEffect(() => {
    const start = performance.now()
    let raf

    const tick = (now) => {
      const elapsed = now - start
      const pct = Math.min((elapsed / DURATION) * 100, 100)
      setProgress(pct)
      if (pct < 100) {
        raf = requestAnimationFrame(tick)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // ── 8-second timer → fade out ─────────────────────────────────────────
  useEffect(() => {
    // Try to autoplay; retry on first user interaction if blocked
    const vid = videoRef.current
    if (vid) {
      vid.play().catch(() => {
        const retry = () => { vid.play().catch(() => {}); window.removeEventListener('click', retry) }
        window.addEventListener('click', retry, { once: true })
      })
    }

    timerRef.current = setTimeout(() => {
      setFading(true)
      // Wait for fade animation (800 ms) then notify parent
      setTimeout(() => {
        localStorage.setItem('ft_visited', '1')
        onComplete()
      }, 800)
    }, DURATION)

    return () => clearTimeout(timerRef.current)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!fading ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-fairy-deep"
          aria-label="Chargement du portail de contes de fées"
          aria-live="polite"
        >
          {/* ── Full-screen intro video ──────────────────────────── */}
          <video
            ref={videoRef}
            src={PRELOADER_VIDEO}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
          />

          {/* ── Light overlay — just enough for text readability ─── */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(5,1,15,0.15) 0%, rgba(5,1,15,0.05) 50%, rgba(5,1,15,0.40) 100%)',
              zIndex: 1,
            }}
          />

          {/* ── Subtle purple tint ───────────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(109,40,217,0.10) 0%, transparent 70%)',
              zIndex: 2,
            }}
          />

          {/* ── Floating sparkles ────────────────────────────────── */}
          {[
            { top: '12%', left: '8%',  size: 'w-5 h-5', color: 'text-fairy-gold',    delay: '0s'    },
            { top: '18%', right: '10%',size: 'w-4 h-4', color: 'text-fairy-pink',    delay: '0.4s'  },
            { top: '70%', left: '6%',  size: 'w-3 h-3', color: 'text-fairy-lavender',delay: '0.8s'  },
            { top: '75%', right: '8%', size: 'w-5 h-5', color: 'text-fairy-amber',   delay: '0.2s'  },
            { top: '40%', left: '3%',  size: 'w-4 h-4', color: 'text-fairy-cyan',    delay: '1s'    },
            { top: '35%', right: '4%', size: 'w-3 h-3', color: 'text-fairy-white',   delay: '0.6s'  },
          ].map((s, i) => (
            <div
              key={i}
              className={`absolute pointer-events-none ${s.size} ${s.color} animate-twinkle hidden sm:block`}
              style={{ top: s.top, left: s.left, right: s.right, animationDelay: s.delay, zIndex: 3 }}
            >
              <Star className="w-full h-full" fill="currentColor" />
            </div>
          ))}

          {/* ── Central content ──────────────────────────────────── */}
          <div
            className="relative flex flex-col items-center gap-6 px-6 text-center"
            style={{ zIndex: 4 }}
          >
            {/* Logo / icon */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 text-fairy-gold drop-shadow-[0_0_20px_rgba(252,211,77,0.8)]" />
            </motion.div>

            {/* Title */}
            <div className="space-y-1">
              <h1 className="font-cinzel font-black text-3xl sm:text-5xl shimmer-text leading-tight">
                Contes De Fées
              </h1>
              <p className="font-body text-fairy-mist/80 text-sm sm:text-base tracking-widest uppercase">
                Un Monde de Rêve pour Enfants
              </p>
            </div>

            {/* Loading text */}
            <p className="font-body text-fairy-lavender/80 text-sm sm:text-base font-medium">
              Ouverture du livre de contes{dots}
            </p>
          </div>

          {/* ── Progress bar ─────────────────────────────────────── */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-56 sm:w-72"
            style={{ zIndex: 4 }}
          >
            {/* Track */}
            <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
              {/* Fill */}
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    'linear-gradient(90deg, #8B5CF6, #EC4899, #FCD34D)',
                  boxShadow: '0 0 10px rgba(139,92,246,0.7)',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
            <p className="mt-2 text-center text-fairy-mist/40 font-body text-xs">
              {Math.round(progress)}%
            </p>
          </div>

          {/* ── Skip button ──────────────────────────────────────── */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={() => {
              clearTimeout(timerRef.current)
              setFading(true)
              setTimeout(() => {
                localStorage.setItem('ft_visited', '1')
                onComplete()
              }, 800)
            }}
            className="
              absolute bottom-10 right-6 sm:right-10
              px-4 py-2 rounded-full
              glass border border-white/10
              text-fairy-mist/50 hover:text-white
              font-body text-xs font-semibold
              hover:border-fairy-violet/40
              transition-all duration-200
            "
            style={{ zIndex: 4 }}
            aria-label="Passer l'intro"
          >
            Passer ›
          </motion.button>
        </motion.div>
      ) : (
        // Fading exit — AnimatePresence handles the exit animation above
        <motion.div
          key="preloader-exit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[200] bg-fairy-deep pointer-events-none"
        />
      )}
    </AnimatePresence>
  )
}
