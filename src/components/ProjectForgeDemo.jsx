import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, KanbanSquare, MessageSquare, Send, Users, X } from 'lucide-react'
import Kanban, { COLUMNS } from './Kanban'

const initialTasks = [
  { id: 1, title: 'Build application form with Zod validation', col: 'done', priority: 'High' },
  { id: 2, title: 'Enforce owner-only member removal', col: 'review', priority: 'High' },
  { id: 3, title: 'Notification unread count', col: 'progress', priority: 'Medium' },
  { id: 4, title: 'Kanban list view', col: 'todo', priority: 'Medium' },
  { id: 5, title: 'Project deadline reminders', col: 'todo', priority: 'Low' },
]
const flow = COLUMNS.map((c) => c.id)

const initialApps = [
  { id: 1, name: 'Applicant A', role: 'Frontend developer', skills: 'React, Tailwind', status: 'Pending' },
  { id: 2, name: 'Applicant B', role: 'Backend developer', skills: 'Node.js, MongoDB', status: 'Pending' },
  { id: 3, name: 'Applicant C', role: 'UI designer', skills: 'Figma', status: 'Pending' },
]
const statusTone = { Pending: 'bg-amber/15 text-amber-700', Accepted: 'bg-emerald/15 text-emerald-700', Rejected: 'bg-rose/10 text-rose-600' }

const tabs = [
  { id: 'workspace', label: 'Workspace', icon: KanbanSquare },
  { id: 'applications', label: 'Applications', icon: Users },
  { id: 'chat', label: 'Team chat', icon: MessageSquare },
]

function Applications() {
  const [apps, setApps] = useState(initialApps)
  const decide = (id, status) => setApps((a) => a.map((x) => (x.id === id ? { ...x, status } : x)))
  const accepted = apps.filter((a) => a.status === 'Accepted').length
  return (
    <div>
      <ul className="space-y-2.5">
        {apps.map((a) => (
          <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-slate-900/[0.04] p-3.5">
            <div>
              <p className="text-sm font-semibold">{a.name} <span className="font-normal text-muted">applied as {a.role}</span></p>
              <p className="mt-0.5 text-xs text-muted">Skills: {a.skills}</p>
            </div>
            <div className="flex items-center gap-2">
              <motion.span key={a.status} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone[a.status]}`}>{a.status}</motion.span>
              {a.status === 'Pending' && (
                <>
                  <button type="button" onClick={() => decide(a.id, 'Accepted')} aria-label={`Accept ${a.name}`} className="grid h-8 w-8 place-items-center rounded-full bg-emerald/20 text-emerald-700 transition hover:bg-emerald/35"><Check size={15} /></button>
                  <button type="button" onClick={() => decide(a.id, 'Rejected')} aria-label={`Reject ${a.name}`} className="grid h-8 w-8 place-items-center rounded-full bg-rose/10 text-rose-600 transition hover:bg-rose/20"><X size={15} /></button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted" aria-live="polite">
        Team size: {accepted + 1} (owner + {accepted} accepted)
        {accepted > 0 && ' — accepted applicants become team members.'}
      </p>
    </div>
  )
}

function Chat() {
  const [msgs, setMsgs] = useState([
    { id: 1, me: false, who: 'Applicant A', text: 'Pushed the application form, ready for review.' },
    { id: 2, me: true, who: 'You', text: 'Nice. Moving it to Done.' },
  ])
  const [draft, setDraft] = useState('')
  const next = useRef(3)
  const send = (e) => {
    e.preventDefault()
    const t = draft.trim()
    if (!t) return
    setMsgs((m) => [...m, { id: next.current++, me: true, who: 'You', text: t }])
    setDraft('')
  }
  return (
    <div>
      <ul className="max-h-60 space-y-2 overflow-y-auto pr-1" aria-live="polite">
        <AnimatePresence initial={false}>
          {msgs.map((m) => (
            <motion.li key={m.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${m.me ? 'grad-bg ml-auto text-white' : 'border border-line bg-slate-900/[0.04]'}`}>
              {!m.me && <span className="mb-0.5 block text-[11px] font-semibold text-indigo-700">{m.who}</span>}
              {m.text}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <form onSubmit={send} className="mt-3 flex gap-2">
        <label htmlFor="pf-chat" className="sr-only">Message the team</label>
        <input id="pf-chat" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Message the team" className="min-w-0 flex-1 rounded-full border border-line bg-white px-4 py-2.5 text-sm placeholder:text-muted focus:border-indigo focus:outline-none" />
        <button type="submit" aria-label="Send message" className="grad-bg grid h-10 w-10 place-items-center rounded-full text-white"><Send size={16} /></button>
      </form>
    </div>
  )
}

export default function ProjectForgeDemo() {
  const [tab, setTab] = useState('workspace')
  const [tasks, setTasks] = useState(initialTasks)
  const advance = (id) =>
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, col: flow[Math.min(flow.indexOf(t.col) + 1, flow.length - 1)] } : t)))

  return (
    <div className="glass rounded-3xl p-4 sm:p-6">
      <div role="tablist" aria-label="ProjectForge preview" className="mb-5 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t.id} role="tab" id={`pf-tab-${t.id}`} aria-selected={tab === t.id} aria-controls={`pf-panel-${t.id}`} type="button" onClick={() => setTab(t.id)} className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${tab === t.id ? 'text-white' : 'text-muted hover:text-text'}`}>
            {tab === t.id && <motion.span layoutId="pf-tab" className="grad-bg absolute inset-0 -z-10 rounded-full" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            <t.icon size={16} aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`pf-panel-${tab}`} aria-labelledby={`pf-tab-${tab}`}>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            {tab === 'workspace' && <Kanban tasks={tasks} onAdvance={advance} />}
            {tab === 'applications' && <Applications />}
            {tab === 'chat' && <Chat />}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-5 text-xs text-muted">Interactive preview with sample data. Try moving a task, accepting an applicant or sending a message.</p>
    </div>
  )
}
