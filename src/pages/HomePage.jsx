import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Preloader from '../components/Preloader'
import BackgroundVideo from '../components/BackgroundVideo'
import FloatingParticles from '../components/FloatingParticles'
import Navbar from '../components/Navbar'
import VideoModal from '../components/VideoModal'
import MobileNumberModal from '../components/MobileNumberModal'
import MagicCursor from '../components/MagicCursor'
import StoryTicker from '../components/StoryTicker'
import MagicWand from '../components/MagicWand'
import FairyOverlay from '../components/FairyOverlay'

import HeroSection from '../sections/HeroSection'
import FeaturedStory from '../sections/FeaturedStory'
import VideoGrid from '../sections/VideoGrid'
import AboutSection from '../sections/AboutSection'
import Footer from '../sections/Footer'

import { useSubscription } from '../context/SubscriptionContext'

const SHOW_PRELOADER = !localStorage.getItem('ft_visited')

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(!SHOW_PRELOADER)
  const [fairyMode, setFairyMode] = useState(false)
  const [storiesReveal, setStoriesReveal] = useState(false)

  const { requestPlay, activeVideo, closePlayer, subid, productcode, msisdn } = useSubscription()

  const handlePreloaderComplete = useCallback(() => setPreloaderDone(true), [])

  const handleFairyMode = useCallback(() => {
    if (fairyMode) return
    setFairyMode(true)
  }, [fairyMode])

  const handleFairyComplete = useCallback(() => {
    setFairyMode(false)
    setStoriesReveal(true)
    setTimeout(() => setStoriesReveal(false), 3200)
  }, [])

  useEffect(() => {
    if (!preloaderDone) return
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300)
    }
  }, [preloaderDone])

  return (
    <>
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {preloaderDone && (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <MagicCursor />
            <BackgroundVideo fairyMode={fairyMode} />
            <FloatingParticles />
            <Navbar />

            <main className="relative z-10">
              <HeroSection onFairyMode={handleFairyMode} fairyActive={fairyMode} />
              <StoryTicker />
              <FeaturedStory onPlay={requestPlay} />
              <VideoGrid onPlay={requestPlay} magicReveal={storiesReveal} />
              <StoryTicker />
              <AboutSection />
            </main>

            <div className="relative z-10">
              <Footer />
            </div>

            <MagicWand />

            <AnimatePresence>
              {fairyMode && (
                <FairyOverlay key="fairy-overlay" onComplete={handleFairyComplete} />
              )}
            </AnimatePresence>

            <MobileNumberModal />

            <AnimatePresence>
              {activeVideo && (
                <VideoModal
                  key={activeVideo.id}
                  video={activeVideo}
                  subid={subid}
                  productcode={productcode}
                  msisdn={msisdn}
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
