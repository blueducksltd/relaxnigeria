'use client'

import Link from 'next/link'
import { motion } from 'motion/react'

export default function NotFound() {
    return (
        <main className="h-screen bg-milk flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-24 -left-24 w-96 h-96 bg-lightgreen/10 rounded-full blur-3xl opacity-60"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-darkgreen/5 rounded-full blur-3xl opacity-40"
            />

            <div className="relative z-10 w-full max-w-2xl px-4 py-8">
                <div className="bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_32px_64px_-16px_rgba(36,83,51,0.1)] p-8 md:p-16 lg:p-20 rounded-[40px] md:rounded-[80px] text-center border-b-8 border-b-darkgreen/5 max-h-[85vh] flex flex-col justify-center overflow-hidden">
                    {/* Animated Number */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="relative inline-block"
                    >
                        <h1 className="font-laybar text-[120px] md:text-[220px] text-darkgreen leading-none select-none tracking-tighter">
                            404
                        </h1>
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-2 -right-2 md:-top-10 md:-right-10 bg-lightgreen w-14 h-14 md:w-24 md:h-24 rounded-full flex items-center justify-center text-darkgreen shadow-xl border-4 border-white"
                        >
                            <svg className="w-7 h-7 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 md:mt-10 space-y-4 md:space-y-6"
                    >
                        <h2 className="text-3xl md:text-5xl font-laybar text-darkgreen leading-tight">
                            Lost in the Movement?
                        </h2>
                        <p className="text-darkgreen/60 text-base md:text-xl max-w-md mx-auto leading-relaxed font-medium">
                            It seems this path is still under construction. While we fix this, let&apos;s get you back to the progress.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="mt-12 md:mt-16"
                    >
                        <Link
                            href="/"
                            className="inline-block bg-darkgreen text-milk px-12 md:px-16 py-5 md:py-6 rounded-full font-bold text-lg md:text-xl shadow-[0_20px_40px_-10px_rgba(36,83,51,0.3)] hover:scale-[1.05] active:scale-[0.98] transition-all hover:brightness-110"
                        >
                            Return Home
                        </Link>
                    </motion.div>
                </div>

                {/* Brand Footnote */}
                <div className="mt-12 flex flex-col items-center gap-4 opacity-30 select-none">
                    <div className="w-12 h-px bg-darkgreen" />
                    <p className="text-center text-darkgreen text-xs font-black uppercase tracking-[0.3em] font-inter">
                        Relax Tinubu is Fixing Nigeria
                    </p>
                </div>
            </div>
        </main>
    )
}
