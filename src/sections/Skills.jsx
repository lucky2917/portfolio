import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/Skills.css'

const categories = [
    {
        id: 'languages',
        title: 'Languages',
        color: '#EF6D58',
        skills: ['C++', 'Java', 'JavaScript', 'PHP']
    },
    {
        id: 'frameworks',
        title: 'Frameworks',
        color: '#5D6D3E',
        skills: ['HTML & CSS', 'TailwindCSS', 'NodeJS', 'ReactJS', 'ExpressJS']
    },
    {
        id: 'tools',
        title: 'Tools/Platforms',
        color: '#C9A882',
        skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Postman', 'Docker']
    },
    {
        id: 'softskills',
        title: 'Soft Skills',
        color: '#8A6D96',
        skills: ['Problem-Solving', 'Team Player', 'Adaptability']
    }
]

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState('languages')

    const activeCat = categories.find(c => c.id === activeCategory)

    return (
        <section id="skills" className="skills-section">
            <div className="skills-bg">
                <div className="skills-bg-gradient" />
                <div className="skills-bg-noise" />
                <div className="skills-bg-glow skills-bg-glow-1" />
                <div className="skills-bg-glow skills-bg-glow-2" />
            </div>

            <div className="container skills-content">
                <motion.div
                    className="skills-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="skills-title">
                        SKILLS<span className="text-coral">.</span>
                    </h2>
                    <p className="skills-subtitle text-mono">What I work with</p>
                </motion.div>

                <div className="skills-tabs">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`skills-tab text-mono ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                            style={{ '--tab-color': cat.color }}
                        >
                            <span className="tab-dot" style={{ background: cat.color }} />
                            {cat.title}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        className="skills-grid"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeCat.skills.map((skill, i) => (
                            <motion.div
                                key={skill}
                                className="skill-item-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                style={{ '--accent': activeCat.color }}
                            >
                                <div className="skill-dot" />
                                <span className="skill-name">{skill}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    className="skills-summary"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="summary-stat">
                        <span className="summary-number">15+</span>
                        <span className="summary-label text-mono">Technologies</span>
                    </div>
                    <div className="summary-stat">
                        <span className="summary-number">3+</span>
                        <span className="summary-label text-mono">Projects Shipped</span>
                    </div>
                    <div className="summary-stat">
                        <span className="summary-number">1+</span>
                        <span className="summary-label text-mono">Years Coding</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Skills
