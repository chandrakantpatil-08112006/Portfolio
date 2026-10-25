import { motion } from 'motion/react'
import { BadgeCheck } from 'lucide-react'
import { site } from '../config/site'
import { Section, Heading, Stagger, Item } from './ui'

export default function Certifications() {
  return (
    <Section id="certifications">
      <Heading title="Certifications" />
      <Stagger className="grid gap-4 sm:grid-cols-2">
        {site.certifications.map((c, i) => (
          <Item key={c.title} direction={i % 2 ? 'right' : 'left'}>
            <motion.div
              whileHover={{ y: -6, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="cert-card group glass relative flex h-full items-start gap-4 overflow-hidden rounded-2xl p-5"
            >
              <span aria-hidden="true" className="cert-bar" />
              <motion.span
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 + i * 0.08 }}
                className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-700/10 text-cyan-700"
              >
                <BadgeCheck size={26} className="wiggle" aria-hidden="true" />
              </motion.span>
              <div>
                <h3 className="font-display text-lg font-bold leading-snug">{c.title}</h3>
                <p className="mt-1 text-sm text-muted">{c.issuer}</p>
              </div>
            </motion.div>
          </Item>
        ))}
      </Stagger>
    </Section>
  )
}
