import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react'
import './Contact.css'

const Contact = () => {
    return (
        <section id="contact" className="contact-section container section">
            <div className="contact-grid">
                <div className="contact-info">
                    <h2 className="text-huge">LET'S<br />TALK<span className="text-coral">.</span></h2>
                    <p className="text-mono contact-message">
                        Have a project in mind or just want to say hi? <br />
                        I'm always open to new opportunities.
                    </p>

                    <div className="contact-links">
                        <a href="mailto:arjun.gandreddi2005@gmail.com" className="contact-link-item">
                            <Mail size={20} />
                            <span className="text-mono">arjun.gandreddi2005@gmail.com</span>
                        </a>
                        <a href="https://github.com/lucky2917" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                            <Github size={20} />
                            <span className="text-mono">lucky2917</span>
                        </a>
                        <a href="https://www.linkedin.com/in/ravi-shankar-9a2b44339/" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                            <Linkedin size={20} />
                            <span className="text-mono">ravi-shankar-9a2b44339</span>
                        </a>
                    </div>
                </div>

                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="contact-form"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="form-group">
                        <label className="text-mono">Name</label>
                        <input type="text" placeholder="Your Name" />
                    </div>

                    <div className="form-group">
                        <label className="text-mono">Email</label>
                        <input type="email" placeholder="email@example.com" />
                    </div>

                    <div className="form-group">
                        <label className="text-mono">Message</label>
                        <textarea placeholder="Tell me about your project..." rows="5"></textarea>
                    </div>

                    <button type="submit" className="submit-btn text-mono">
                        Send Message <ArrowRight size={16} />
                    </button>
                </motion.form>
            </div>
        </section>
    )
}

export default Contact
