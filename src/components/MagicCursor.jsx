/**
 * MagicCursor
 * Spawns sparkle particles that trail behind the mouse cursor.
 * Disabled on touch devices (no cursor).
 */

import { useEffect, useRef } from 'react'

const COLORS = ['#FCD34D', '#A78BFA', '#EC4899', '#60A5FA', '#F0ABFC', '#ffffff']
const SHAPES = ['✦', '✧', '⋆', '★', '·', '✨']

function spawnSparkle(x, y) {
  const el = document.createElement('span')
  el.textContent = SHAPES[Math.floor(Math.random() * SHAPES.length)]

  const size   = 10 + Math.random() * 14
  const color  = COLORS[Math.floor(Math.random() * COLORS.length)]
  const angle  = Math.random() * 360
  const dist   = 30 + Math.random() * 50
  const dur    = 600 + Math.random() * 500

  Object.assign(el.style, {
    position:      'fixed',
    left:          `${x}px`,
    top:           `${y}px`,
    fontSize:      `${size}px`,
    color,
    pointerEvents: 'none',
    zIndex:        9999,
    userSelect:    'none',
    lineHeight:    1,
    transform:     'translate(-50%, -50%)',
    willChange:    'transform, opacity',
    transition:    `transform ${dur}ms ease-out, opacity ${dur}ms ease-out`,
  })

  document.body.appendChild(el)

  // Trigger animation next frame
  requestAnimationFrame(() => {
    const rad = (angle * Math.PI) / 180
    el.style.transform = `translate(calc(-50% + ${Math.cos(rad) * dist}px), calc(-50% + ${Math.sin(rad) * dist}px)) scale(0.2) rotate(${angle}deg)`
    el.style.opacity = '0'
  })

  setTimeout(() => el.remove(), dur + 50)
}

export default function MagicCursor() {
  const lastSpawn = useRef(0)

  useEffect(() => {
    // Don't run on touch-only devices
    if (window.matchMedia('(hover: none)').matches) return

    const onMove = (e) => {
      const now = Date.now()
      if (now - lastSpawn.current < 60) return   // throttle: max ~16 sparks/sec
      lastSpawn.current = now
      spawnSparkle(e.clientX, e.clientY)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return null   // no DOM output — sparkles are appended directly to body
}
