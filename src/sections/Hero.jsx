import React, { useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import '../styles/Hero.css'
import AuroraBackground from '../components/AuroraBackground'
import FloatingParticles from '../components/FloatingParticles'

// Splits text into words, animating each word's opacity from 0.15→1
const ScrollRevealText = ({ text, progress, startOffset, endOffset, className }) => {
    const words = text.split(' ')

    return (
        <p className={className}>
            {words.map((word, i) => {
                const wordStart = startOffset + (i / words.length) * (endOffset - startOffset)
                const wordEnd = startOffset + ((i + 1) / words.length) * (endOffset - startOffset)

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(progress, [wordStart, wordEnd], [0.15, 1])

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const color = useTransform(
                    progress,
                    [Math.max(0, wordStart - 0.005), wordStart, wordEnd, Math.min(1, wordEnd + 0.005)],
                    ['var(--color-text)', 'var(--color-primary)', 'var(--color-primary)', 'var(--color-text)']
                )

                return (
                    <motion.span key={i} style={{ opacity, color }} className="word-span">
                        {word}{' '}
                    </motion.span>
                )
            })}
        </p>
    )
}

const Hero = () => {
    const progress = useMotionValue(0)
    const animDoneRef = useRef(false)

    // Parallax for the photo
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springConfig = { damping: 25, stiffness: 150 }
    const photoX = useSpring(useTransform(mouseX, [-500, 500], [-15, 15]), springConfig)
    const photoY = useSpring(useTransform(mouseY, [-500, 500], [-15, 15]), springConfig)
    const orbitRotate = useSpring(useTransform(mouseX, [-500, 500], [-8, 8]), springConfig)

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX - window.innerWidth / 2)
            mouseY.set(e.clientY - window.innerHeight / 2)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    useEffect(() => {
        const TOTAL_DELTA = 2200
        let accumulated = 0

        const stopLenis = () => window.lenis?.stop()
        const startLenis = () => window.lenis?.start()

        const timer = setTimeout(stopLenis, 100)

        const onWheel = (e) => {
            if (animDoneRef.current) return
            e.preventDefault()

            accumulated = Math.min(TOTAL_DELTA, Math.max(0, accumulated + e.deltaY))
            const p = accumulated / TOTAL_DELTA
            progress.set(p)

            if (p >= 1) {
                animDoneRef.current = true
                startLenis()
            }
        }

        window.addEventListener('wheel', onWheel, { passive: false })

        return () => {
            clearTimeout(timer)
            window.removeEventListener('wheel', onWheel)
            startLenis()
        }
    }, [progress])

    return (
        <section className="hero-section">
            <AuroraBackground />
            <FloatingParticles count={20} />

            <div className="hero-layout container">
                {/* ─── Left Column: Text Content ─── */}
                <div className="hero-left">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="hero-greeting text-mono">
                            <span className="greeting-line" />
                            Hey, I'm Ravi
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="hero-title-wrapper"
                    >
                        <h1 className="hero-title">
                            <span className="hero-title-line">FULL-STACK</span>
                            <span className="hero-title-line">DEVEL<span className="text-coral">O</span>PER<span className="text-coral">.</span></span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.9 }}
                        className="hero-bio-wrapper"
                    >
                        <ScrollRevealText
                            text="Hi, I'm Ravi. I'm a Full-Stack Developer and student who loves building things from scratch. I try to take what I learn and apply it to the real world, which recently led me to build and maintain a live platform for a startup. I enjoy working across the whole stack—from the backend logic to the user interface—and I'm always eager to grow by tackling hands-on projects"
                            progress={progress}
                            startOffset={0.02}
                            endOffset={1.0}
                            className="hero-bio"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="hero-links"
                    >
                        <a href="https://github.com/lucky2917" target="_blank" rel="noopener noreferrer" className="hero-cta-link">
                            <span className="hero-cta-text text-mono">GitHub</span>
                            <span className="hero-cta-arrow">↗</span>
                        </a>
                        <a href="https://www.linkedin.com/in/ravi-shankar-9a2b44339/" target="_blank" rel="noopener noreferrer" className="hero-cta-link">
                            <span className="hero-cta-text text-mono">LinkedIn</span>
                            <span className="hero-cta-arrow">↗</span>
                        </a>
                        <a href="mailto:arjun.gandreddi2005@gmail.com" className="hero-cta-link hero-cta-primary">
                            <span className="hero-cta-text text-mono">Say Hello</span>
                            <span className="hero-cta-arrow">→</span>
                        </a>
                    </motion.div>
                </div>

                {/* ─── Right Column: Photo ─── */}
                <motion.div
                    className="hero-right"
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.div
                        className="hero-photo-orbit"
                        style={{ rotate: orbitRotate }}
                    >
                        {/* Animated gradient ring */}
                        <div className="photo-ring" />
                        <div className="photo-ring photo-ring-2" />

                        {/* Orbiting dots */}
                        <motion.div
                            className="orbit-dot orbit-dot-1"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                        />
                        <motion.div
                            className="orbit-dot orbit-dot-2"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                        />
                        <motion.div
                            className="orbit-dot orbit-dot-3"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                        />
                    </motion.div>

                    <motion.div
                        className="hero-photo-wrapper"
                        style={{ x: photoX, y: photoY }}
                    >
                        <img
                            src="/ravi-photo.jpeg"
                            alt="Ravi Sankar Gandreddi"
                            className="hero-photo"
                        />
                        <div className="photo-overlay" />
                    </motion.div>

                    {/* Floating decorative elements */}
                    <motion.div
                        className="hero-float-shape shape-1"
                        animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="hero-float-shape shape-2"
                        animate={{ y: [10, -15, 10], x: [-5, 5, -5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="hero-float-shape shape-3"
                        animate={{ y: [-8, 12, -8], scale: [1, 1.2, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* Status badge floating near photo */}
                    <motion.div
                        className="hero-status-badge"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                    >
                        <span className="status-pulse" />
                        <span className="text-mono">Available for Work</span>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll prompt */}
            <motion.div
                className="hero-scroll-prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <span className="text-mono">Scroll to explore</span>
                <motion.div
                    className="scroll-prompt-line"
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>
        </section>
    )
}

export default Hero
