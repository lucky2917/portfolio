import React, { useRef, useState } from 'react'
import { motion, useScroll, useMotionValue, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import ProjectModal from '../components/ProjectModal'
import './Projects.css'

const projects = [
    {
        title: 'Frioo',
        category: 'E-Commerce Platform',
        metric: '92+ Lighthouse',
        description: 'A live e-commerce platform with PostgreSQL on Supabase, Row-Level Security, WebSocket real-time updates, and ~200ms API latency.',
        fullDescription: 'Frioo is a production-grade e-commerce platform designed for real-time order management and secure transactions. Built on Supabase with PostgreSQL, it features Row-Level Security policies, ACID-compliant transactions with optimistic locking, and geospatial delivery validation using the Haversine formula. The React frontend achieves a 92+ Lighthouse score through aggressive lazy loading, code splitting, and query optimization.',
        color: '#EF6D58',
        image: '/frioo.png',
        link: 'https://www.frioo.in',
        role: 'Full-Stack Developer',
        year: 'Oct 2025 – Jan 2026',
        techStack: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Supabase', 'WebSockets', 'Redis', 'REST APIs'],
        features: [
            'PostgreSQL schema with Row-Level Security and server-side validation',
            'ACID-compliant transactions with optimistic locking for race condition handling',
            'Geospatial delivery validation using the Haversine formula',
            'WebSocket-based real-time updates with ~200ms API latency',
            '92+ Lighthouse score via lazy loading and query optimization'
        ]
    },
    {
        title: 'SkillHire',
        category: 'Hiring Platform',
        metric: 'Hackathon Winner',
        description: 'Skill-based hiring platform with blind candidate evaluation, project-based assessments, OTP verification, and protection against SQL injection & XSS.',
        fullDescription: 'SkillHire was born at a competitive hackathon — a full-stack hiring platform that eliminates resume bias through blind candidate evaluation and project-based assessments. Employers get data-driven tools for candidate comparison, skill mapping, and performance analytics. Security was a first-class concern with OTP verification, secure sessions, and protection against SQL injection and XSS.',
        color: '#5D6D3E',
        image: '/skillhire.png',
        link: 'https://github.com/lucky2917/SkillHire',
        role: 'Full-Stack Developer',
        year: 'Apr 2025',
        techStack: ['PHP', 'MySQL', 'JavaScript', 'Tailwind CSS'],
        features: [
            'Blind candidate evaluation with project-based assessments to reduce resume bias',
            'OTP-based verification and secure session management',
            'Protection against SQL injection and XSS attacks',
            'Employer tools for candidate comparison and skill mapping',
            'Performance analytics for data-driven shortlisting'
        ]
    },
    {
        title: 'BYG',
        category: 'Booking System',
        metric: '25+ Arenas',
        description: 'Full-stack sports facility booking system with dynamic pricing, time-slot reservations, OTP signup, and an admin dashboard with role-based access.',
        fullDescription: 'Book Your Game (BYG) is a comprehensive sports facility booking system supporting 25+ arenas with sport-wise dynamic pricing, add-ons, and time-slot–based reservations. It features a complete authentication flow with OTP signup, email verification, bcrypt hashing, and session management. An admin dashboard provides real-time monitoring of bookings, revenue, and add-on performance with role-based access control.',
        color: '#DDB8A6',
        image: '/byg.png',
        link: 'https://github.com/lucky2917/byg_',
        role: 'Full-Stack Developer',
        year: 'Mar 2025',
        techStack: ['PHP', 'MySQL', 'JavaScript', 'Tailwind CSS'],
        features: [
            'Sport-wise dynamic pricing with add-ons and time-slot reservations',
            'OTP-based signup, email verification, and password reset',
            'Bcrypt hashing and secure session management',
            'Admin dashboard for bookings, revenue, and add-on monitoring',
            'Role-based access control across the platform'
        ]
    },
    {
        title: 'Portfolio',
        category: 'Design System',
        metric: 'Motion-First',
        description: 'This very portfolio — crafted with React, Framer Motion, and a custom scroll-driven animation system.',
        fullDescription: 'A personal portfolio built from scratch with a motion-first philosophy. Features include a scroll-driven word-by-word text reveal in the hero section, a mouse-tracking SVG avatar, horizontal scroll-linked project cards, and a glassmorphism project detail modal with animated gradient borders. Every interaction is intentional — designed to feel premium and alive.',
        color: '#C9A882',
        image: '/portfolio.png',
        role: 'Designer & Developer',
        year: '2026',
        techStack: ['React', 'Framer Motion', 'Lenis', 'Vite', 'CSS'],
        features: [
            'Scroll-driven word-by-word text reveal animation',
            'Interactive mouse-tracking SVG avatar',
            'Horizontal scroll-linked project cards',
            'Glassmorphism modal with animated gradient border',
            'Custom cursor follower and smooth scrolling'
        ]
    }
]

const Projects = () => {
    const wrapperRef = useRef(null)
    const rowRef = useRef(null)
    const x = useMotionValue(0)
    const [selectedProject, setSelectedProject] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ['start start', 'end end'],
    })

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        if (!rowRef.current) return
        const endPadding = 64
        const maxX = -(rowRef.current.scrollWidth - window.innerWidth + endPadding)
        x.set(v * maxX)
    })

    const handleCardClick = (project, index) => {
        setSelectedProject(project)
        setSelectedIndex(index)
    }

    return (
        <div ref={wrapperRef} className="projects-scroll-wrapper">
            <section id="work" className="projects-sticky">
                <div className="container projects-header-wrap">
                    <header className="projects-header">
                        <h2 className="text-mono text-coral">Selected Work</h2>
                        <div className="line-divider" />
                    </header>
                </div>

                <div className="projects-track-outer">
                    <motion.div
                        ref={rowRef}
                        style={{ x }}
                        className="projects-track"
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="project-card"
                                onClick={() => handleCardClick(project, index)}
                            >
                                <div
                                    className="project-image-wrapper"
                                    style={{
                                        backgroundColor: project.color,
                                        backgroundImage: project.image ? `url(${project.image})` : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center top',
                                    }}
                                >
                                    <div className="project-metric text-mono">{project.metric}</div>
                                    <span className="project-number text-mono">0{index + 1}</span>
                                </div>

                                <div className="project-info">
                                    <p className="text-mono project-category">{project.category}</p>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-desc">{project.description}</p>
                                    <span className="view-project-link text-mono">View Details ↗</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <div className="projects-progress-bar">
                    <motion.div
                        className="projects-progress-fill"
                        style={{ scaleX: scrollYProgress }}
                    />
                </div>
            </section>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        index={selectedIndex}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

export default Projects
