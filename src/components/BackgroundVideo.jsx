/**
 * BackgroundVideo
 * Full-screen fixed background video.
 * Video is always visible — no opacity-gate waiting for onCanPlay.
 * onError hides it only if the src truly fails to load.
 */
import { useRef, useEffect, useState } from 'react'

const BG_VIDEOS = [
  { url: 'https://assets.mixkit.co/videos/51713/51713-720.mp4', label: 'Enchanted Misty Forest' },
  { url: 'https://assets.mixkit.co/videos/46317/46317-720.mp4', label: 'Golden Fairy Dust' },
  { url: 'https://assets.mixkit.co/videos/46557/46557-720.mp4', label: 'Fairy Lights Bokeh' },
  { url: 'https://assets.mixkit.co/videos/39768/39768-720.mp4', label: 'Night Sky Stars' },
  { url: 'https://assets.mixkit.co/videos/4148/4148-720.mp4',   label: 'Milky Way' },
  { url: 'https://assets.mixkit.co/videos/30889/30889-720.mp4', label: 'Nebula Journey' },
  { url: 'https://assets.mixkit.co/videos/1610/1610-720.mp4',   label: 'Deep Starfield' },
]

// Home-page background video (also used on first visit)
const HOME_VIDEO =
  'https://vz-7431b15a-30f.b-cdn.net/ef6949a0-ee51-4795-b2a9-1edc3b677a0c/play_480p.mp4'

const isFirstVisit = !localStorage.getItem('ft_visited')
const SELECTED = isFirstVisit
  ? { url: HOME_VIDEO, label: 'Fairy Tale Intro' }
  : BG_VIDEOS[Math.floor(Math.random() * BG_VIDEOS.length)]

export default function BackgroundVideo({ fairyMode = false }) {
  const videoRef = useRef(null)
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.play().catch(() => {
      // If autoplay blocked, retry on user interaction
      const retry = () => { vid.play().catch(() => {}); window.removeEventListener('click', retry) }
      window.addEventListener('click', retry, { once: true })
    })
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">

      {/* Dark base — visible while video buffers */}
      <div className="absolute inset-0 bg-[#05010F]" />

      {/* ── Background video — always visible once src is set ── */}
      {!errored && (
        <video
          ref={videoRef}
          src={SELECTED.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setErrored(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: fairyMode ? 0.72 : 1,
            filter:  fairyMode
              ? 'brightness(0.88) saturate(1.25) hue-rotate(12deg)'
              : 'none',
            transition: 'opacity 1.5s ease, filter 1.5s ease',
          }}
          aria-label={SELECTED.label}
        />
      )}

      {/* ── Readability gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.20) 50%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* ── Purple tint ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(80,20,180,0.18) 0%, transparent 70%)',
        }}
      />

      {/* ── Fairy-mode overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 110% 110% at 50% 38%, rgba(100,0,210,0.42) 0%, rgba(236,72,153,0.22) 52%, transparent 78%)',
          opacity:    fairyMode ? 1 : 0,
          transition: 'opacity 1.5s ease',
        }}
      />
    </div>
  )
}
