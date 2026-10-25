import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { site } from '../config/site'
import { Section, Heading, Button, Stagger, Item, ease } from './ui'
import { LeetcodeIcon } from './icons'

function CountUp({ to }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const v = useMotionValue(reduce ? to : 0)
  const rounded = useTransform(v, (n) => Math.round(n))
  useEffect(() => {
    if (inView && !reduce) {
      const c = animate(v, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1] })
      return () => c.stop()
    }
  }, [inView, reduce, to, v])
  return <span ref={ref}><motion.span>{rounded}</motion.span>+</span>
}

export default function LeetCode() {
  const { leetcode, links } = site
  return (
    <Section id="leetcode">
      <Heading title="Problem solving" />
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease }} className="glass relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
        <div aria-hidden="true" className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-blue/25 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-teal/20 blur-3xl" />
        <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr]">
          <div>
            <p className="font-display text-7xl font-extrabold leading-none sm:text-8xl"><span className="grad-text"><CountUp to={leetcode.solved} /></span></p>
            <p className="mt-3 text-lg text-muted">problems solved on LeetCode</p>
          </div>
          <div className="md:border-l md:border-line md:pl-10">
            <p className="max-w-md text-lg leading-relaxed text-text/90">{leetcode.note}</p>
            <p className="mt-3 text-sm text-muted">Primary language: {leetcode.language}</p>
            {links.leetcode && (
              <div className="mt-6">
                <Button href={links.leetcode} external variant="ghost" icon={<LeetcodeIcon width={18} height={18} />}>View my LeetCode profile</Button>
              </div>
            )}
          </div>
        </div>

        <div className="relative mt-12 border-t border-line pt-10">
          <h3 className="font-display text-2xl font-bold">Topics I’ve practiced</h3>
          <Stagger className="mt-6 grid gap-4 md:grid-cols-3">
            {leetcode.topics.map((t, i) => (
              <Item key={t.level} direction={['left', 'up', 'right'][i % 3]} className="rounded-2xl border bg-white/70 p-5" style={{ borderColor: `color-mix(in srgb, ${t.color} 40%, transparent)` }}>
                <p className="mb-4 flex items-center gap-2 font-display text-lg font-bold" style={{ color: t.color }}>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.color, boxShadow: `0 0 12px ${t.color}` }} />
                  {t.level}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {t.items.map((it) => (
                    <li key={it.slug}>
                      <motion.a
                        href={`https://leetcode.com/tag/${it.slug}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3, scale: 1.05 }}
                        className="block rounded-full border px-3 py-1.5 text-sm font-medium text-text transition-colors"
                        style={{ borderColor: `color-mix(in srgb, ${t.color} 50%, transparent)`, background: `color-mix(in srgb, ${t.color} 14%, transparent)` }}
                      >
                        {it.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </Item>
            ))}
          </Stagger>
        </div>
      </motion.div>
    </Section>
  )
}
