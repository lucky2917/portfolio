import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Zap, Shield, Globe, Clock } from 'lucide-react'
import '../styles/Freelance.css'

const metrics = [
    { icon: Zap, value: '92+', label: 'Lighthouse Score' },
    { icon: Clock, value: '~200ms', label: 'API Latency' },
    { icon: Shield, value: 'RLS', label: 'Row-Level Security' },
    { icon: Globe, value: 'Live', label: 'In Production' }
]

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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="freelance-label text-mono">Freelance Work</span>
                    <h2 className="freelance-title">
                        FRIOO<span className="text-coral">.</span>
                    </h2>
                    <p className="freelance-subtitle">E-Commerce Platform — Full-Stack Developer</p>
                    <span className="freelance-period text-mono">Oct 2025 – Jan 2026</span>
                </motion.div>

                <div className="freelance-grid">
                    <motion.div
                        className="freelance-description"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <p className="freelance-intro">
                            Built a production-grade e-commerce platform for a startup with real-time order management, secure transactions, and high performance.
                        </p>

                        <ul className="freelance-bullets">
                            {bullets.map((bullet, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -15 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                >
                                    <span className="bullet-dot" />
                                    {bullet}
                                </motion.li>
                            ))}
                        </ul>

                        <div className="freelance-tech">
                            {techStack.map((tech, i) => (
                                <motion.span
                                    key={tech}
                                    className="freelance-tech-pill text-mono"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.04 }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>

                        <motion.a
                            href="https://www.frioo.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="freelance-cta"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <span className="text-mono">Visit Live Site</span>
                            <ArrowUpRight size={16} />
                        </motion.a>
                    </motion.div>

                    <motion.div
                        className="freelance-metrics"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {metrics.map((metric, i) => (
                            <motion.div
                                key={metric.label}
                                className="metric-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                            >
                                <metric.icon size={20} className="metric-icon" />
                                <span className="metric-value">{metric.value}</span>
                                <span className="metric-label text-mono">{metric.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Freelance
