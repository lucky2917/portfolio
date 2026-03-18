import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import './Footer.css'

const Footer = () => {
    const scrollToTop = () => {
        window.lenis?.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    }

    return (
        <footer className="footer-section">
            <div className="container footer-container">
                <div className="footer-top">
                    <motion.div 
                        className="footer-cta"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="footer-title">
                            LET'S BUILD<br/>
                            <span className="text-coral">TOGETHER.</span>
                        </h2>
                        <a href="mailto:arjun.gandreddi2005@gmail.com" className="footer-email-link text-mono">
                            arjun.gandreddi2005@gmail.com ↗
                        </a>
                    </motion.div>
                    
                    <motion.div 
                        className="footer-nav-wrap"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="footer-nav-col">
                            <span className="footer-nav-title text-mono">Navigation</span>
                            <a href="#work" onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo('#work') }}>Work</a>
                            <a href="#skills" onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo('#skills') }}>Skills</a>
                            <a href="#contact" onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo('#contact') }}>Contact</a>
                        </div>
                        <div className="footer-nav-col">
                            <span className="footer-nav-title text-mono">Socials</span>
                            <a href="https://github.com/lucky2917" target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href="https://www.linkedin.com/in/ravi-shankar-9a2b44339/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    className="footer-bottom"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="footer-copyright text-mono">
                        © {new Date().getFullYear()} Ravi . Crafted with Precision.
                    </div>
                    
                    <button className="footer-back-to-top" onClick={scrollToTop}>
                        <ArrowUp size={16} />
                        <span className="text-mono">Back to top</span>
                    </button>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer
