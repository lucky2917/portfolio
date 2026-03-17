import React, { useEffect, useRef } from 'react'
import './FloatingParticles.css'

const FloatingParticles = ({ count = 30 }) => {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // Clear any existing particles
        container.innerHTML = ''

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('span')
            particle.className = 'floating-particle'

            // Random properties
            const size = Math.random() * 4 + 1
            const x = Math.random() * 100
            const delay = Math.random() * 15
            const duration = Math.random() * 20 + 15
            const drift = (Math.random() - 0.5) * 100

            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                bottom: -${size}px;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
                --drift: ${drift}px;
                opacity: ${Math.random() * 0.4 + 0.1};
            `

            container.appendChild(particle)
        }
    }, [count])

    return <div ref={containerRef} className="floating-particles-container" />
}

export default FloatingParticles
