'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SoundToggle from './SoundToggle'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'
import JoinUsModal from './JoinUsModal'
import { useSession } from 'next-auth/react'

const Header = () => {
    const { data: session } = useSession()
    const user = session?.user as any
    const isLoggedIn = !!session && user?.role === 'user'
    const [isVisible, setIsVisible] = useState(true)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
    const { scrollY } = useScroll()
    const pathname = usePathname()

    const navItems = [
        { name: 'Works', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Event', href: '/events' },
        { name: 'Gallery', href: '/gallery' },
    ]

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0

        // At the top, always visible
        if (latest < 50) {
            setIsVisible(true)
            setIsScrolled(false)
            return
        }

        // Determine visibility based on scroll direction
        if (latest > previous && latest > 150) {
            setIsVisible(false) // Scrolling down - Hide
            setIsMenuOpen(false) // Close menu on scroll down
        } else if (latest < previous) {
            setIsVisible(true) // Scrolling up - Show
        }

        // Scrolled state for visual styling
        setIsScrolled(latest > 50)
    })

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <motion.header
            animate={{
                y: isVisible ? 0 : -120,
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 25
            }}
            className={`fixed top-0 left-0 right-0 z-100 w-full transition-colors duration-500 ${isScrolled || isMenuOpen ? 'bg-milk/80 backdrop-blur-lg shadow-[0_2px_15px_-3px_rgba(36,83,51,0.05)] border-b border-darkgreen/5' : 'bg-transparent'
                }`}
        >
            <nav className={`flex justify-between items-center px-6 md:px-20 font-light transition-all duration-500 ${isScrolled ? 'py-4' : 'py-7'}`}>
                <Link href={'/'} className='relative z-110'>
                    <Image
                        src={'/logo.png'}
                        alt='Logo'
                        width={150}
                        height={40}
                        className="w-28 md:w-36 h-auto"
                        priority
                    />
                </Link>

                {/* Desktop Menu */}
                <div className='hidden lg:flex items-center gap-4 bg-white/40 p-1.5 rounded-full border border-darkgreen/5 backdrop-blur-sm shadow-sm'>
                    <ul className='flex items-center gap-2'>
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.href} className={`${pathname === item.href ? 'bg-lightgreen text-darkgreen' : 'hover:bg-darkgreen/5'} rounded-full px-5 py-2.5 transition-all inline-block`}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <li className='h-8 w-px bg-darkgreen/10 mx-2 list-none' />
                    <div className='pr-4'>
                        <SoundToggle />
                    </div>
                </div>
                {isLoggedIn ? (
                    <Link href="/dashboard" className="hidden lg:inline-block border-2 border-darkgreen bg-darkgreen text-white font-medium rounded-full px-7 py-2.5 hover:bg-darkgreen/90 hover:shadow-lg hover:shadow-darkgreen/20 transition-all active:scale-95">
                        My Dashboard
                    </Link>
                ) : (
                    <button onClick={() => setIsJoinModalOpen(true)} className='hidden lg:inline-block border-2 border-darkgreen text-darkgreen font-medium rounded-full px-7 py-2.5 hover:bg-darkgreen hover:text-white hover:shadow-lg hover:shadow-darkgreen/20 transition-all active:scale-95 cursor-pointer'>
                        Join us
                    </button>
                )}

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden relative z-110 p-2 text-darkgreen focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <div className="w-6 h-5 relative flex flex-col justify-between">
                        <motion.span
                            animate={isMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                            className="w-full h-0.5 bg-current rounded-full origin-center"
                        />
                        <motion.span
                            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-full h-0.5 bg-current rounded-full"
                        />
                        <motion.span
                            animate={isMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                            className="w-full h-0.5 bg-current rounded-full origin-center"
                        />
                    </div>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className='lg:hidden fixed inset-0 bg-milk z-105 flex flex-col pt-32 px-6'
                    >
                        <ul className='flex flex-col gap-6 text-2xl font-laybar font-medium text-darkgreen'>
                            {navItems.map((item, index) => (
                                <motion.li key={index} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                                    <Link href={item.href} onClick={toggleMenu} className="block py-2 border-b border-darkgreen/5">{item.name}</Link>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="mt-auto mb-10 flex flex-col gap-6">
                            <div className="flex items-center justify-between p-4 bg-darkgreen/5 rounded-2xl">
                                <span className="text-sm uppercase tracking-wider font-medium opacity-60">Sound Settings</span>
                                <SoundToggle />
                            </div>
                            {isLoggedIn ? (
                                <Link
                                    href="/dashboard"
                                    onClick={toggleMenu}
                                    className='bg-darkgreen text-milk text-center font-medium rounded-2xl py-5 text-xl shadow-xl shadow-darkgreen/20 block'
                                >
                                    My Dashboard
                                </Link>
                            ) : (
                                <button
                                    onClick={() => {
                                        toggleMenu()
                                        setIsJoinModalOpen(true)
                                    }}
                                    className='bg-darkgreen text-milk text-center font-medium rounded-2xl py-5 text-xl shadow-xl shadow-darkgreen/20 w-full cursor-pointer'
                                >
                                    Join the Movement
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <JoinUsModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
        </motion.header>
    )
}

export default Header