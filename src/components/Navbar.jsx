import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [time, setTime] = useState(new Date())
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)

        const timer = setInterval(() => setTime(new Date()), 1000)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            clearInterval(timer)
        }
    }, [])

    const navItems = [
        { name: 'Work', href: '#work' },
        { name: 'Exp', href: '#experience' },
        { name: 'Talk', href: '#contact' }
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
        if (window.lenis) {
            window.lenis.scrollTo(id)
        } else {
            document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
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
                        {navItems.map((item, index) => (
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
                                onClick={(e) => {
                                    setIsOpen(false)
                                    handleScrollTo(e, item.href)
                                }}
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
