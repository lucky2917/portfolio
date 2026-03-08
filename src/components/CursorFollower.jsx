import React, { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import './CursorFollower.css'

const CursorFollower = () => {
    const [cursorState, setCursorState] = useState('default') // 'default', 'hover', 'orange'
    const [isVisible, setIsVisible] = useState(false)

    // Instant position for the dot
    const mouseX = useMotionValue(-100)
    const mouseY = useMotionValue(-100)

    // Spring position for the ring (trailing)
    const ringX = useSpring(-100, { stiffness: 200, damping: 25 })
    const ringY = useSpring(-100, { stiffness: 200, damping: 25 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e
            mouseX.set(clientX)
            mouseY.set(clientY)
            ringX.set(clientX)
            ringY.set(clientY)

            if (!isVisible) setIsVisible(true)
        }

        const handleMouseOver = (e) => {
            const target = e.target
            const interactive = target.closest('a, button, .clickable')
            const orangeElement = target.closest('[data-cursor="orange"]')

            if (orangeElement) {
                setCursorState('orange')
            } else if (interactive) {
                setCursorState('hover')
            } else {
                setCursorState('default')
            }
        }

        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseover', handleMouseOver)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseover', handleMouseOver)
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [isVisible, mouseX, mouseY, ringX, ringY])

    if (!isVisible) return null

    return (
        <>
            {/* Precision Dot (Instant) */}
            <motion.div
                className="cursor-dot-v2"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            />

            {/* Trailing Ring (Spring) */}
            <motion.div
                className={`cursor-ring-v2 ${cursorState}`}
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                initial={false}
                animate={{
                    scale: cursorState === 'orange' ? 2.5 : cursorState === 'hover' ? 1.5 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
        </>
    )
}

export default CursorFollower
