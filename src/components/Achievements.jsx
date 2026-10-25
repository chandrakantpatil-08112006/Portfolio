import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Award, CalendarDays, Download, ExternalLink, FlaskConical, MapPin, ScrollText, Trophy, ZoomIn, X } from 'lucide-react'
import { site } from '../config/site'
import { Section, Heading, Stagger, Item, ease } from './ui'
import { Icon } from './icons'
import Tilt from './Tilt'

const base = import.meta.env.BASE_URL
const tones = [
  { chip: 'bg-amber/15 text-amber-700', glow: 'bg-amber/20' },
  { chip: 'bg-blue/15 text-indigo-600', glow: 'bg-blue/20' },
  { chip: 'bg-teal/15 text-teal-700', glow: 'bg-teal/20' },
]

/** True when the certificate file really exists (static hosts / dev server may answer 200 with index.html). */
function useFileExists(url) {
  const [ok, setOk] = useState(null)
  useEffect(() => {
    let live = true
    fetch(url, { method: 'HEAD' })
      .then((r) => live && setOk(r.ok && !(r.headers.get('content-type') || '').includes('text/html')))
      .catch(() => live && setOk(false))
    return () => { live = false }
  }, [url])
  return ok
}

function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])
  return (
    <motion.div role="dialog" aria-modal="true" aria-label={alt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={onClose} className="fixed inset-0 z-[90] grid place-items-center bg-black/80 p-4 backdrop-blur-md">
      <motion.img src={src} alt={alt} initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.35, ease }} onClick={(e) => e.stopPropagation()} className="max-h-[88vh] max-w-full rounded-2xl border border-slate-900/10 shadow-2xl" />
      <button type="button" onClick={onClose} aria-label="Close certificate" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/30">
        <X size={20} />
      </button>
    </motion.div>
  )
}

function Certificate({ cert, placeholder }) {
  const src = `${base}certificates/${cert.file}`
  const isPdf = /\.pdf$/i.test(cert.file)
  const exists = useFileExists(src)
  const pdfSrc = cert.pdf ? `${base}certificates/${cert.pdf}` : ''
  const pdfExists = useFileExists(pdfSrc || src)
  const [open, setOpen] = useState(false)

  if (!exists) {
    // Placeholder shown until the certificate file is added to /public/certificates/
    return (
      <div className="grid aspect-[4/3] place-items-center rounded-2xl border border-dashed border-slate-900/15 bg-slate-100/70 p-6 text-center">
        <div>
          <span className="bob mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue/15 text-indigo-600"><Award size={28} aria-hidden="true" /></span>
          <p className="mt-3 font-display text-lg font-bold">{placeholder.title}</p>
          <p className="mt-1 text-sm text-muted">{placeholder.sub}</p>
        </div>
      </div>
    )
  }

  if (isPdf) {
    return (
      <div className="grid aspect-[4/3] place-items-center rounded-2xl border border-slate-900/10 bg-slate-100/70 p-6 text-center">
        <div>
          <span className="pulse-ring mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue/15 text-indigo-600"><ScrollText size={28} aria-hidden="true" /></span>
          <p className="mt-3 font-display text-lg font-bold">{placeholder.title}</p>
          <a href={src} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue/80">
            View certificate <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 40, rotate: 3, scale: 0.94 }} whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, delay: 0.25, ease }}>
      <Tilt max={6} className="float-slow">
        <button type="button" onClick={() => setOpen(true)} aria-label="Enlarge certificate" className="cert-shine group relative block w-full overflow-hidden rounded-2xl border border-slate-900/10 bg-white shadow-[0_20px_50px_-20px_rgba(79,70,229,0.45)]">
          <img src={src} alt={cert.alt} loading="lazy" className="block w-full object-contain transition duration-500 group-hover:scale-[1.03]" />
          <span className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition duration-300 group-hover:bg-ink/55 group-hover:opacity-100">
            <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink"><ZoomIn size={16} aria-hidden="true" /> View certificate</span>
          </span>
        </button>
      </Tilt>
      {pdfSrc && pdfExists && (
        <a href={pdfSrc} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 underline decoration-blue/40 underline-offset-4 transition hover:decoration-blue">
          <Download size={15} aria-hidden="true" /> Open certificate PDF
        </a>
      )}
      <AnimatePresence>{open && <Lightbox src={src} alt={cert.alt} onClose={() => setOpen(false)} />}</AnimatePresence>
    </motion.div>
  )
}

