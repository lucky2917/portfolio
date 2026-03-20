import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Github, Linkedin, Phone, Send, Check, AlertCircle, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'
import '../styles/Contact.css'

const EMAILJS_SERVICE_ID = 'service_ldavy9e'
const EMAILJS_TEMPLATE_ID = 'template_mckr4ol'
const EMAILJS_PUBLIC_KEY = 'ttFMi6MvHCD3HVKXA'

const Contact = () => {
    const formRef = useRef(null)
    const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '' })
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState('idle')
    const [charCount, setCharCount] = useState(0)

    const validate = () => {
        const newErrors = {}
        if (!formData.from_name.trim()) newErrors.from_name = 'Name is required'
        if (!formData.from_email.trim()) {
            newErrors.from_email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email)) {
            newErrors.from_email = 'Please enter a valid email'
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required'
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (name === 'message') setCharCount(value.length)
        // Clear field error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        setStatus('sending')

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            )
            setStatus('success')
            setFormData({ from_name: '', from_email: '', message: '' })
            setCharCount(0)
            setTimeout(() => setStatus('idle'), 5000)
        } catch (err) {
            console.error('EmailJS Error:', err)
            setStatus('error')
            setTimeout(() => setStatus('idle'), 5000)
        }
    }

    const inputVariants = {
        focus: { scale: 1.01, transition: { duration: 0.2 } },
        blur: { scale: 1, transition: { duration: 0.2 } }
    }

    return (
        <section id="contact" className="contact-section">
            <div className="contact-bg">
                <div className="contact-bg-gradient" />
                <div className="contact-bg-glow" />
                <div className="contact-bg-glow contact-bg-glow-2" />
            </div>

            <div className="container contact-content">
                <motion.div
                    className="contact-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="contact-title">
                        LET'S TALK<span className="text-coral">.</span>
                    </h2>
                    <p className="contact-subtitle text-mono">Have a project in mind? Let's make it happen</p>
                </motion.div>

                <div className="contact-grid">
                    <motion.form
                        ref={formRef}
                        className="contact-form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        noValidate
                    >
                        {/* Name Field */}
                        <div className={`form-group ${errors.from_name ? 'form-group-error' : ''}`}>
                            <label htmlFor="from_name" className="form-label text-mono">
                                Name <span className="form-required">*</span>
                            </label>
                            <motion.input
                                id="from_name"
                                name="from_name"
                                type="text"
                                value={formData.from_name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="form-input"
                                whileFocus="focus"
                                variants={inputVariants}
                                autoComplete="name"
                            />
                            <AnimatePresence>
                                {errors.from_name && (
                                    <motion.span
                                        className="form-error"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                    >
                                        {errors.from_name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Email Field */}
                        <div className={`form-group ${errors.from_email ? 'form-group-error' : ''}`}>
                            <label htmlFor="from_email" className="form-label text-mono">
                                Email <span className="form-required">*</span>
                            </label>
                            <motion.input
                                id="from_email"
                                name="from_email"
                                type="email"
                                value={formData.from_email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="form-input"
                                whileFocus="focus"
                                variants={inputVariants}
                                autoComplete="email"
                            />
                            <AnimatePresence>
                                {errors.from_email && (
                                    <motion.span
                                        className="form-error"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                    >
                                        {errors.from_email}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Message Field */}
                        <div className={`form-group ${errors.message ? 'form-group-error' : ''}`}>
                            <div className="form-label-row">
                                <label htmlFor="message" className="form-label text-mono">
                                    Message <span className="form-required">*</span>
                                </label>
                                <span className="form-char-count text-mono">{charCount}/500</span>
                            </div>
                            <motion.textarea
                                id="message"
                                name="message"
                                rows={5}
                                maxLength={500}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project, idea, or just say hello..."
                                className="form-input form-textarea"
                                whileFocus="focus"
                                variants={inputVariants}
                            />
                            <AnimatePresence>
                                {errors.message && (
                                    <motion.span
                                        className="form-error"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                    >
                                        {errors.message}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            className={`form-submit ${status === 'success' ? 'form-submit-success' : ''} ${status === 'error' ? 'form-submit-error' : ''}`}
                            disabled={status === 'sending'}
                            whileHover={status === 'idle' ? { scale: 1.02, y: -2 } : {}}
                            whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                        >
                            <AnimatePresence mode="wait">
                                {status === 'sending' && (
                                    <motion.span key="sending" className="form-btn-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <Loader2 size={16} className="spin" />
                                        <span className="text-mono">Sending...</span>
                                    </motion.span>
                                )}
                                {status === 'success' && (
                                    <motion.span key="success" className="form-btn-content" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                                        <Check size={16} />
                                        <span className="text-mono">Message Sent!</span>
                                    </motion.span>
                                )}
                                {status === 'error' && (
                                    <motion.span key="error" className="form-btn-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <AlertCircle size={16} />
                                        <span className="text-mono">Failed — Try Again</span>
                                    </motion.span>
                                )}
                                {status === 'idle' && (
                                    <motion.span key="idle" className="form-btn-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <Send size={16} />
                                        <span className="text-mono">Send Message</span>
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </motion.form>

                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="contact-intro">
                            Have a project in mind or just want to say hi? I'm always open to new opportunities, collaborations, and interesting conversations.
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

                        <div className="contact-availability">
                            <span className="availability-dot" />
                            <span className="text-mono">Currently available for freelance & full-time</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact
