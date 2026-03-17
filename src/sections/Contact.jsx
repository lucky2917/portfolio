import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Phone, Send, Check, AlertCircle } from 'lucide-react'
import '../styles/Contact.css'

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState('idle')

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: 'YOUR_ACCESS_KEY',
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: `Portfolio Contact: ${formData.name}`
                })
            })

            const data = await res.json()

            if (data.success) {
                setStatus('success')
                setFormData({ name: '', email: '', message: '' })
                setTimeout(() => setStatus('idle'), 4000)
            } else {
                setStatus('error')
                setTimeout(() => setStatus('idle'), 4000)
            }
        } catch {
            setStatus('error')
            setTimeout(() => setStatus('idle'), 4000)
        }
    }

    return (
        <section id="contact" className="contact-section">
            <div className="contact-bg">
                <div className="contact-bg-gradient" />
                <div className="contact-bg-glow" />
            </div>

            <div className="container contact-content">
                <motion.div
                    className="contact-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="contact-title">
                        CONTACT<span className="text-coral">.</span>
                    </h2>
                    <p className="contact-subtitle text-mono">Let's work together</p>
                </motion.div>

                <div className="contact-grid">
                    <motion.form
                        className="contact-form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="form-group">
                            <label htmlFor="name" className="form-label text-mono">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label text-mono">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="form-label text-mono">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project..."
                                className="form-input form-textarea"
                            />
                        </div>

                        <button
                            type="submit"
                            className="form-submit"
                            disabled={status === 'sending'}
                        >
                            {status === 'sending' && <span className="text-mono">Sending...</span>}
                            {status === 'success' && <><Check size={16} /><span className="text-mono">Sent!</span></>}
                            {status === 'error' && <><AlertCircle size={16} /><span className="text-mono">Failed — try again</span></>}
                            {status === 'idle' && <><Send size={16} /><span className="text-mono">Send Message</span></>}
                        </button>
                    </motion.form>

                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="contact-intro">
                            Have a project in mind or just want to say hi? I'm always open to new opportunities and collaborations.
                        </p>

                        <div className="contact-links">
                            <a href="mailto:arjun.gandreddi2005@gmail.com" className="contact-link-item">
                                <div className="contact-icon-wrap"><Mail size={18} /></div>
                                <div className="contact-link-text">
                                    <span className="contact-link-label text-mono">Email</span>
                                    <span className="contact-link-value">arjun.gandreddi2005@gmail.com</span>
                                </div>
                            </a>
                            <a href="tel:+919705542498" className="contact-link-item">
                                <div className="contact-icon-wrap"><Phone size={18} /></div>
                                <div className="contact-link-text">
                                    <span className="contact-link-label text-mono">Phone</span>
                                    <span className="contact-link-value">+91-9705542498</span>
                                </div>
                            </a>
                            <a href="https://github.com/lucky2917" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                                <div className="contact-icon-wrap"><Github size={18} /></div>
                                <div className="contact-link-text">
                                    <span className="contact-link-label text-mono">GitHub</span>
                                    <span className="contact-link-value">lucky2917</span>
                                </div>
                            </a>
                            <a href="https://www.linkedin.com/in/ravi-shankar-9a2b44339/" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                                <div className="contact-icon-wrap"><Linkedin size={18} /></div>
                                <div className="contact-link-text">
                                    <span className="contact-link-label text-mono">LinkedIn</span>
                                    <span className="contact-link-value">ravi-shankar</span>
                                </div>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact
