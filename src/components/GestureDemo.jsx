import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { Camera, Hand, MousePointer2, ScanLine } from 'lucide-react'

// MediaPipe's 21 hand landmarks, laid out as an open hand in a 100x100 box.
const PTS = [
  [50, 95], [38, 86], [29, 76], [23, 66], [18, 57],
  [40, 60], [38, 46], [37, 36], [36, 27],
  [50, 57], [50, 42], [50, 31], [50, 21],
  [60, 59], [62, 46], [63, 37], [64, 29],
  [69, 65], [73, 55], [75, 48], [77, 41],
]
const LINKS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [17, 18], [18, 19], [19, 20], [0, 17],
]
const stages = [
  { icon: Camera, label: 'Capture frame' },
  { icon: ScanLine, label: 'Detect hand landmarks' },
  { icon: Hand, label: 'Recognize gesture' },
  { icon: MousePointer2, label: 'Move cursor' },
]
// Sample targets on the mock screen (percent boxes)
const targets = [
  { x: 8, y: 14, w: 26, h: 26, label: 'Docs', color: '#06b6d4' },
  { x: 66, y: 14, w: 26, h: 26, label: 'Browser', color: '#f43f5e' },
  { x: 36, y: 60, w: 28, h: 26, label: 'Music', color: '#f59e0b' },
]

export default function GestureDemo() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.45)
  const sx = useSpring(mx, { stiffness: 220, damping: 26 })
  const sy = useSpring(my, { stiffness: 220, damping: 26 })
  const [hit, setHit] = useState(-1)
  const manual = useRef(false)

  const handLeft = useTransform(mx, (v) => `${v * 100}%`)
  const handTop = useTransform(my, (v) => `${v * 100}%`)
  const curLeft = useTransform(sx, (v) => `${v * 100}%`)
  const curTop = useTransform(sy, (v) => `${v * 100}%`)
  const readout = useTransform([mx, my], ([x, y]) => `x ${x.toFixed(2)}  y ${y.toFixed(2)}`)

  const update = (x, y) => {
    mx.set(x); my.set(y)
    const px = x * 100, py = y * 100
    setHit(targets.findIndex((t) => px >= t.x && px <= t.x + t.w && py >= t.y && py <= t.y + t.h))
  }

  // Idle auto-demo: the hand traces a loop until the visitor takes over.
  useEffect(() => {
    if (reduce) return
    let raf, t0 = performance.now()
    const tick = (now) => {
      if (!manual.current) {
        const t = (now - t0) / 1000
        update(0.5 + 0.36 * Math.sin(t * 0.7), 0.5 + 0.3 * Math.sin(t * 1.1 + 1))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    manual.current = true
    update(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)))
  }
  const leave = () => { manual.current = false }

  return (
    <div className="glass rounded-3xl p-4 sm:p-6">
      <ol className="mb-5 flex flex-wrap gap-2" aria-label="Pipeline">
        {stages.map((s, i) => (
          <li key={s.label} className="stage flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium" style={{ animationDelay: `${i * 1.5}s`, background: 'rgb(255 255 255 / 0.05)' }}>
            <s.icon size={15} aria-hidden="true" />
            {s.label}
          </li>
        ))}
      </ol>
      <div className="grid gap-4 md:grid-cols-2">
        {/* Camera panel */}
        <div>
          <p className="mb-2 flex items-center justify-between text-xs font-semibold text-muted">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 animate-pulse rounded-full bg-rose motion-reduce:animate-none" /> Camera feed (simulated)</span>
            <motion.span className="font-mono">{readout}</motion.span>
          </p>
          <div onPointerMove={move} onPointerLeave={leave} className="relative aspect-[4/3] cursor-crosshair touch-none overflow-hidden rounded-2xl border border-line bg-[radial-gradient(circle_at_50%_40%,#e0f2fe,#bfdbfe)]">
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,.10)_1px,transparent_1px)] bg-[size:28px_28px]" />
            <motion.div style={{ left: handLeft, top: handTop }} className="pointer-events-none absolute h-[46%] w-[34%] -translate-x-1/2 -translate-y-1/2">
              <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" aria-hidden="true">
                <rect x="6" y="14" width="88" height="84" rx="6" fill="none" stroke="#059669" strokeWidth="1.2" strokeDasharray="5 4" />
                {LINKS.map(([a, b]) => (
                  <line key={`${a}-${b}`} x1={PTS[a][0]} y1={PTS[a][1]} x2={PTS[b][0]} y2={PTS[b][1]} stroke="url(#hand-g)" strokeWidth="2" strokeLinecap="round" />
                ))}
                {PTS.map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r={[4, 8, 12, 16, 20].includes(i) ? 3.4 : 2.4} fill={i === 8 ? '#f59e0b' : '#1d4ed8'} />
                ))}
                <defs>
                  <linearGradient id="hand-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#22d3ee" /><stop offset="1" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </div>
        {/* Screen panel */}
        <div>
          <p className="mb-2 text-xs font-semibold text-muted">Screen (cursor follows the hand)</p>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500">
            {targets.map((t, i) => (
              <motion.div
                key={t.label}
                animate={{ scale: hit === i ? 1.07 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="absolute grid place-items-center rounded-xl border text-sm font-semibold text-white"
                style={{
                  left: `${t.x}%`, top: `${t.y}%`, width: `${t.w}%`, height: `${t.h}%`,
                  borderColor: hit === i ? t.color : 'rgb(255 255 255 / 0.2)',
                  background: hit === i ? `color-mix(in srgb, ${t.color} 45%, transparent)` : 'rgb(255 255 255 / 0.08)',
                  boxShadow: hit === i ? `0 0 28px -2px ${t.color}` : 'none',
                }}
              >
                {t.label}
              </motion.div>
            ))}
            <motion.div style={{ left: curLeft, top: curTop }} className="pointer-events-none absolute z-10">
              <span aria-hidden="true" className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-white/40" style={{ animation: 'pulse-ring 1.6s ease-out infinite' }} />
              <MousePointer2 size={26} className="relative fill-white text-ink drop-shadow-[0_2px_6px_rgba(15,23,42,0.5)]" aria-hidden="true" />
            </motion.div>
          </div>
        </div>
      </div>
      <p className="mt-5 text-xs text-muted">Simulated preview, not live camera input. Move your pointer over the camera panel to steer the hand and watch the cursor follow.</p>
    </div>
  )
}
