import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

export const ease = [0.22, 1, 0.36, 1]

export function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28 ${className}`}>
      {children}
    </section>
  )
}

export function Heading({ title, kicker }) {
  const words = title.split(' ')
  return (
    <div className="mb-12 max-w-2xl">
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        aria-label={title}
        className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl"
      >
        {words.map((w, i) => (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: '110%', rotate: 4 }, show: { y: 0, rotate: 0, transition: { duration: 0.7, ease } } }}
            >
              {w}
              {i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </motion.h2>
      <motion.span aria-hidden="true" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.35, ease }} className="h-underline mt-4 block" />
      {kicker && (
        <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.25, ease }} className="mt-4 text-lg leading-relaxed text-muted">
          {kicker}
        </motion.p>
      )}
    </div>
  )
}

export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const reveal = (x, y) => ({
  hidden: { opacity: 0, x, y, filter: 'blur(6px)' },
  show: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease } },
})
const revealDirections = {
  up: reveal(0, 26),
  down: reveal(0, -26),
  left: reveal(26, 0),
  right: reveal(-26, 0),
}

export function Stagger({ className = '', children, as: Tag = 'div' }) {
  const M = motion[Tag]
  return (
    <M className={className} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
      {children}
    </M>
  )
}

export function Item({ className = '', children, as: Tag = 'div', direction = 'up', ...rest }) {
  const M = motion[Tag]
  return <M className={className} variants={revealDirections[direction] ?? revealDirections.up} {...rest}>{children}</M>
}

export function Tag({ children, tone = 'default' }) {
  const tones = {
    default: 'border-line bg-white/70 text-muted',
    indigo: 'border-indigo/30 bg-indigo/10 text-indigo-700',
  }
  return <span className={`rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>
}

export function Button({ href, children, variant = 'primary', icon, external, download, ...rest }) {
  const styles =
    variant === 'primary'
      ? 'grad-bg btn-shine text-white shadow-[0_10px_34px_-8px_rgba(79,70,229,0.75)] hover:shadow-[0_14px_44px_-6px_rgba(79,70,229,0.9)]'
      : 'glass text-text hover:bg-slate-900/10'
  return (
    <motion.a
      href={href}
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-shadow ${styles}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download } : {})}
      {...rest}
    >
      {icon}
      {children}
    </motion.a>
  )
}

export function LinkArrow({ href, children }) {
  if (!href) return null
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-text underline decoration-indigo/60 underline-offset-4 transition hover:decoration-teal">
      {children}
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  )
}
