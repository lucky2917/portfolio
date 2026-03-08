import React from 'react'
import { motion } from 'framer-motion'
import './Experience.css'

const experiences = [
    {
        role: 'Full-Stack Developer',
        company: 'Frioo',
        period: 'Oct 2025 – Jan 2026',
        details: 'Built a live e-commerce platform with real-time updates, secure backend, and production-grade performance.',
        bullets: [
            'Designed a PostgreSQL schema on Supabase with Row-Level Security (RLS) and server-side validation to prevent unauthorized access and price manipulation.',
            'Implemented ACID-compliant transactions with optimistic locking to handle race conditions, added geospatial delivery validation using the Haversine formula.',
            'Deployed a React application with WebSocket-based real-time updates, achieving ~200ms API latency and a 92+ Lighthouse score through lazy loading and query optimization.'
        ],
        link: 'https://www.frioo.in'
    },
    {
        role: 'Full-Stack Developer',
        company: 'SkillHire',
        period: 'Apr 2025',
        details: 'Developed a skill-based hiring platform during a competitive hackathon, focusing on blind evaluation and data-driven shortlisting.',
        bullets: [
            'Built a blind candidate evaluation system with project-based assessments to reduce resume bias.',
            'Implemented OTP-based verification, secure session management, and protection against SQL injection and XSS.',
            'Designed employer tools for candidate comparison, skill mapping, and performance analytics.'
        ],
        link: 'https://github.com/lucky2917/SkillHire'
    },
    {
        role: 'Full-Stack Developer',
        company: 'BYG – Book Your Game',
        period: 'Mar 2025',
        details: 'Created a full-stack sports facility booking system with dynamic pricing and admin capabilities.',
        bullets: [
            'Developed a booking system supporting 25+ arenas with sport-wise dynamic pricing, add-ons, and time-slot–based reservations.',
            'Implemented secure authentication with OTP-based signup, email verification, password reset, bcrypt hashing, and session management.',
            'Built an admin dashboard to monitor bookings, revenue, and add-ons with role-based access.'
        ],
        link: 'https://github.com/lucky2917/byg_'
    }
]

const certifications = [
    {
        title: 'Build Generative AI Apps and Solutions with No-Code Tools',
        issuer: 'Infosys',
        date: 'Aug 2025',
        link: 'https://drive.google.com/file/d/1QJu0KUBybSkZ57K7Qu9_ZLz4UxpfwvEr/view?pli=1'
    },
    {
        title: 'Introduction to Hardware and Operating Systems',
        issuer: 'IBM',
        date: 'Sep 2024',
        link: 'https://www.coursera.org/account/accomplishments/verify/LUIBGAHDRB9E'
    }
]

const achievements = [
    {
        title: 'Responsible Disclosure',
        date: 'Jan 2026',
        description: 'Identified and responsibly disclosed an ad playback state-management issue on a large-scale OTT streaming platform; report was acknowledged and escalated to the security team.'
    },
    {
        title: 'Hackathon Achievement',
        date: 'Apr 2025',
        description: 'Developed SkillHire, a full-stack hiring platform during a competitive hackathon, focusing on skill-based candidate discovery and structured evaluation workflows.'
    }
]

const skills = [
    'C++', 'Java', 'JavaScript', 'PHP',
    'React', 'Node.js', 'Express.js', 'TailwindCSS',
    'PostgreSQL', 'MongoDB', 'MySQL', 'Redis',
    'Docker', 'Postman', 'HTML/CSS'
]

const Experience = () => {
    return (
        <section id="experience" className="experience-section container section">
            <div className="exp-grid">
                <div className="exp-left">
                    <h2 className="text-huge">EXP<span className="text-coral">.</span></h2>
                    <p className="text-mono">Professional Journey</p>

                    <div className="skills-cloud">
                        {skills.map(skill => (
                            <span key={skill} className="skill-tag text-mono">{skill}</span>
                        ))}
                    </div>
                </div>

                <div className="exp-right">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="exp-item"
                        >
                            <div className="exp-header">
                                <h3 className="exp-role">{exp.role}</h3>
                                <span className="exp-period text-mono">{exp.period}</span>
                            </div>
                            <p className="exp-company text-coral text-mono">
                                {exp.link ? (
                                    <a href={exp.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                        {exp.company} ↗
                                    </a>
                                ) : exp.company}
                            </p>
                            <p className="exp-details">{exp.details}</p>

                            <ul className="exp-bullets">
                                {exp.bullets.map((bullet, i) => (
                                    <li key={i} className="exp-bullet">{bullet}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}

                    {/* Certifications */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="exp-item"
                    >
                        <h3 className="exp-role">Certifications</h3>
                        <ul className="exp-bullets" style={{ marginTop: '0.75rem' }}>
                            {certifications.map((cert, i) => (
                                <li key={i} className="exp-bullet">
                                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-coral" style={{ textDecoration: 'none' }}>
                                        {cert.title}
                                    </a>
                                    {' — '}<span className="text-mono">{cert.issuer} · {cert.date}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Achievements */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="exp-item"
                    >
                        <h3 className="exp-role">Achievements</h3>
                        <ul className="exp-bullets" style={{ marginTop: '0.75rem' }}>
                            {achievements.map((ach, i) => (
                                <li key={i} className="exp-bullet">
                                    <strong>{ach.title}</strong> <span className="text-mono">({ach.date})</span> — {ach.description}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Experience

