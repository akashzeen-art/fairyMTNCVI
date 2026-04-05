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

const PRELOADER_VIDEO =
  'https://vz-7431b15a-30f.b-cdn.net/ef6949a0-ee51-4795-b2a9-1edc3b677a0c/play_480p.mp4'

const isFirstVisit = !localStorage.getItem('ft_visited')
const SELECTED = isFirstVisit
  ? { url: PRELOADER_VIDEO, label: 'Fairy Tale Intro' }
  : BG_VIDEOS[Math.floor(Math.random() * BG_VIDEOS.length)]

export default function BackgroundVideo() {
  const videoRef = useRef(null)
  const [loaded,  setLoaded]  = useState(false)
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">

      {/* Pure black base so nothing bleeds through before video loads */}
      <div className="absolute inset-0 bg-black" />

      {/* ── Video — full brightness, no opacity reduction ── */}
      {!errored && (
        <video
          ref={videoRef}
          src={SELECTED.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity:    loaded ? 1 : 0,
            transition: 'opacity 1.2s ease',
          }}
          aria-label={SELECTED.label}
        />
      )}

      {/* ── Single lightweight overlay — just enough to keep text readable ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.20) 50%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Subtle purple tint for fairy-tale atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(80,20,180,0.18) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
