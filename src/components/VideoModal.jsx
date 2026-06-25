/**
 * VideoModal
 * Full-screen overlay video player.
 * Close with: ✕ button, Escape key, or clicking the backdrop.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Clock, Loader2 } from 'lucide-react'
import { checkSubscriptionStatus, redirectToCampaign, isActiveStatus } from '../services/amftApi'

const CATEGORY_COLORS = {
  'Contes de Princesses': 'from-pink-500 to-rose-400',
  "Contes d'Animaux":     'from-emerald-500 to-teal-400',
  'Contes De Fées':      'from-violet-500 to-purple-400',
  'Histoires du Soir':    'from-indigo-500 to-blue-400',
  "Contes d'Aventure":    'from-amber-500 to-orange-400',
  'Histoires Courtes':    'from-cyan-500 to-sky-400',
}

export default function VideoModal({ video, subid, productcode, msisdn, onClose }) {
  const videoRef = useRef(null)
  const [verifying, setVerifying] = useState(true)

  // Status check on every content page load
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const data = await checkSubscriptionStatus(subid, productcode, msisdn)
        if (cancelled) return
        if (!isActiveStatus(data.status)) {
          redirectToCampaign(subid, productcode, msisdn)
          return
        }
        setVerifying(false)
      } catch {
        if (!cancelled) redirectToCampaign(subid, productcode, msisdn)
      }
    })()
    return () => { cancelled = true }
  }, [subid, productcode, msisdn])

  // ESC key to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Auto-play once subscription is verified
  useEffect(() => {
    if (verifying) return
    const vid = videoRef.current
    if (vid) vid.play().catch(() => {})
  }, [video, verifying])

  if (!video) return null

  const badgeGradient = CATEGORY_COLORS[video.category] ?? 'from-fairy-violet to-fairy-pink'

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10"
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        aria-modal="true"
        role="dialog"
        aria-label={`En cours : ${video.title}`}
      >
        {/* Backdrop blur layer */}
        <div className="absolute inset-0 bg-fairy-deeper/90 backdrop-blur-xl" />

        {/* Decorative glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fairy-violet/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fairy-pink/10   rounded-full blur-3xl" />
        </div>

        {/* ── Modal container ──────────────────────────────────────── */}
        <motion.div
          key="modal-card"
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1,    opacity: 1, y: 0  }}
          exit={{    scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="
            relative w-full max-w-4xl z-10
            glass-strong rounded-3xl overflow-hidden
            shadow-2xl shadow-fairy-purple/30
            border border-white/10
            flex flex-col
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Header bar ───────────────────────────────────────── */}
          <div className="
            flex items-start justify-between gap-4
            p-4 sm:p-5
            bg-gradient-to-r from-fairy-dark/80 to-fairy-darker/80
            border-b border-white/[0.06]
          ">
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`
                  px-3 py-0.5 rounded-full text-xs font-body font-bold
                  bg-gradient-to-r ${badgeGradient} text-white
                `}>
                  {video.category}
                </span>
                <span className="flex items-center gap-1 text-fairy-mist/60 text-xs font-body">
                  <Clock className="w-3.5 h-3.5" />
                  {video.duration}
                </span>
              </div>
              <h2 className="
                font-title font-bold text-base sm:text-xl text-fairy-white
                leading-tight line-clamp-2
              ">
                {video.title}
              </h2>
            </div>

            {/* Close button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="
                shrink-0 w-9 h-9 rounded-full
                glass flex items-center justify-center
                text-fairy-mist hover:text-white
                hover:bg-red-500/30 border border-white/10
                transition-colors duration-200
              "
              aria-label="Fermer la vidéo"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* ── Video player ─────────────────────────────────────── */}
          <div className="relative bg-black aspect-video w-full">
            {verifying ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-fairy-mist">
                <Loader2 className="w-8 h-8 animate-spin text-fairy-violet" />
                <p className="text-sm font-body">Vérification de l'abonnement...</p>
              </div>
            ) : (
              <video
                ref={videoRef}
                src={video.videoUrl}
                poster={video.thumbnail}
                controls
                controlsList="nodownload"
                autoPlay
                playsInline
                preload="auto"
                className="w-full h-full object-contain"
                style={{ maxHeight: '60vh' }}
              />
            )}
          </div>

          {/* ── Description ──────────────────────────────────────── */}
          <div className="p-4 sm:p-5 bg-fairy-darker/60">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-fairy-gold mt-0.5 shrink-0" />
              <p className="text-sm text-fairy-mist/80 font-body leading-relaxed">
                {video.description}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
