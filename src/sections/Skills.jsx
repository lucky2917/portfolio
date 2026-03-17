import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/Skills.css'

const categories = [
    {
        id: 'languages',
        title: 'Languages',
        color: '#EF6D58',
        skills: [
            { name: 'JavaScript', level: 90 },
            { name: 'C++', level: 75 },
            { name: 'Java', level: 70 },
            { name: 'PHP', level: 80 },
            { name: 'SQL', level: 85 },
            { name: 'HTML/CSS', level: 90 }
        ]
    },
    {
        id: 'frameworks',
        title: 'Frameworks & Libraries',
        color: '#5D6D3E',
        skills: [
            { name: 'React', level: 88 },
            { name: 'Node.js', level: 85 },
            { name: 'Express.js', level: 85 },
            { name: 'Framer Motion', level: 75 },
            { name: 'TailwindCSS', level: 80 },
            { name: 'REST APIs', level: 85 }
        ]
    },
    {
        id: 'tools',
        title: 'Tools & Databases',
        color: '#C9A882',
        skills: [
            { name: 'PostgreSQL', level: 85 },
            { name: 'MongoDB', level: 75 },
            { name: 'MySQL', level: 80 },
            { name: 'Redis', level: 65 },
            { name: 'Supabase', level: 80 },
            { name: 'Docker', level: 60 },
            { name: 'Git', level: 85 },
            { name: 'Postman', level: 80 }
        ]
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
                                key={skill.name}
                                className="skill-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <div className="skill-info">
                                    <span className="skill-name">{skill.name}</span>
                                    <span className="skill-level text-mono">{skill.level}%</span>
                                </div>
                                <div className="skill-bar-track">
                                    <motion.div
                                        className="skill-bar-fill"
                                        style={{ background: activeCat.color }}
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: skill.level / 100 }}
                                        transition={{ delay: i * 0.05 + 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                </div>
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
