import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [time, setTime] = useState(new Date())
    const [isOpen, setIsOpen] = useState(false)
    
    const lastScrollYRef = useRef(0)

    useEffect(() => {
        let ticking = false
        
        const update = () => {
            const currentY = window.scrollY || 0
            const delta = currentY - lastScrollYRef.current
            
            setIsScrolled(currentY > 50)
            
            if (currentY < 16) {
                setIsVisible(true)
            } else if (delta > 2) {
                // Scrolling down
                setIsVisible(false)
                setIsOpen(false)
            } else if (delta < -2) {
                // Scrolling up
                setIsVisible(true)
            }
            
            lastScrollYRef.current = currentY
            ticking = false
        }

        const onScroll = () => {
            if (!ticking) {
                ticking = true
                requestAnimationFrame(update)
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        const timer = setInterval(() => setTime(new Date()), 1000)

        // Initial check
        update()

        return () => {
            window.removeEventListener('scroll', onScroll)
            clearInterval(timer)
        }
    }, [])

    const navItems = [
        { name: 'Work', href: '#work' },
        { name: 'Skills', href: '#skills' },
        { name: 'GitHub', href: '#github' },
        { name: 'Resume', href: '#resume' },
        { name: 'Contact', href: '#contact' }
    ]

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const handleScrollTo = (e, id) => {
        e.preventDefault()
        setIsOpen(false)
        if (window.lenis) {
            window.lenis.scrollTo(id)
        } else {
            document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''} ${!isVisible ? 'hidden' : ''}`}>
            <div className="navbar-container container">
                <div className="nav-left">
                    <a href="#" className="nav-logo" onClick={(e) => handleScrollTo(e, 'top')}>
                        <img src="/logo.svg" alt="Ravi Sankar Logo" className="nav-logo-img" />
                    </a>
                    <div className="nav-info text-mono">
                        <span className="status-dot" />
                        Available for Work — {formatTime(time)}
                    </div>
                </div>

                <div className="nav-right">
                    <ul className="nav-links">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    className="nav-link text-mono"
                                    onClick={(e) => handleScrollTo(e, item.href)}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                        <div className={`hamburger ${isOpen ? 'open' : ''}`} />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mobile-menu"
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleScrollTo(e, item.href)}
                                className="mobile-nav-link text-huge"
                            >
                                {item.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
