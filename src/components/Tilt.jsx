import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

/** 3D tilt that follows the pointer. Falls back to a static element for reduced motion. */
export default function Tilt({ children, className = '', max = 10 }) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 20 })

  if (reduce) return <div className={className}>{children}</div>
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const leave = () => { px.set(0.5); py.set(0.5) }
  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div onPointerMove={move} onPointerLeave={leave} style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  )
}
