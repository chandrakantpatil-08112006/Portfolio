import { motion } from 'motion/react'
import { CheckCircle2, ExternalLink } from 'lucide-react'
import { site } from '../config/site'
import { Section, Heading, Tag, LinkArrow, ease } from './ui'
import { GithubIcon } from './icons'
import ProjectForgeDemo from './ProjectForgeDemo'
import GestureDemo from './GestureDemo'

const demos = { projectforge: ProjectForgeDemo, gesture: GestureDemo }
// Alternate the glow colour per project so the two cards feel distinct
const glows = ['from-blue via-indigo to-cyan', 'from-teal via-blue to-indigo']

function Links({ repo, live }) {
  if (!repo && !live) return null
  return (
    <div className="mt-6 flex flex-wrap gap-5">
      {repo && <LinkArrow href={repo}><GithubIcon width={15} height={15} /> Source code</LinkArrow>}
      {live && <LinkArrow href={live}><ExternalLink size={15} aria-hidden="true" /> Live demo</LinkArrow>}
    </div>
  )
}

function ProjectCard({ p, index }) {
  const Demo = demos[p.demo]
  const enterX = index % 2 === 0 ? -34 : 34
  return (
    <motion.article initial={{ opacity: 0, x: enterX, filter: 'blur(5px)' }} whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }} whileHover={{ y: -4 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }} className="relative" onPointerMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }}>
      <div aria-hidden="true" className={`absolute -inset-px -z-10 rounded-[2rem] bg-gradient-to-br ${glows[index % glows.length]} opacity-40 blur-xl`} />
      <div className="beam glass interactive-card rounded-[2rem] p-6 sm:p-9">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Tag tone="indigo">{p.badge}</Tag>
            <h3 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl"><span className="grad-text">{p.name}</span></h3>
            <p className="mt-1 text-lg font-medium text-text">{p.tagline}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">{p.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
              {p.stack.map((s) => <li key={s}><Tag>{s}</Tag></li>)}
            </ul>
            <Links repo={p.repo} live={p.live} />
          </div>
          <ul className="space-y-3 lg:pt-2">
            {p.highlights.map((h, i) => (
              <motion.li key={h} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07, ease }} className="flex gap-3 text-[15px] leading-snug text-text/90">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-700" aria-hidden="true" />
                {h}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="mt-10 min-w-0">
          {Demo && <Demo />}
          {p.screenshots?.length > 0 && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {p.screenshots.map((s) => (
                <img key={s.src} src={s.src} alt={s.alt} loading="lazy" className="rounded-2xl border border-line" />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <Section id="projects">
      <Heading title="Projects" kicker="A full-stack product I’m building end to end, and a real-time computer interaction project." />
      <div className="space-y-10">
        {site.projects.map((p, i) => <ProjectCard key={p.name} p={p} index={i} />)}
      </div>
    </Section>
  )
}
