import { motion } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { site } from '../config/site'
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './icons'

export default function Footer() {
  const socials = [
    { href: site.links.github, label: 'GitHub', Icon: GithubIcon },
    { href: site.links.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { href: site.links.leetcode, label: 'LeetCode', Icon: LeetcodeIcon },
  ].filter((s) => s.href)
  return (
    <footer className="border-t border-line">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 py-9 text-sm text-muted sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} {site.name}. Built with React, Tailwind CSS and Motion.</p>
        <div className="flex items-center gap-4">
          {socials.map(({ href, label, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="transition hover:text-text"><Icon width={18} height={18} /></a>
          ))}
          <a href="#top" aria-label="Back to top" className="glass grid h-9 w-9 place-items-center rounded-full transition hover:text-text"><ArrowUp size={16} /></a>
        </div>
      </motion.div>
    </footer>
  )
}
