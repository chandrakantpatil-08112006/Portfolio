import { Braces, Layers, Server, Database, Cpu, Wrench, Trophy, Code2, Users, Sparkles, Binary } from 'lucide-react'

// Only the icons referenced by name in src/config/site.js are bundled. Add new ones here.
const L = { Braces, Layers, Server, Database, Cpu, Wrench, Trophy, Code2, Users, Sparkles, Binary }

// Inline brand marks (not included in this lucide-react version)
export const GithubIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
)
export const LinkedinIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)
export const LeetcodeIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M13.48 0a1.37 1.37 0 0 0-.96.44L3.9 9.4a4.6 4.6 0 0 0-1.4 3.4c0 1.3.5 2.5 1.4 3.4l4.6 4.7c1.8 1.8 4.8 1.9 6.7.1l2.6-2.5a1.37 1.37 0 0 0-1.9-2l-2.6 2.5a2 2 0 0 1-2.9-.1L5.9 14.4a1.9 1.9 0 0 1 0-2.7l8.5-8.9A1.37 1.37 0 0 0 13.48 0Zm3.9 12.4h-7.3a1.37 1.37 0 0 0 0 2.74h7.3a1.37 1.37 0 0 0 0-2.74Z" />
  </svg>
)

export const Icon = ({ name, ...props }) => {
  const C = L[name] || L.Sparkles
  return <C aria-hidden="true" {...props} />
}
