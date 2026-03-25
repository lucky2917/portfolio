import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Award } from 'lucide-react'
import '../styles/Certificates.css'

import certIbm from '../assets/cert-ibm-hardware-os.png'
import certUab from '../assets/cert-uab-digital-systems.png'
import certCuSpec from '../assets/cert-cu-computer-communications.png'
import certCuNetwork from '../assets/cert-cu-network-communication.png'
import certCuP2p from '../assets/cert-cu-p2p-protocols.png'
import certCuPacket from '../assets/cert-cu-packet-switching.png'
import certLpuOop from '../assets/cert-lpu-oop.png'
import certLpuDsa from '../assets/cert-lpu-dsa.png'
import certOracle from '../assets/cert-oracle-oci-ai.png'

const certificates = [
    {
        title: 'Oracle Cloud Infrastructure 2025 AI Foundations Associate',
        issuer: 'Oracle University',
        date: 'Mar 2026',
        image: certOracle,
        description: 'Industry-recognized certification validating expertise in Oracle Cloud Infrastructure and AI foundations, including machine learning, deep learning, and generative AI concepts.',
        tags: ['Cloud', 'AI/ML', 'Oracle'],
        verify: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=103437206OCI25AICFA'
    },
    {
        title: 'Computer Communications Specialization',
        issuer: 'University of Colorado · Coursera',
        date: 'Dec 2024',
        image: certCuSpec,
        description: 'Completed a 4-course specialization covering network architectures, protocol design principles, and TCP/IP programming skills for computer networking.',
        tags: ['Networking', 'Specialization', '4 Courses'],
        verify: null
    },
    {
        title: 'Introduction to Hardware and Operating Systems',
        issuer: 'IBM · Coursera',
        date: 'Sep 2024',
        image: certIbm,
        description: 'Comprehensive course on computer hardware components, operating system fundamentals, and how the two work together to deliver computing power.',
        tags: ['Hardware', 'OS', 'IBM'],
        verify: 'https://coursera.org/verify/LUIBGAHDRB9E'
    },
    {
        title: 'Digital Systems: From Logic Gates to Processors',
        issuer: 'Universitat Autònoma de Barcelona · Coursera',
        date: 'Dec 2024',
        image: certUab,
        description: 'Deep dive into digital system design — from combinational and sequential circuits to processor architecture and microcontroller programming.',
        tags: ['Digital Systems', 'Processors', 'Hardware'],
        verify: 'https://coursera.org/verify/UTDQKK5MAQWD'
    },
    {
        title: 'Fundamentals of Network Communication',
        issuer: 'University of Colorado · Coursera',
        date: 'Oct 2024',
        image: certCuNetwork,
        description: 'Foundations of how data moves across networks, covering network layers, protocols, addressing, and the physical infrastructure of the internet.',
        tags: ['Networking', 'Protocols'],
        verify: 'https://coursera.org/verify/713NQJ5NR59B'
    },
    {
        title: 'Peer-to-Peer Protocols and Local Area Networks',
        issuer: 'University of Colorado · Coursera',
        date: 'Oct 2024',
        image: certCuP2p,
        description: 'Study of P2P architectures, Ethernet, Wi-Fi, and LAN technologies that form the backbone of modern local networking.',
        tags: ['P2P', 'LAN', 'Networking'],
        verify: 'https://coursera.org/verify/4D58AC6LXILH'
    },
    {
        title: 'Packet Switching Networks and Algorithms',
        issuer: 'University of Colorado · Coursera',
        date: 'Nov 2024',
        image: certCuPacket,
        description: 'Advanced study of packet switching, routing algorithms, congestion control, and quality-of-service mechanisms in computer networks.',
        tags: ['Routing', 'Algorithms', 'Networking'],
        verify: 'https://coursera.org/verify/VWJIF8BJ6JTU'
    },
    {
        title: 'Object Oriented Programming',
        issuer: 'Lovely Professional University · iamNeo',
        date: 'Dec 2024',
        image: certLpuOop,
        description: '72-hour comprehensive course covering OOP principles including encapsulation, inheritance, polymorphism, and abstraction with practical applications.',
        tags: ['OOP', 'Java', '72 Hours'],
        verify: null
    },
    {
        title: 'Data Structures and Algorithm',
        issuer: 'Lovely Professional University · iamNeo',
        date: 'Dec 2024',
        image: certLpuDsa,
        description: '72-hour intensive course on fundamental data structures and algorithms — arrays, linked lists, trees, graphs, sorting, and searching techniques.',
        tags: ['DSA', 'Algorithms', '72 Hours'],
        verify: null
    }
]

const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 400 : -400, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: (direction) => ({ x: direction > 0 ? -400 : 400, opacity: 0, scale: 0.95, transition: { duration: 0.25 } })
}

const Certificates = () => {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(0)

    const paginate = (newDirection) => {
        setDirection(newDirection)
        setCurrent((prev) => (prev + newDirection + certificates.length) % certificates.length)
    }

    const goTo = (index) => {
        setDirection(index > current ? 1 : -1)
        setCurrent(index)
    }

    const cert = certificates[current]

    return (
        <section className="certs-section" id="certificates">
            <div className="container">
                <motion.div
                    className="certs-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="section-label text-mono"><Award size={14} /> Certifications</p>
                    <h2 className="certs-title">
                        CREDENTIALS<span className="text-coral">.</span>
                    </h2>
                    <p className="certs-subtitle text-mono">{certificates.length} verified certifications</p>
                </motion.div>

                <motion.div
                    className="certs-carousel"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                >
                    <div className="certs-card">
                        <div className="certs-image-side">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.img
                                    key={current}
                                    src={cert.image}
                                    alt={cert.title}
                                    className="certs-image"
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    draggable={false}
                                />
                            </AnimatePresence>

                            <button className="certs-nav-btn certs-nav-prev" onClick={() => paginate(-1)}>
                                <ChevronLeft size={20} />
                            </button>
                            <button className="certs-nav-btn certs-nav-next" onClick={() => paginate(1)}>
                                <ChevronRight size={20} />
                            </button>

                            <div className="certs-counter text-mono">
                                {String(current + 1).padStart(2, '0')} / {String(certificates.length).padStart(2, '0')}
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                className="certs-info-side"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="certs-meta">
                                    <span className="certs-issuer text-mono">{cert.issuer}</span>
                                    <span className="certs-date text-mono">{cert.date}</span>
                                </div>
                                <h3 className="certs-name">{cert.title}</h3>
                                <p className="certs-desc">{cert.description}</p>
                                <div className="certs-tags">
                                    {cert.tags.map((tag) => (
                                        <span key={tag} className="certs-tag text-mono">{tag}</span>
                                    ))}
                                </div>
                                {cert.verify && (
                                    <a href={cert.verify} target="_blank" rel="noopener noreferrer" className="certs-verify text-mono">
                                        Verify Certificate <ExternalLink size={13} />
                                    </a>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="certs-dots">
                        {certificates.map((_, i) => (
                            <button
                                key={i}
                                className={`certs-dot ${i === current ? 'active' : ''}`}
                                onClick={() => goTo(i)}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Certificates
