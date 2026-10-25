import { motion } from 'motion/react'
import { ChevronRight, Flag } from 'lucide-react'

export const COLUMNS = [
  { id: 'todo', label: 'Todo', dot: 'bg-muted' },
  { id: 'progress', label: 'In Progress', dot: 'bg-blue' },
  { id: 'review', label: 'In Review', dot: 'bg-amber' },
  { id: 'done', label: 'Done', dot: 'bg-emerald' },
]

const priorityTone = { High: 'text-rose-600', Medium: 'text-amber-700', Low: 'text-cyan-700' }

/** Presentational board. Pass onAdvance to make cards clickable. */
export default function Kanban({ tasks, columns = COLUMNS, onAdvance, compact = false }) {
  return (
    <div className={`grid gap-3 ${compact ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
      {columns.map((col) => {
        const items = tasks.filter((t) => t.col === col.id)
        return (
          <div key={col.id} className="min-h-[9rem] rounded-2xl border border-line bg-slate-100/70 p-2.5">
            <div className="mb-2.5 flex items-center justify-between px-1 text-xs font-semibold text-muted">
              <span className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                {col.label}
              </span>
              <span className="font-mono text-[11px]">{items.length}</span>
            </div>
            <div className="space-y-2">
              {items.map((t) => (
                <motion.div
                  layout
                  layoutId={`${compact ? 'c' : 'f'}-${t.id}`}
                  key={t.id}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="rounded-xl border border-line bg-slate-900/[0.04] p-2.5 text-left"
                >
                  <p className="text-[13px] font-medium leading-snug text-text">{t.title}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`flex items-center gap-1 text-[11px] font-medium ${priorityTone[t.priority]}`}>
                      <Flag size={11} aria-hidden="true" />
                      {t.priority}
                    </span>
                    {onAdvance && t.col !== 'done' && (
                      <button type="button" onClick={() => onAdvance(t.id)} aria-label={`Move "${t.title}" to the next column`} className="grid h-6 w-6 place-items-center rounded-full bg-slate-900/10 transition hover:bg-blue hover:text-white">
                        <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
