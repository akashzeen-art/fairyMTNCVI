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

  const handlePreloaderComplete = useCallback(() => setPreloaderDone(true), [])
  const openPlayer  = useCallback((video) => setActiveVideo(video), [])
  const closePlayer = useCallback(() => setActiveVideo(null),        [])

  return (
    <>
      {/* ── Preloader (first visit only) ──────────────────────── */}
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* ── Site fades in after preloader ─────────────────────── */}
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

            {/* Fixed full-screen background */}
            <BackgroundVideo />

            {/* Animated particle layer */}
            <FloatingParticles />

            {/* Sticky navigation */}
            <Navbar />

            {/* Main content */}
            <main className="relative z-10">
              <HeroSection />

              {/* ✨ Infinite story name ticker */}
              <StoryTicker />

              <FeaturedStory onPlay={openPlayer} />
              <VideoGrid     onPlay={openPlayer} />

              {/* ✨ Second ticker between grid and about */}
              <StoryTicker />

              <AboutSection />
            </main>

            {/* Footer */}
            <div className="relative z-10">
              <Footer />
            </div>

            {/* ✨ Floating magic wand */}
            <MagicWand />

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
