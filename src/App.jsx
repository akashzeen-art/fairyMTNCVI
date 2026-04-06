import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// ── Preloader ───────────────────────────────────────────────────────────────
import Preloader from './components/Preloader'

// ── Layout components ──────────────────────────────────────────────────────
import BackgroundVideo   from './components/BackgroundVideo'
import FloatingParticles from './components/FloatingParticles'
import Navbar            from './components/Navbar'
import VideoModal        from './components/VideoModal'
import MagicCursor       from './components/MagicCursor'
import StoryTicker       from './components/StoryTicker'
import MagicWand         from './components/MagicWand'
import FairyOverlay      from './components/FairyOverlay'

// ── Sections ───────────────────────────────────────────────────────────────
import HeroSection   from './sections/HeroSection'
import FeaturedStory from './sections/FeaturedStory'
import VideoGrid     from './sections/VideoGrid'
import AboutSection  from './sections/AboutSection'
import Footer        from './sections/Footer'

const SHOW_PRELOADER = !localStorage.getItem('ft_visited')

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(!SHOW_PRELOADER)
  const [activeVideo,   setActiveVideo]   = useState(null)

  // Fairy-mode state: true while the overlay is playing
  const [fairyMode,     setFairyMode]     = useState(false)
  // storiesReveal: true for ~3 s after fairy animation ends → triggers reveal FX in VideoGrid
  const [storiesReveal, setStoriesReveal] = useState(false)

  const handlePreloaderComplete = useCallback(() => setPreloaderDone(true), [])
  const openPlayer  = useCallback((video) => setActiveVideo(video), [])
  const closePlayer = useCallback(() => setActiveVideo(null),        [])

  // Called when user clicks "Enter Magic"
  const handleFairyMode = useCallback(() => {
    if (fairyMode) return   // prevent double-trigger while already animating
    setFairyMode(true)
  }, [fairyMode])

  // Called by FairyOverlay when its animation finishes
  const handleFairyComplete = useCallback(() => {
    setFairyMode(false)
    setStoriesReveal(true)
    // Auto-reset reveal flag so it can fire again next time
    setTimeout(() => setStoriesReveal(false), 3200)
  }, [])

  return (
    <>
      {/* ── Preloader (first visit only) ────────────────────────────── */}
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* ── Site fades in after preloader ───────────────────────────── */}
      <AnimatePresence>
        {preloaderDone && (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Magic sparkle cursor trail (desktop only) */}
            <MagicCursor />

            {/* Background video — dims/tints in fairy mode */}
            <BackgroundVideo fairyMode={fairyMode} />

            {/* Animated particle layer */}
            <FloatingParticles />

            {/* Sticky navigation */}
            <Navbar />

            {/* Main content */}
            <main className="relative z-10">
              {/* Hero with "Enter Magic" button */}
              <HeroSection
                onFairyMode={handleFairyMode}
                fairyActive={fairyMode}
              />

              <StoryTicker />

              <FeaturedStory onPlay={openPlayer} />

              {/* Stories grid — receives reveal flag after fairy animation */}
              <VideoGrid
                onPlay={openPlayer}
                magicReveal={storiesReveal}
              />

              <StoryTicker />

              <AboutSection />
            </main>

            {/* Footer */}
            <div className="relative z-10">
              <Footer />
            </div>

            {/* Floating magic wand */}
            <MagicWand />

            {/* ── Fairy overlay (plays when fairyMode is true) ─────── */}
            <AnimatePresence>
              {fairyMode && (
                <FairyOverlay
                  key="fairy-overlay"
                  onComplete={handleFairyComplete}
                />
              )}
            </AnimatePresence>

            {/* Video modal */}
            <AnimatePresence>
              {activeVideo && (
                <VideoModal
                  key={activeVideo.id}
                  video={activeVideo}
                  onClose={closePlayer}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
