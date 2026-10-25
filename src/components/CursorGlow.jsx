import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from 'motion/react'

const CLICKABLE = 'a, button, [role="button"], input[type="submit"], input[type="button"], select, label, summary'
const TEXTUAL = 'input:not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]'

/** Themed cursor (ring + dot + ambient glow + click ripple) and a scroll progress bar. Fine pointers only. */
export default function CursorGlow() {
  const reduce = useReducedMotion()
  const [on, setOn] = useState(false)
  const [mode, setMode] = useState('idle') // idle | link | text
  const [down, setDown] = useState(false)
  const [ripples, setRipples] = useState([])
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 140, damping: 24, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 140, damping: 24, mass: 0.6 })
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    setOn(true)
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target instanceof Element ? e.target : null
      setMode(t?.closest(TEXTUAL) ? 'text' : t?.closest(CLICKABLE) ? 'link' : 'idle')
    }
    const press = (e) => {
      setDown(true)
      const id = performance.now()
      setRipples((r) => [...r.slice(-3), { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setRipples((r) => r.filter((k) => k.id !== id)), 600)
    }
    const release = () => setDown(false)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', press, { passive: true })
    window.addEventListener('pointerup', release, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
    }
  }, [reduce, x, y])

  const link = mode === 'link'
  return (
    <>
      {!reduce && <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX: progress }} />}
      {on && (
        <>
          <motion.div
            aria-hidden="true"
            style={{ x: sx, y: sy }}
            className="pointer-events-none fixed left-0 top-0 z-[5] -ml-[200px] -mt-[200px] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.14),rgba(124,58,237,0.06)_45%,transparent_70%)]"
          />
          <motion.div
            aria-hidden="true"
            style={{ x: sx, y: sy }}
            className={`custom-cursor-ring pointer-events-none fixed left-0 top-0 z-[60] ${mode === 'text' ? 'is-text' : ''} ${down ? 'is-down' : ''}`}
            animate={{ scale: down ? 0.8 : link ? 1.55 : 1, opacity: mode === 'text' ? 1 : link ? 0.9 : 0.65 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          />
          <motion.div
            aria-hidden="true"
            style={{ x, y }}
            className="custom-cursor-dot pointer-events-none fixed left-0 top-0 z-[61]"
            animate={{ scale: mode === 'text' ? 0 : link ? 0.65 : 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          />
          {ripples.map((r) => (
            <span key={r.id} aria-hidden="true" className="custom-cursor-ripple pointer-events-none fixed z-[59]" style={{ left: r.x, top: r.y }} />
          ))}
        </>
      )}
    </>
  )
}
