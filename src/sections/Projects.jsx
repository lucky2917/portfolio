import React, { useRef, useState } from 'react'
import { motion, useScroll, useMotionValue, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Eye } from 'lucide-react'
import ProjectModal from '../components/ProjectModal'
import '../styles/Projects.css'

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
        ],
        highlights: ['Real-time', 'Supabase', '92+ Score']
    },
    {
        title: 'SkillHire',
        category: 'Hiring Platform',
        metric: 'Hackathon Winner',
        description: 'Skill-based hiring platform with blind candidate evaluation, project-based assessments, OTP verification, and protection against SQL injection & XSS.',
        fullDescription: 'SkillHire was born at a competitive hackathon — a full-stack hiring platform that eliminates resume bias through blind candidate evaluation and project-based assessments. Employers get data-driven tools for candidate comparison, skill mapping, and performance analytics. Security was a first-class concern with OTP verification, secure sessions, and protection against SQL injection and XSS.',
        color: '#5D6D3E',
        image: '/skillhire.jpg',
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
        ],
        highlights: ['Hackathon', 'Blind Eval', 'Secure']
    },
    {
        title: 'BYG',
        category: 'Booking System',
        metric: '25+ Arenas',
        description: 'Full-stack sports facility booking system with dynamic pricing, time-slot reservations, OTP signup, and an admin dashboard with role-based access.',
        fullDescription: 'Book Your Game (BYG) is a comprehensive sports facility booking system supporting 25+ arenas with sport-wise dynamic pricing, add-ons, and time-slot–based reservations. It features a complete authentication flow with OTP signup, email verification, bcrypt hashing, and session management. An admin dashboard provides real-time monitoring of bookings, revenue, and add-on performance with role-based access control.',
        color: '#DDB8A6',
        image: '/byg.jpg',
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
        ],
        highlights: ['Admin Panel', 'Dynamic Pricing', 'OTP Auth']
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
        ],
        highlights: ['Scroll-Driven', 'Animations', 'Custom']
    }
]

const Projects = () => {
    const wrapperRef = useRef(null)
    const rowRef = useRef(null)
    const x = useMotionValue(0)
    const [selectedProject, setSelectedProject] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [hoveredIndex, setHoveredIndex] = useState(-1)

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
                {/* Dark layered background */}
                <div className="projects-bg">
                    <div className="projects-bg-gradient" />
                    <div className="projects-bg-noise" />
                    <div className="projects-bg-glow projects-bg-glow-1" />
                    <div className="projects-bg-glow projects-bg-glow-2" />
                </div>

                <div className="container projects-header-wrap">
                    <header className="projects-header">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="projects-header-content"
                        >
                            <h2 className="projects-section-title">
                                SELECTED WORK<span className="text-coral">.</span>
                            </h2>
                            
                        </motion.div>
                        
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
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className={`project-card ${hoveredIndex === index ? 'is-hovered' : ''}`}
                                onClick={() => handleCardClick(project, index)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(-1)}
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

                                    {/* Click-to-explore overlay */}
                                    <div className="project-hover-overlay">
                                        <div className="project-hover-content">
                                            <Eye size={24} />
                                            <span className="text-mono">Click to Explore</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="project-info">
                                    <p className="text-mono project-category">{project.category}</p>
                                    <h3 className="project-title">{project.title}<span className="text-coral">.</span></h3>

                                    {/* Tech highlights */}
                                    <div className="project-highlights">
                                        {project.highlights && project.highlights.map(h => (
                                            <span key={h} className="project-highlight-pill text-mono">{h}</span>
                                        ))}
                                    </div>

                                    <div className="project-card-footer">
                                        <span className="view-project-link text-mono">
                                            View Details <ArrowUpRight size={13} />
                                        </span>
                                        <div className="project-tech-mini text-mono">
                                            {project.techStack.slice(0, 3).join(' · ')}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Progress indicator */}
                <div className="projects-progress">
                    <div className="projects-progress-track">
                        <motion.div
                            className="projects-progress-fill"
                            style={{ scaleX: scrollYProgress }}
                        />
                    </div>
                    <span className="projects-scroll-hint text-mono">
                        Scroll to browse →
                    </span>
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
