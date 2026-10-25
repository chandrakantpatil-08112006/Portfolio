import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

const STARS = Array.from({ length: 26 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  size: 1 + (i % 3),
  delay: `${(i % 9) * 0.55}s`,
  dur: `${3 + (i % 5)}s`,
}))


function Orb({ className, drift, parallax, reduce, scrollY }) {
  const y = useTransform(scrollY, (v) => (reduce ? 0 : v * parallax))
  return (
    <motion.div style={{ y }} className="absolute" aria-hidden="true">
      <div className={`orb ${className}`} style={{ animation: `${drift} 24s ease-in-out infinite` }} />
    </motion.div>
  )
}

export default function Background() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const o = { reduce, scrollY }
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(79,70,229,0.16),transparent)]" />
      <Orb {...o} parallax={-0.05} drift="drift-a" className="left-[-12vw] top-[-8vh] h-[46vw] w-[46vw] max-h-[620px] max-w-[620px] bg-cyan-300/50" />
      <Orb {...o} parallax={-0.09} drift="drift-b" className="right-[-14vw] top-[14vh] h-[42vw] w-[42vw] max-h-[580px] max-w-[580px] bg-violet-300/50" />
      <Orb {...o} parallax={-0.03} drift="drift-c" className="left-[26vw] top-[62vh] h-[38vw] w-[38vw] max-h-[520px] max-w-[520px] bg-indigo-200/60" />
      <Orb {...o} parallax={-0.07} drift="drift-a" className="right-[8vw] top-[78vh] h-[30vw] w-[30vw] max-h-[420px] max-w-[420px] bg-amber-200/60" />
      <div className="dot-grid absolute inset-0" />
      {STARS.map((s, i) => (
        <span key={i} className="twinkle absolute rounded-full bg-indigo-400" style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay, animationDuration: s.dur }} />
      ))}
    </div>
  )
}
