import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Preloader.css'

const Preloader = ({ onComplete }) => {
    const [phase, setPhase] = useState('counting') // 'counting' → 'name' → 'done'
    const [count, setCount] = useState(0)

    useEffect(() => {
        // Phase 1: Counter 0 → 100
        const interval = setInterval(() => {
            setCount(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => setPhase('name'), 200)
                    return 100
                }
                return prev + 2
            })
        }, 20)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (phase === 'name') {
            // Show name briefly then exit
            setTimeout(() => setPhase('done'), 1400)
        }
        if (phase === 'done') {
            setTimeout(() => onComplete(), 600)
        }
    }, [phase, onComplete])

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    className="preloader"
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="preloader-grain" />

                    {/* Floating orbs */}
                    <motion.div
                        className="preloader-orb preloader-orb-1"
                        animate={{
                            x: [0, 30, -20, 0],
                            y: [0, -40, 20, 0],
                            scale: [1, 1.2, 0.9, 1]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="preloader-orb preloader-orb-2"
                        animate={{
                            x: [0, -25, 35, 0],
                            y: [0, 30, -25, 0],
                            scale: [1, 0.9, 1.15, 1]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    <AnimatePresence mode="wait">
                        {phase === 'counting' && (
                            <motion.div
                                key="counter"
                                className="preloader-counter"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                                transition={{ duration: 0.4 }}
                            >
                                <span className="preloader-number">{count}</span>
                                <div className="preloader-bar-track">
                                    <motion.div
                                        className="preloader-bar-fill"
                                        style={{ width: `${count}%` }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {phase === 'name' && (
                            <motion.div
                                key="name"
                                className="preloader-name"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                {'-Hey, Welcome'.split('').map((char, i) => (
                                    <motion.span
                                        key={i}
                                        className="preloader-char"
                                        initial={{ y: 80, opacity: 0, rotateX: -90 }}
                                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                        transition={{
                                            delay: i * 0.05,
                                            duration: 0.6,
                                            ease: [0.16, 1, 0.3, 1]
                                        }}
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </motion.span>
                                ))}
                                <motion.span
                                    className="preloader-char preloader-dot"
                                    initial={{ y: 80, opacity: 0, scale: 0 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: 0.6,
                                        duration: 0.5,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                >
                                    .
                                </motion.span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.p
                        className="preloader-tagline text-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ delay: 0.3 }}
                    >
                        Full-Stack Developer
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Preloader
