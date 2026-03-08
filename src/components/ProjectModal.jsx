import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import './ProjectModal.css'

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { delay: 0.2, duration: 0.3 } }
}

const panelVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 60 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring', damping: 28, stiffness: 260 }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: 40,
        transition: { duration: 0.25, ease: 'easeIn' }
    }
}

const stagger = {
    visible: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    }
}

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
}

const orbFloat = (delay, dx, dy) => ({
    animate: {
        x: [0, dx, -dx * 0.6, 0],
        y: [0, -dy, dy * 0.8, 0],
        scale: [1, 1.15, 0.95, 1]
    },
    transition: {
        duration: 10 + delay * 2,
        repeat: Infinity,
        ease: 'easeInOut'
    }
})

const ProjectModal = ({ project, index, onClose }) => {
    useEffect(() => {
        const original = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        const onKey = (e) => e.key === 'Escape' && onClose()
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = original
            window.removeEventListener('keydown', onKey)
        }
    }, [onClose])

    if (!project) return null

    return (
        <AnimatePresence>
            <motion.div
                className="modal-backdrop"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={onClose}
            >
                <motion.div className="modal-backdrop-bg" />

                <motion.div
                    className="modal-orb modal-orb-1"
                    {...orbFloat(0, 30, 20)}
                />
                <motion.div
                    className="modal-orb modal-orb-2"
                    {...orbFloat(1, -25, 30)}
                />
                <motion.div
                    className="modal-orb modal-orb-3"
                    {...orbFloat(2, 20, -25)}
                />

                <motion.div
                    className="modal-border-wrapper"
                    variants={panelVariants}
                    onClick={(e) => e.stopPropagation()}
                >
                    <motion.div className="modal-panel" variants={stagger}>
                        <button className="modal-close" onClick={onClose}>
                            <X size={18} />
                        </button>

                        <span className="modal-watermark">0{index + 1}</span>

                        <motion.div className="modal-top" variants={fadeUp}>
                            <div className="modal-meta">
                                <p className="modal-category text-mono">{project.category}</p>
                                <h2 className="modal-title">
                                    {project.title}<span className="text-coral">.</span>
                                </h2>
                                <div className="modal-role-year">
                                    <span className="modal-role text-mono">{project.role}</span>
                                    <span className="modal-year text-mono">{project.year}</span>
                                </div>
                            </div>
                            <div className="modal-metric-badge text-mono">{project.metric}</div>
                        </motion.div>

                        <motion.div className="modal-divider" variants={fadeUp} />

                        <motion.p className="modal-description" variants={fadeUp}>
                            {project.fullDescription}
                        </motion.p>

                        {project.techStack && project.techStack.length > 0 && (
                            <motion.div variants={fadeUp}>
                                <p className="modal-section-label text-mono">Tech Stack</p>
                                <div className="modal-tech-grid">
                                    {project.techStack.map((tech) => (
                                        <motion.span
                                            key={tech}
                                            className="modal-tech-pill text-mono"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {project.features && project.features.length > 0 && (
                            <motion.div variants={fadeUp}>
                                <p className="modal-section-label text-mono">Key Features</p>
                                <ul className="modal-features">
                                    {project.features.map((feature, i) => (
                                        <motion.li
                                            key={i}
                                            className="modal-feature"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + i * 0.06 }}
                                        >
                                            <span className="modal-feature-dot" />
                                            <span>{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {project.link && (
                            <motion.div variants={fadeUp}>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="modal-cta"
                                >
                                    Visit Project <ArrowRight size={16} />
                                </a>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ProjectModal
