import { motion } from 'motion/react'
import { site } from '../config/site'
import { Section, Heading, Stagger, Item } from './ui'
import { Icon } from './icons'

// One vivid colour per group; used for the marquee dots, card glow and chips.
const colors = ['#0891b2', '#2563eb', '#4f46e5', '#0f766e', '#b45309', '#047857', '#0284c7']
const spans = ['md:col-span-3', 'md:col-span-3', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-3', 'md:col-span-3']

const all = site.skills.flatMap((g, gi) => g.items.map((name) => ({ name, color: colors[gi % colors.length] })))
const unique = [...new Map(all.map((s) => [s.name, s])).values()]
const half = Math.ceil(unique.length / 2)
const rows = [unique.slice(0, half), unique.slice(half)]

function Pill({ s }) {
  return (
    <span className="mr-3 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-slate-900/10 bg-white/85 px-4 py-2 shadow-sm text-sm font-medium text-text">
      <span className="h-2 w-2 rounded-full" style={{ background: s.color, boxShadow: `0 0 10px ${s.color}` }} />
      {s.name}
    </span>
  )
}

function Marquee({ items, reverse, dur }) {
  return (
    <div className={`marquee ${reverse ? 'marquee-rev' : ''}`} style={{ '--dur': dur }}>
      <div className="marquee-track">
        <div className="flex shrink-0">{items.map((s) => <Pill key={s.name} s={s} />)}</div>
        <div className="marquee-dup flex shrink-0" aria-hidden="true">{items.map((s) => <Pill key={s.name} s={s} />)}</div>
      </div>
    </div>
  )
}

function SpotCard({ g, color, span }) {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Item direction={['left', 'up', 'right', 'down'][site.skills.indexOf(g) % 4]} className={`${span}`}>
      <div onPointerMove={move} style={{ '--c': color }} className="spot glass group relative h-full overflow-hidden rounded-3xl p-6">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 opacity-90" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
        <div aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-70" style={{ background: color }} />
        <div className="relative">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" style={{ background: `color-mix(in srgb, ${color} 22%, transparent)`, color }}>
                <Icon name={g.icon} size={22} />
              </span>
              <h3 className="font-display text-xl font-bold">{g.group}</h3>
            </div>
            <span className="font-mono text-xs text-muted">{String(g.items.length).padStart(2, '0')}</span>
          </div>
          <ul className="flex flex-wrap gap-2">
            {g.items.map((s) => (
              <motion.li key={s} whileHover={{ y: -3, scale: 1.05 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }} className="cursor-default rounded-full border px-3 py-1.5 text-sm font-medium text-text" style={{ borderColor: `color-mix(in srgb, ${color} 45%, transparent)`, background: `color-mix(in srgb, ${color} 12%, transparent)` }}>
                {s}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Item>
  )
}

export default function Skills() {
  return (
    <Section id="skills">
      <Heading title="The tools I work with" kicker={`${unique.length} technologies across the stack, from the languages I solve problems in to the machine learning libraries and tools I ship with.`} />
      <div className="-mx-5 mb-10 space-y-3 sm:-mx-8">
        <Marquee items={rows[0]} dur="48s" />
        <Marquee items={rows[1]} reverse dur="56s" />
      </div>
      <Stagger className="grid gap-4 md:grid-cols-6">
        {site.skills.map((g, i) => (
          <SpotCard key={g.group} g={g} color={colors[i % colors.length]} span={spans[i] ?? 'md:col-span-2'} />
        ))}
      </Stagger>
    </Section>
  )
}
