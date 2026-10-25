import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { site } from '../config/site'

function useActiveSection(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const ids = site.nav.map((n) => n.id)
  const active = useActiveSection(ids)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <motion.div style={{ scaleX: progress }} className="grad-bg fixed inset-x-0 top-0 z-[60] h-[3px] origin-left" aria-hidden="true" />
      <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-x-0 top-3 z-50 flex justify-center px-3">
        <nav aria-label="Primary" className="glass flex w-full max-w-6xl items-center justify-between rounded-full py-2 pl-5 pr-2 shadow-[0_10px_40px_-14px_rgba(79,70,229,0.35)]">
          <a href="#top" className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight">
            <span className="grad-bg grid h-8 w-8 place-items-center rounded-full text-sm text-white">{site.initials}</span>
            <span className="hidden whitespace-nowrap sm:inline lg:hidden xl:inline">{site.name}</span>
          </a>
          <ul className="hidden items-center gap-0.5 lg:flex">
            {site.nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} aria-current={active === n.id ? 'true' : undefined} className="relative block whitespace-nowrap rounded-full px-3 py-2 text-sm text-muted transition hover:text-text aria-[current=true]:text-text">
                  {active === n.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-blue/10" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a href="#contact" className="grad-bg pulse-ring hidden whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-white sm:inline-block">Hire me</a>
            <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} className="grid h-10 w-10 place-items-center rounded-full hover:bg-slate-900/10 lg:hidden">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }} className="glass fixed inset-x-3 top-[4.5rem] z-50 rounded-3xl p-3 lg:hidden">
            <ul>
              {site.nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className={`block rounded-2xl px-4 py-3 text-base ${active === n.id ? 'bg-blue/10 text-text' : 'text-muted'}`}>{n.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
