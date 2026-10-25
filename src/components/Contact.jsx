import { useState } from 'react'
import { motion } from 'motion/react'
import { Mail, Send } from 'lucide-react'
import { site } from '../config/site'
import { Section, Heading, ease } from './ui'
import { GithubIcon, LinkedinIcon } from './icons'

const field = 'contact-field w-full rounded-2xl border-2 border-indigo/25 bg-indigo/[0.07] px-4 py-3 text-base text-text placeholder:text-indigo-700/50 transition duration-300 hover:border-indigo/50 hover:bg-indigo/10 focus:border-indigo focus:bg-white focus:outline-none'

const rise = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }

export default function Contact() {
  const { contact, email, links } = site
  const [f, setF] = useState({ name: '', from: '', message: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))

  // No backend: opens the visitor's email app with the message pre-filled.
  const submit = (e) => {
    e.preventDefault()
    const subject = `Portfolio message from ${f.name}`
    const body = `${f.message}\n\n— ${f.name} (${f.from})`
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <Section id="contact">
      <div className="glass relative overflow-hidden rounded-[2rem] p-7 sm:p-12">
        <div aria-hidden="true" className="orb float -right-24 -top-24 h-80 w-80 bg-indigo/30" />
        <div aria-hidden="true" className="orb float -bottom-28 -left-20 h-72 w-72 bg-teal/20" style={{ animationDelay: '-3s' }} />
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.75, ease }} className="relative grid gap-12 lg:grid-cols-2">
          <div>
            <Heading title={contact.heading} kicker={contact.text} />
            <ul className="contact-links space-y-3">
              <li>
                <a href={`mailto:${email}`} className="group group inline-flex items-center gap-3 break-all text-lg font-medium hover:text-indigo-700">
                  <span className="grad-bg pulse-ring grid h-11 w-11 shrink-0 place-items-center rounded-full text-white"><Mail size={19} aria-hidden="true" className="wiggle" /></span>
                  {email}
                </a>
              </li>
              {links.linkedin && (
                <li><a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-lg font-medium hover:text-indigo-700"><span className="glass grid h-11 w-11 place-items-center rounded-full"><LinkedinIcon width={18} height={18} /></span>LinkedIn</a></li>
              )}
              {links.github && (
                <li><a href={links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-lg font-medium hover:text-indigo-700"><span className="glass grid h-11 w-11 place-items-center rounded-full"><GithubIcon width={18} height={18} /></span>GitHub</a></li>
              )}
            </ul>
          </div>
          <motion.form onSubmit={submit} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="space-y-4" aria-describedby="contact-note">
            <motion.div variants={rise} className="contact-group">
              <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium">Your name</label>
              <input id="c-name" required autoComplete="name" value={f.name} onChange={set('name')} className={field} />
            </motion.div>
            <motion.div variants={rise} className="contact-group">
              <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium">Your email</label>
              <input id="c-email" type="email" required autoComplete="email" value={f.from} onChange={set('from')} className={field} />
            </motion.div>
            <motion.div variants={rise} className="contact-group">
              <label htmlFor="c-msg" className="mb-1.5 block text-sm font-medium">Message</label>
              <textarea id="c-msg" required rows={5} value={f.message} onChange={set('message')} className={`${field} resize-y`} />
            </motion.div>
            <motion.button variants={rise} whileHover={{ y: -3, scale: 1.04 }} whileTap={{ scale: 0.95 }} type="submit" className="send-btn grad-bg btn-shine inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(79,70,229,0.7)]">
              <Send size={16} className="send-icon" aria-hidden="true" /> Open in email app
            </motion.button>
            <motion.p key={sent ? 'sent' : 'idle'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} id="contact-note" className="text-sm text-muted" aria-live="polite">
              {sent ? 'Your email app should have opened with the message ready to send.' : 'This opens your email app with the message pre-filled.'}
            </motion.p>
          </motion.form>
        </motion.div>
      </div>
    </Section>
  )
}
