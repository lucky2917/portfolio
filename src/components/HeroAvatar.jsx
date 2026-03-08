import React, { useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

const HeroAvatar = () => {
    // Mouse tracking values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth movement
    const springConfig = { damping: 30, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Head movement transformations (subtle 3D shift)
    const headX = useTransform(springX, [-100, 100], [-12, 12]);
    const headY = useTransform(springY, [-100, 100], [-10, 10]);
    const headRotate = useTransform(springX, [-100, 100], [-5, 5]);

    // Eye/Pupil movement
    const eyeX = useTransform(springX, [-100, 100], [-10, 10]);
    const eyeY = useTransform(springY, [-100, 100], [-8, 8]);

    // Eyebrow movement (extra expressive)
    const browY = useTransform(springY, [-100, 100], [-4, 2]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const character = document.getElementById('hero-avatar-svg');
            if (!character) return;

            const rect = character.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const posX = ((e.clientX - centerX) / (window.innerWidth / 2)) * 100;
            const posY = ((e.clientY - centerY) / (window.innerHeight / 2)) * 100;

            mouseX.set(posX);
            mouseY.set(posY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="hero-avatar-container" style={{ width: '100%', height: '100%' }}>
            <motion.svg
                id="hero-avatar-svg"
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: '100%', overflow: 'visible' }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <defs>
                    <radialGradient id="skinGrad" cx="50%" cy="40%" r="65%">
                        <stop offset="0%" stopColor="#FFF2EA" />
                        <stop offset="60%" stopColor="#FBDBCC" />
                        <stop offset="100%" stopColor="#F5C2AD" />
                    </radialGradient>
                    <filter id="softGlow">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    {/* Brand Colors for accents */}
                    <linearGradient id="brandJacket" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#EF6D58" />
                        <stop offset="100%" stopColor="#D85A46" />
                    </linearGradient>
                </defs>

                {/* Jacket Background (Yellow Shell/Hood) */}
                <path d="M40 500 Q 150 280 250 320 Q 350 280 460 500 L 460 550 L 40 550 Z" fill="url(#brandJacket)" />

                {/* Blue Inner Hood/Collar (Using Brand Primary Coral as accent or keep Blue for accuracy) */}
                {/* Let's use a brand-aligned blue/green mix if appropriate, but stick to reference image for "accuracy" */}
                <motion.path
                    d="M120 400 Q 250 480 380 400 C 380 480, 120 480, 120 400"
                    fill="#DDB8A6"
                    style={{ y: useTransform(springY, [-100, 100], [-8, 8]) }}
                />

                {/* Head Group */}
                <motion.g style={{ x: headX, y: headY, rotate: headRotate, transformOrigin: "250px 250px" }}>
                    {/* Ears with flush */}
                    <circle cx="155" cy="285" r="42" fill="#F5C2AD" />
                    <circle cx="155" cy="285" r="25" fill="#E5A88D" fillOpacity="0.4" />
                    <circle cx="345" cy="285" r="42" fill="#F5C2AD" />
                    <circle cx="345" cy="285" r="25" fill="#E5A88D" fillOpacity="0.4" />

                    {/* Face Base */}
                    <path d="M180 230 Q 180 160 250 160 Q 320 160 320 230 V 310 Q 320 380 250 380 Q 180 380 180 310 Z" fill="url(#skinGrad)" />

                    {/* Cheeks Blush (Using Brand Coral #EF6D58) */}
                    <circle cx="215" cy="325" r="22" fill="#EF6D58" fillOpacity="0.2" filter="url(#softGlow)" />
                    <circle cx="285" cy="325" r="22" fill="#EF6D58" fillOpacity="0.2" filter="url(#softGlow)" />

                    {/* Eyes (Large Ovals) - Using Brand Dark Brown #3D3025 for pupils */}
                    <g transform="translate(250, 260)">
                        <motion.g style={{ x: eyeX, y: eyeY }}>
                            <ellipse cx="-38" cy="10" rx="22" ry="26" fill="#3D3025" />
                            <circle cx="-32" cy="0" r="7" fill="white" />
                            <circle cx="-42" cy="18" r="3" fill="white" fillOpacity="0.6" />
                        </motion.g>
                        <motion.g style={{ x: eyeX, y: eyeY }}>
                            <ellipse cx="38" cy="10" rx="22" ry="26" fill="#3D3025" />
                            <circle cx="44" cy="0" r="7" fill="white" />
                            <circle cx="34" cy="18" r="3" fill="white" fillOpacity="0.6" />
                        </motion.g>
                    </g>

                    {/* Eyebrows (Brand Dark Brown #3D3025) */}
                    <motion.g style={{ y: browY }}>
                        <path d="M195 245 Q 215 225 235 240" stroke="#3D3025" strokeWidth="8" strokeLinecap="round" />
                        <path d="M265 240 Q 285 225 305 245" stroke="#3D3025" strokeWidth="8" strokeLinecap="round" />
                    </motion.g>

                    {/* Nose & Mouth */}
                    <path d="M245 315 Q 250 320 255 315" stroke="#CE957C" strokeWidth="3" strokeLinecap="round" />
                    <path d="M247 355 Q 250 357 253 355" stroke="#CE957C" strokeWidth="2" strokeLinecap="round" fill="none" />

                    {/* Hair (Brand Dark Brown #3D3025) */}
                    <path d="M180 230 Q 170 190 200 170 Q 220 195 240 160 Q 260 195 285 170 Q 330 190 320 230 Z" fill="#3D3025" />
                </motion.g>

                {/* Cap Group */}
                <motion.g style={{ x: useTransform(springX, [-100, 100], [-8, 8]), y: headY, rotate: headRotate, transformOrigin: "250px 180px" }}>
                    {/* Crown (Light Blue or Brand Secondary Green?) */}
                    {/* Let's stick to Blue for cap crown but use Brand Green #5D6D3E for the bill for unique brand touch */}
                    <path d="M175 220 Q 175 120 250 120 Q 325 120 325 220 Z" fill="#5D6D3E" />
                    {/* Bill — Brand Dark Brown */}
                    <path d="M175 200 Q 300 110 440 215 Q 360 250 250 225 Q 175 210 175 200" fill="#3D3025" />
                    <circle cx="250" cy="120" r="6" fill="white" fillOpacity="0.3" />
                </motion.g>

                {/* Jacket Detail Layer */}
                <g>
                    {/* Pockets */}
                    <rect x="120" y="450" width="60" height="60" rx="4" fill="#D85A46" stroke="#C44D3A" strokeWidth="2" />
                    {/* Pocket Detail — muted */}
                    <rect x="135" y="465" width="30" height="20" rx="2" fill="#DDB8A6" fillOpacity="0.9" />
                    <rect x="135" y="472" width="20" height="6" rx="1" fill="#D85A46" />

                    {/* Buttons (Brand Dark Brown #3D3025) */}
                    <circle cx="250" cy="425" r="8" fill="#3D3025" />
                    <circle cx="370" cy="485" r="10" fill="#3D3025" />
                    <circle cx="330" cy="560" r="12" fill="#3D3025" />
                </g>
            </motion.svg>
        </div>
    );
};

export default HeroAvatar;
