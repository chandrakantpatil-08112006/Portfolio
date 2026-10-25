import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Download, FolderGit2 } from 'lucide-react'
import { site } from '../config/site'
import { Button, ease } from './ui'
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './icons'

function RoleText({ roles }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [text, setText] = useState(reduce ? roles[0] : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) { setText(roles[0]); return }
    const full = roles[i % roles.length]
    let delay = deleting ? 35 : 75
    if (!deleting && text === full) delay = 1700
    if (deleting && text === '') delay = 250
    const t = setTimeout(() => {
      if (!deleting && text === full) return setDeleting(true)
      if (deleting && text === '') { setDeleting(false); return setI((n) => n + 1) }
      setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, i, roles, reduce])

  return (
    <span className="sheen-text font-semibold">
      <span className="sr-only">{roles.join(', ')}</span>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true" className="caret ml-0.5 inline-block w-[3px] translate-y-[3px] rounded-full bg-teal" style={{ height: '1em' }} />
    </span>
  )
}

/* ---------- JSON profile card ---------- */
const group = (name) => site.skills.find((g) => g.group === name)?.items ?? []

function buildProfile() {
  const { profileJson } = site.hero
  return {
    name: site.name,
    ...profileJson,
    tools: group('Tools'),
  }
}

const C = {
  key: 'text-indigo-600',
  str: 'text-emerald-600',
  num: 'text-orange-500',
  punct: 'text-slate-400',
}
const line = { hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.35, ease } } }

function Row({ k, last, children }) {
  return (
    <motion.div variants={line} className="pl-5">
      <span className={C.key}>"{k}"</span>
      <span className={C.punct}>: </span>
      {children}
      {!last && <span className={C.punct}>,</span>}
    </motion.div>
  )
}

function ProfileJson() {
  const data = buildProfile()
  const entries = Object.entries(data)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease }}
      className="relative"
    >
      <div className="float">
        <div className="relative">
          <div aria-hidden="true" className="grad-bg absolute -inset-1 rounded-[1.75rem] opacity-40 blur-xl" />
          <div className="relative overflow-hidden rounded-3xl border border-slate-900/10 bg-white/90 shadow-[0_30px_80px_-30px_rgba(79,70,229,0.45)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-900/10 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-rose" />
                  <span className="h-3 w-3 rounded-full bg-amber" />
                  <span className="h-3 w-3 rounded-full bg-emerald" />
                </div>
                <span className="font-mono text-xs text-muted">profile.json</span>
              </div>
              {site.photo && <img src={site.photo} alt="" className="h-8 w-8 rounded-full border-2 border-white shadow object-cover object-top" />}
            </div>
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.9 } } }}
              className="p-5 font-mono text-[13px] leading-7 sm:text-sm"
              role="img"
              aria-label={`Profile summary: ${data.role}, ${data.focus}, CGPA ${data.cgpa}`}
            >
              <motion.div variants={line} className={C.punct}>{'{'}</motion.div>
              {entries.map(([k, v], idx) => {
                const last = idx === entries.length - 1
                if (Array.isArray(v)) {
                  return (
                    <motion.div key={k} variants={line} className="pl-5">
                      <span className={C.key}>"{k}"</span>
                      <span className={C.punct}>: [</span>
                      <div className="flex flex-wrap gap-x-2 pl-5 leading-7">
                        {v.map((item, i) => (
                          <span key={item}>
                            <span className={C.str}>"{item}"</span>
                            {i < v.length - 1 && <span className={C.punct}>,</span>}
                          </span>
                        ))}
                      </div>
                      <span className={C.punct}>]{!last && ','}</span>
                    </motion.div>
                  )
                }
                return (
                  <Row key={k} k={k} last={last}>
                    {typeof v === 'number' ? <span className={C.num}>{v}</span> : <span className={C.str}>"{v}"</span>}
                  </Row>
                )
              })}
              <motion.div variants={line} className={C.punct}>
                {'}'}
                <span aria-hidden="true" className="caret ml-1 inline-block h-4 w-2 translate-y-[3px] bg-teal" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const { hero, links, resume, availability, name } = site
  const social = [
    { href: links.github, label: 'GitHub', Icon: GithubIcon },
    { href: links.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { href: links.leetcode, label: 'LeetCode', Icon: LeetcodeIcon },
  ].filter((s) => s.href)

  return (
    <section id="top" className="relative mx-auto grid min-h-[100svh] w-full max-w-6xl items-center gap-14 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-70 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
          </span>
          {availability}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="text-2xl font-medium text-muted sm:text-3xl">{hero.greeting}</span>
          <br />
          <span aria-label={name}>
            {name.split(' ').map((w, i, arr) => (
              <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-2 align-bottom">
                <motion.span className="inline-block" initial={{ y: '105%', opacity: 0, rotate: 3 }} animate={{ y: 0, opacity: 1, rotate: 0 }} transition={{ duration: 0.9, delay: 0.25 + i * 0.18, ease }}>
                  <span className="grad-text">{w}</span>
                  {i < arr.length - 1 ? '\u00A0' : ''}
                </motion.span>
              </span>
            ))}
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease }} className="mt-6 font-display text-2xl sm:text-3xl">
          {hero.roleLead} <RoleText roles={hero.roles} />
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }} className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          {hero.description}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45, ease }} className="mt-9 flex flex-wrap gap-3">
          <Button href="#projects" icon={<FolderGit2 size={18} />}>View projects</Button>
          <Button href={resume.href} download={resume.filename} variant="ghost" icon={<Download size={18} />}>Download resume</Button>
        </motion.div>
        <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-8 flex gap-3" aria-label="Social links">
          {social.map(({ href, label, Icon }) => (
            <li key={label}>
              <motion.a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} whileHover={{ y: -4, scale: 1.1, rotate: -4 }} className="glass grid h-11 w-11 place-items-center rounded-full text-muted transition hover:text-cyan-700">
                <Icon width={18} height={18} />
              </motion.a>
            </li>
          ))}
        </motion.ul>
      </div>
      <ProfileJson />
    </section>
  )
}
