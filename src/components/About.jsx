import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { MapPin } from 'lucide-react'
import { site } from '../config/site'
import { Section, Heading, Stagger, Item, ease } from './ui'
import Tilt from './Tilt'

// Small glowing dots that roam around the photo outline (two rings, opposite directions).
const DOTS = [
  { ring: 'o1', c: '#4f46e5', s: 13, dur: 16, delay: 0 },
  { ring: 'o1', c: '#0891b2', s: 10, dur: 16, delay: -3.2 },
  { ring: 'o1', c: '#f59e0b', s: 12, dur: 16, delay: -6.4 },
  { ring: 'o1', c: '#10b981', s: 9, dur: 16, delay: -9.6 },
  { ring: 'o1', c: '#f43f5e', s: 11, dur: 16, delay: -12.8 },
  { ring: 'o2', c: '#4f46e5', s: 11, dur: 24, delay: 0 },
  { ring: 'o2', c: '#0d9488', s: 9, dur: 24, delay: -6 },
  { ring: 'o2', c: '#0891b2', s: 13, dur: 24, delay: -12 },
  { ring: 'o2', c: '#f59e0b', s: 9, dur: 24, delay: -18 },
]
function OrbitDots() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      {DOTS.map((d, i) => (
        <span key={i} className={`orbit-dot ${d.ring}`} style={{ '--c': d.c, '--dur': `${d.dur}s`, '--delay': `${d.delay}s`, width: d.s, height: d.s, marginLeft: -d.s / 2, marginTop: -d.s / 2 }} />
      ))}
    </div>
  )
}

/** Animates the number inside values like "250+", "9.39", "2028" when scrolled into view. */
function CountValue({ value }) {
  const m = String(value).match(/^(\D*)([\d.]+)(.*)$/)
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const target = m ? parseFloat(m[2]) : 0
  const decimals = m && m[2].includes('.') ? m[2].split('.')[1].length : 0
  const isYear = m && /^(19|20)\d\d$/.test(m[2])
  const mv = useMotionValue(reduce || isYear ? target : 0)
  const text = useTransform(mv, (n) => n.toFixed(decimals))
  useEffect(() => {
    if (!m || reduce || isYear || !inView) return
    const c = animate(mv, target, { duration: 1.6, ease: [0.16, 1, 0.3, 1] })
    return () => c.stop()
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps
  if (!m) return <>{value}</>
  return <span ref={ref}>{m[1]}<motion.span>{text}</motion.span>{m[3]}</span>
}

export default function About() {
  const { about, photo, name, initials, location } = site
  return (
    <Section id="about">
      <Heading title={about.heading} />
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="mx-auto w-full max-w-xs lg:mx-0">
          <Tilt>
            <div className="relative">
              {/* rotating colour ring behind the photo */}
              <div aria-hidden="true" className="absolute -inset-[3px] overflow-hidden rounded-[2.1rem]">
                <div className="spin-slow absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,#0891b2,#4f46e5,#7c3aed,#0d9488,#0891b2)]" />
              </div>
              <div aria-hidden="true" className="grad-bg absolute -inset-4 -z-10 rounded-[2.5rem] opacity-40 blur-2xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink-2">
                {photo ? (
                  <img src={photo} alt={`Portrait of ${name}`} width="900" height="1200" loading="eager" className="h-full w-full object-cover object-[50%_20%]" />
                ) : (
                  <span className="grad-text grid h-full place-items-center font-display text-8xl font-extrabold">{initials}</span>
                )}
              </div>
              <OrbitDots />
            </div>
          </Tilt>
          <p className="mt-5 flex items-center justify-center gap-1.5 text-sm text-muted lg:justify-start">
            <MapPin size={15} className="bob text-rose-600" aria-hidden="true" />
            {location}
          </p>
        </motion.div>
        <div>
          <Stagger className="space-y-5 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => <Item as="p" key={p} direction={['left', 'right', 'up', 'down'][i % 4]} className="max-w-prose">{p}</Item>)}
          </Stagger>
          <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {about.facts.map((f, i) => (
              <Item key={f.label} direction={['up', 'left', 'down', 'right'][i % 4]} className="glass lift rounded-2xl p-4">
                <p className="grad-text font-display text-3xl font-extrabold" style={{ animationDelay: `${i * -2}s` }}><CountValue value={f.value} /></p>
                <p className="mt-1 text-sm text-muted">{f.label}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  )
}
