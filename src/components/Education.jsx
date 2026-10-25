import { motion } from 'motion/react'
import { GraduationCap } from 'lucide-react'
import { site } from '../config/site'
import { Section, Heading, Stagger, Item, ease } from './ui'

export default function Education() {
  return (
    <Section id="education">
      <Heading title="Education" kicker="Strong academics alongside hands-on building." />
      <div className="relative">
        <motion.div aria-hidden="true" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1.1, ease }} className="absolute bottom-2 left-[19px] top-2 w-px origin-top bg-gradient-to-b from-blue via-indigo to-teal/40" />
        <Stagger as="ol" className="space-y-6">
          {site.education.map((e, i) => (
            <Item as="li" key={e.school} direction={i % 2 ? 'right' : 'left'} className="relative pl-14">
              <span className={`absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full ${i === 0 ? 'grad-bg pulse-ring text-white' : 'glass text-muted'}`}>
                <GraduationCap size={18} aria-hidden="true" />
              </span>
              <div className={`glass lift rounded-3xl p-6 ${i === 0 ? 'border-indigo/40' : ''}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-display text-xl font-bold">{e.school}</h3>
                  <span className="font-mono text-sm text-muted">{e.period}</span>
                </div>
                <p className="mt-1 text-text/90">{e.degree}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                  <span>{e.place}</span>
                  <span className="grad-text font-display text-lg font-bold">{e.score}</span>
                </div>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
