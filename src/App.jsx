import { MotionConfig } from 'motion/react'
import Background from './components/Background'
import CursorGlow from './components/CursorGlow'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Achievements from './components/Achievements'
import Certifications from './components/Certifications'
import LeetCode from './components/LeetCode'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    // reducedMotion="user" disables transform/layout animations when the OS asks for less motion
    <MotionConfig reducedMotion="user">
      <Background />
      <CursorGlow />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Certifications />
        <LeetCode />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
