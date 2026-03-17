import React from 'react'
import { motion } from 'framer-motion'
import './AuroraBackground.css'

const AuroraBackground = () => {
    return (
        <div className="aurora-container">
            <div className="aurora-noise" />
            <motion.div
                className="aurora-blob aurora-blob-1"
                animate={{
                    x: [0, 100, -50, 80, 0],
                    y: [0, -80, 60, -40, 0],
                    scale: [1, 1.2, 0.9, 1.1, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="aurora-blob aurora-blob-2"
                animate={{
                    x: [0, -80, 60, -100, 0],
                    y: [0, 60, -40, 80, 0],
                    scale: [1, 0.9, 1.15, 0.95, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="aurora-blob aurora-blob-3"
                animate={{
                    x: [0, 50, -80, 30, 0],
                    y: [0, -50, 30, -60, 0],
                    scale: [1, 1.1, 0.85, 1.05, 1],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
        </div>
    )
}

export default AuroraBackground
