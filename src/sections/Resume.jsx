import React from 'react'
import { motion } from 'framer-motion'
import { Download, FileText } from 'lucide-react'
import '../styles/Resume.css'
import resumeFile from '../../references/GeneralizedCV (1).pdf'

const Resume = () => {
    return (
        <section id="resume" className="resume-section">
            <div className="resume-bg">
                <div className="resume-bg-gradient" />
                <div className="resume-bg-noise" />
                <div className="resume-bg-glow" />
            </div>

            <div className="container resume-content">
                <motion.div
                    className="resume-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="resume-header-left">
                        <h2 className="resume-title">
                            RESUME<span className="text-coral">.</span>
                        </h2>
                        <p className="resume-subtitle text-mono">Live Preview</p>
                    </div>
                    <motion.a
                        href={resumeFile}
                        download="Ravi_Resume.pdf"
                        className="resume-download-btn"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Download size={16} />
                        <span className="text-mono">Download PDF</span>
                    </motion.a>
                </motion.div>

                <motion.div
                    className="resume-preview-wrapper"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                >
                    <div className="resume-preview-topbar">
                        <div className="topbar-dots">
                            <span />
                            <span />
                            <span />
                        </div>
                        <div className="topbar-filename text-mono">
                            <FileText size={12} />
                            GeneralizedCV(1).pdf
                        </div>
                    </div>
                    <div className="resume-embed-container">
                        <iframe
                            src={`${resumeFile}#view=FitH&toolbar=0&navpanes=0`}
                            className="resume-embed"
                            title="Resume Preview"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Resume
