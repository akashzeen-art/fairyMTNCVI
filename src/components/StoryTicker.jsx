/**
 * StoryTicker
 * Infinite horizontal scrolling marquee of all story names.
 * Two rows scroll in opposite directions for a layered magical effect.
 */

import { videos } from '../data/videos'

const ICONS = ['👑', '🦊', '🔮', '🌙', '⚔️', '📖', '✨', '🌟', '🧚', '🐉', '🌹', '🦋']

// Build two rows with alternating icon+title items
const ROW_A = videos.map((v, i) => ({
  title: v.title,
  icon:  ICONS[i % ICONS.length],
}))

// Row B: reversed order + offset icons
const ROW_B = [...videos].reverse().map((v, i) => ({
  title: v.title,
  icon:  ICONS[(i + 4) % ICONS.length],
}))

function TickerRow({ items, direction = 'left', speed = 35 }) {
  // Duplicate items to create seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden w-full py-2" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
      <div
        className="flex gap-6 w-max"
        style={{
          animation: `ticker${direction === 'left' ? 'Left' : 'Right'} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="
              flex items-center gap-2 shrink-0
              px-4 py-1.5 rounded-full
              glass border border-white/[0.08]
              text-fairy-mist/70 hover:text-white
              font-body text-sm font-semibold
              hover:border-fairy-violet/40
              transition-colors duration-200
              cursor-default
            "
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function StoryTicker() {
  return (
    <section className="relative py-8 overflow-hidden">
      {/* Divider glow top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), rgba(236,72,153,0.4), transparent)' }}
      />
      {/* Divider glow bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), rgba(236,72,153,0.4), transparent)' }}
      />

      {/* Background tint */}
      <div className="absolute inset-0 bg-fairy-darker/30 pointer-events-none" />

      <div className="relative flex flex-col gap-3">
        <TickerRow items={ROW_A} direction="left"  speed={40} />
        <TickerRow items={ROW_B} direction="right" speed={50} />
      </div>

      <style>{`
        @keyframes tickerLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes tickerRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}
