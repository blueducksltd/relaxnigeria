'use client'

import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useSound } from '@/contexts/SoundContext'

const SoundToggle = () => {
    const { isMuted, toggleMute } = useSound()

    const toggleSound = () => toggleMute()

    return (
        <div className='flex items-center gap-3 select-none'>
            <span className={`text-sm uppercase ${isMuted ? 'text-darkgreen/50' : 'text-darkgreen border-b border-darkgreen duration-300 transition-all'}`}>Sound</span>

            <button
                onClick={toggleSound}
                className="relative flex items-center w-14 h-7 rounded-full p-1 cursor-pointer overflow-hidden bg-darkgreen/10 border border-darkgreen/20 group"
                aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            >
                {/* Background sliding color */}
                <motion.div
                    className="absolute inset-0 bg-lightgreen"
                    initial={false}
                    animate={{
                        x: isMuted ? "-100%" : "0%",
                        opacity: isMuted ? 0 : 1
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />

                {/* Icons container */}
                <div className="absolute inset-0 flex justify-between items-center px-2 z-0 opacity-40">
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={{ opacity: isMuted ? 0 : 1 }}
                    >
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </motion.svg>

                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={{ opacity: isMuted ? 1 : 0 }}
                    >
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                        <path d="M9 9v6a3 3 0 0 0 5.12 2.12M7 2v2m0 16v2m15-11h-2M4 11H2m16.07-6.07l-1.42 1.42M6.41 17.59l-1.42 1.42M17.59 17.59l1.42 1.42M6.41 6.41l-1.42 1.42"></path>
                    </motion.svg>
                </div>

                {/* Knob */}
                <motion.div
                    className="relative z-10 w-5 h-5 bg-white rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2)] flex items-center justify-center border border-white/50"
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    animate={{
                        x: isMuted ? 0 : 28,
                    }}
                >
                    <AnimatePresence mode="wait">
                        {isMuted ? (
                            <motion.svg
                                key="mute"
                                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                                transition={{ duration: 0.2 }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-darkgreen/50"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </motion.svg>
                        ) : (
                            <motion.svg
                                key="sound"
                                initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
                                transition={{ duration: 0.2 }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="text-darkgreen"
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                {/* Using a heart momentarily just for a "premium" flare? Actually let's use a dot or pulse */}
                                <circle cx="12" cy="12" r="3" />
                            </motion.svg>
                        )}
                    </AnimatePresence>
                </motion.div>
            </button>
        </div>
    )
}

export default SoundToggle
