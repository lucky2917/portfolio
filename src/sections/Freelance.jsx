import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight} from 'lucide-react'
import '../styles/Freelance.css'



const bullets = [
    'Designed a PostgreSQL schema on Supabase with Row-Level Security (RLS) and server-side validation to prevent unauthorized access and price manipulation.',
    'Implemented ACID-compliant transactions with optimistic locking to handle race conditions, added geospatial delivery validation using the Haversine formula.',
    'Deployed a React application with WebSocket-based real-time updates, achieving ~200ms API latency and a 92+ Lighthouse score through lazy loading and query optimization.'
]

const techStack = ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Supabase', 'WebSockets', 'Redis', 'REST APIs']

const Freelance = () => {
    return (
        <section id="freelance" className="freelance-section">
            <div className="freelance-bg">
                <div className="freelance-bg-gradient" />
                <div className="freelance-bg-glow" />
            </div>

            <div className="container freelance-content">
                <motion.div
                    className="freelance-header"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="freelance-label text-mono">Freelance Work</span>
                    <h2 className="freelance-title">
                        FRIOO<span className="text-coral">.</span>
                    </h2>
                    <p className="freelance-subtitle">E-Commerce Platform — Full-Stack Developer</p>
                    <span className="freelance-period text-mono">Oct 2025 – Jan 2026</span>
                </motion.div>

                <motion.p
                    className="freelance-intro"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    Built a production-grade e-commerce platform for a startup with real-time order management, secure transactions, and high performance.
                </motion.p>

                <ul className="freelance-bullets">
                    {bullets.map((bullet, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="bullet-dot" />
                            {bullet}
                        </motion.li>
                    ))}
                </ul>

                <motion.div
                    className="freelance-tech"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    {techStack.map((tech) => (
                        <span key={tech} className="freelance-tech-pill text-mono">
                            {tech}
                        </span>
                    ))}
                </motion.div>

                <motion.a
                    href="https://www.frioo.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="freelance-cta"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="text-mono">Visit Live Site</span>
                    <ArrowUpRight size={16} />
                </motion.a>
            </div>
        </section>
    )
}

export default Freelance