const fromSide = { hidden: { opacity: 0, y: 22, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease } } }
const chipPop = { hidden: { opacity: 0, scale: 0.7, y: 10 }, show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 18 } } }

/** Featured card used for both the research paper and the webathon result: same layout, content comes from site.js. */
function Featured({ r, side = 'right', icon: BadgeIcon = FlaskConical, badgeSuffix = '', placeholder, className = '' }) {
  const meta = [
    r.conference && { Icon: ScrollText, text: r.conference },
    r.location && { Icon: MapPin, text: r.location },
    r.year && { Icon: CalendarDays, text: r.year },
  ].filter(Boolean)
  const x = side === 'right' ? 34 : -34
  return (
    <motion.article initial={{ opacity: 0, x, scale: 0.98 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }} className={`relative mb-6 ${className}`}>
      <div aria-hidden="true" className="absolute -inset-px -z-10 rounded-[2rem] bg-gradient-to-br from-blue via-indigo to-teal opacity-30 blur-xl" />
      <div className="beam glass shimmer rounded-[2rem] p-6 sm:p-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <motion.span variants={fromSide} className="inline-flex items-center gap-2 rounded-full border border-blue/40 bg-blue/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600">
              <BadgeIcon size={14} className="wiggle-loop" aria-hidden="true" /> {r.badge}{badgeSuffix}
            </motion.span>
            <motion.h3 variants={fromSide} className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{r.title}</motion.h3>
            {r.paperTitle && <motion.p variants={fromSide} className="mt-3 text-lg font-medium italic text-text/90">“{r.paperTitle}”</motion.p>}
            <motion.p variants={fromSide} className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{r.text}</motion.p>
            {meta.length > 0 && (
              <motion.ul variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }} className="mt-6 flex flex-wrap gap-2.5">
                {meta.map(({ Icon: I, text }) => (
                  <motion.li key={text} variants={chipPop} whileHover={{ y: -3, scale: 1.03 }} className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-sm text-text/90">
                    <I size={15} className="text-cyan-700" aria-hidden="true" /> {text}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>
          <div className="relative">
            {r.tag && (
              <motion.span initial={{ opacity: 0, scale: 0.4, rotate: -18 }} whileInView={{ opacity: 1, scale: 1, rotate: -6 }} viewport={{ once: true, margin: '-60px' }} transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.7 }} className="pulse-ring absolute -right-2 -top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber to-rose px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                <Trophy size={14} className="bob" aria-hidden="true" /> {r.tag}
              </motion.span>
            )}
            <Certificate cert={r.certificate} placeholder={placeholder} />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Achievements() {
  const { research, webathon, achievements } = site
  return (
    <Section id="achievements">
      <Heading title="Achievements" kicker="Research, competitions and consistent practice." />
      {research && <Featured r={research} badgeSuffix=" · IEEE" placeholder={{ title: 'Certificate of presentation', sub: 'IEEE ICONAT 2026' }} />}
      {webathon && <Featured r={webathon} side="left" icon={Trophy} placeholder={{ title: 'Certificate of participation', sub: 'TECHNOTSAV 2K26' }} />}
      <Stagger className="grid gap-5 md:grid-cols-3">
        {achievements.map((a, i) => {
          const t = tones[i % tones.length]
          return (
            <Item key={a.title} direction={['left', 'up', 'right'][i % 3]} className="group glass lift relative overflow-hidden rounded-3xl p-6">
              <div aria-hidden="true" className={`absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${t.glow} opacity-60`} />
              <span className={`wiggle relative grid h-12 w-12 place-items-center rounded-2xl ${t.chip}`}><Icon name={a.icon} size={24} /></span>
              <h3 className="relative mt-5 font-display text-xl font-bold leading-snug">{a.title}</h3>
              <p className="relative mt-2 leading-relaxed text-muted">{a.text}</p>
            </Item>
          )
        })}
      </Stagger>
    </Section>
  )
}
