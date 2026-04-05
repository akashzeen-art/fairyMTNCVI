/**
 * FloatingParticles
 * Renders animated stars, sparkles, and magic-dust specks over the entire page.
 * Positions are generated once (outside the component) so they stay stable.
 */

import { motion } from 'framer-motion'

// ── Deterministic particle list (generated once at module level) ─────────────
function createParticles(count) {
  const particles = []
  const COLORS = [
    '#A78BFA', '#EC4899', '#FCD34D', '#60A5FA',
    '#F0ABFC', '#67E8F9', '#FFFFFF', '#F9A8D4',
  ]
  const SHAPES = ['✦', '✧', '⋆', '·', '★', '✨', '○']

  // Seed-like approach using index math for pseudo-randomness
  for (let i = 0; i < count; i++) {
    const seed  = (i * 137.508) % 100          // golden-angle derived pseudo-rand
    const seed2 = (i * 73.123 + 17) % 100
    const seed3 = (i * 41.618 + 7)  % 100

    particles.push({
      id:       i,
      x:        `${seed}%`,                    // horizontal %
      y:        `${seed2}%`,                   // vertical %
      size:     4 + (seed3 % 12),              // 4-16 px
      color:    COLORS[i % COLORS.length],
      shape:    SHAPES[i % SHAPES.length],
      opacity:  0.15 + (seed3 % 60) / 100,     // 0.15-0.75
      duration: 4 + (seed % 8),                // 4-12 s
      delay:    (seed2 / 100) * 6,             // 0-6 s stagger
      floatY:   -10 - (seed3 % 25),            // float up distance
    })
  }
  return particles
}

const PARTICLES = createParticles(70)

export default function FloatingParticles() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute select-none"
          style={{
            left:     p.x,
            top:      p.y,
            fontSize: p.size,
            color:    p.color,
            opacity:  p.opacity,
          }}
          animate={{
            y:       [0, p.floatY, 0],
            opacity: [p.opacity, p.opacity * 0.3, p.opacity],
            scale:   [1, 1.4, 1],
            rotate:  [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            delay:    p.delay,
            repeat:   Infinity,
            ease:     'easeInOut',
          }}
        >
          {p.shape}
        </motion.span>
      ))}

      {/* Extra large glowing orbs (ambient light blobs) */}
      {[
        { left: '10%', top: '20%', color: 'rgba(139,92,246,0.08)',  size: 300 },
        { left: '75%', top: '15%', color: 'rgba(236,72,153,0.06)',  size: 250 },
        { left: '50%', top: '60%', color: 'rgba(252,211,77,0.05)',  size: 350 },
        { left: '85%', top: '70%', color: 'rgba(96,165,250,0.06)',  size: 200 },
        { left: '20%', top: '80%', color: 'rgba(167,139,250,0.07)', size: 280 },
      ].map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-3xl"
          style={{
            left:            orb.left,
            top:             orb.top,
            width:           orb.size,
            height:          orb.size,
            background:      orb.color,
            transform:       'translate(-50%, -50%)',
          }}
          animate={{
            scale:   [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat:   Infinity,
            ease:     'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
