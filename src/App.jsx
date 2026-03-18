import React, { useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import CursorFollower from './components/CursorFollower'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Freelance from './sections/Freelance'
import Skills from './sections/Skills'
import GitHubActivity from './sections/GitHubActivity'
import Resume from './sections/Resume'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import './styles/main.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoading) return

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    window.lenis = lenisInstance

    function raf(time) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenisInstance.destroy()
      window.lenis = null
    }
  }, [isLoading])

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <CursorFollower />
          <Navbar />

          <main>
            <Hero />
            <Projects />
            <Freelance />
            <Skills />
            <GitHubActivity />
            <Resume />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </div>
  )
}

export default App
