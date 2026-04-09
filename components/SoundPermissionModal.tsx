'use client'

import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useSound } from '@/contexts/SoundContext'

const SoundPermissionModal = () => {
    const { showModal, setSoundPermission } = useSound()

    return (
        <AnimatePresence>
            {showModal && (
                <div className='fixed inset-0 z-100 flex items-center justify-center px-4'>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
                        onClick={() => setSoundPermission(false)}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className='relative bg-milk w-full max-w-md p-8 rounded-3xl shadow-2xl border border-darkgreen/10 text-center overflow-hidden'
                    >
                        {/* Decorative background glows */}
                        <div className='absolute -top-12 -right-12 w-32 h-32 bg-lightgreen/20 rounded-full blur-3xl' />
                        <div className='absolute -bottom-12 -left-12 w-32 h-32 bg-darkgreen/10 rounded-full blur-3xl' />

                        <div className='relative z-10'>
                            {/* Icon Container */}
                            <div className='w-20 h-20 bg-darkgreen/5 rounded-3xl flex items-center justify-center mx-auto mb-8 relative group'>
                                <div className='absolute inset-0 bg-darkgreen/5 rounded-3xl animate-pulse group-hover:scale-110 transition-transform' />
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-darkgreen relative z-10">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                </svg>
                            </div>

                            <h2 className='font-laybar text-4xl text-darkgreen mb-4'>Experience the Vision</h2>
                            <p className='text-gray-600 mb-10 leading-relaxed text-lg'>
                                For better Experience, we recommend you enable sound
                            </p>

                            <div className='flex flex-col gap-4'>
                                <button
                                    onClick={() => setSoundPermission(true)}
                                    className='bg-darkgreen text-milk py-5 px-8 rounded-2xl font-semibold text-lg shadow-xl shadow-darkgreen/20 transition-all hover:scale-[1.02] active:scale-[0.98] hover:brightness-110'
                                >
                                    Yes, Enable Sound
                                </button>
                                <button
                                    onClick={() => setSoundPermission(false)}
                                    className='bg-transparent text-darkgreen/50 py-3 px-8 rounded-2xl font-medium transition-all hover:text-darkgreen hover:bg-darkgreen/5 active:scale-[0.98]'
                                >
                                    Stay Muted
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default SoundPermissionModal
