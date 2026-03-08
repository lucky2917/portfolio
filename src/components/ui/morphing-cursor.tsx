"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import { cn } from "../../lib/utils"

interface MagneticTextProps {
    text: string
    hoverText?: string
    className?: string
}

export const MorphingCursor: React.FC<MagneticTextProps> = ({
    text,
    hoverText,
    className,
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const circleRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    // Tracking positions
    const mousePos = useRef({ x: 0, y: 0 })
    const circlePos = useRef({ x: 0, y: 0 })
    const scale = useRef(0)
    const requestRef = useRef<number | null>(null)

    // Linear Interpolation
    const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor
    }

    const animate = useCallback(() => {
        const targetScale = isHovered ? 1 : 0

        // Smooth circle tracking
        circlePos.current.x = lerp(circlePos.current.x, mousePos.current.x, 0.15)
        circlePos.current.y = lerp(circlePos.current.y, mousePos.current.y, 0.15)

        // Smooth scale expansion
        scale.current = lerp(scale.current, targetScale, 0.15)

        if (circleRef.current) {
            // Offset circle by its size (radius = 75px if diameter is 150px)
            circleRef.current.style.transform = `translate3d(${circlePos.current.x - 75}px, ${circlePos.current.y - 75}px, 0) scale(${scale.current})`

            const innerText = circleRef.current.querySelector(".hover-text") as HTMLElement
            if (innerText) {
                // Inverse translate the inner text to create depth/fixed position illusion
                innerText.style.transform = `translate3d(${- (circlePos.current.x - 75)}px, ${- (circlePos.current.y - 75)}px, 0)`
            }
        }

        requestRef.current = requestAnimationFrame(animate)
    }, [isHovered])

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate)
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current)
        }
    }, [animate])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            mousePos.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            }
        }
    }

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative inline-block cursor-none py-4 px-8 select-none border border-transparent",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            {/* Base Text */}
            <span className="text-5xl font-bold tracking-tighter text-foreground block whitespace-nowrap">
                {text}
            </span>

            {/* Morphing Circle Overlay */}
            <div
                ref={circleRef}
                className="absolute top-0 left-0 w-[150px] h-[150px] rounded-full bg-foreground pointer-events-none overflow-hidden flex items-center justify-center will-change-transform z-10"
                style={{
                    transform: `translate3d(-100%, -100%, 0) scale(0)`,
                }}
            >
                {/* Hover Text inside circle */}
                <div className="hover-text absolute whitespace-nowrap">
                    <span className="text-5xl font-bold tracking-tighter text-background px-8">
                        {hoverText || text}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MorphingCursor
