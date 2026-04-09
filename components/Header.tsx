'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import SoundToggle from './SoundToggle'
import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import Image from 'next/image'

const Header = () => {
    const [isVisible, setIsVisible] = useState(true)
    const [isScrolled, setIsScrolled] = useState(false)
    const { scrollY } = useScroll()

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
        } else if (latest < previous) {
            setIsVisible(true) // Scrolling up - Show
        }

        // Scrolled state for visual styling
        setIsScrolled(latest > 50)
    })

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
            className={`fixed top-0 left-0 right-0 z-100 w-full transition-colors duration-500 ${isScrolled ? 'bg-milk/80 backdrop-blur-lg shadow-[0_2px_15px_-3px_rgba(36,83,51,0.05)] border-b border-darkgreen/5' : 'bg-transparent'
                }`}
        >
            <nav className={`flex justify-between items-center px-20 font-light transition-all duration-500 ${isScrolled ? 'py-4' : 'py-7'}`}>
                <Link href={'/'} className='text-xl font-medium tracking-tight hover:opacity-70 transition-opacity'>
                    <Image src={'/logo.png'} alt='Logo' width={150} height={150} />
                </Link>

                <ul className='flex items-center gap-4 bg-white/40 p-1.5 rounded-full border border-darkgreen/5 backdrop-blur-sm shadow-sm'>
                    <li>
                        <Link href={'/'} className='bg-lightgreen text-darkgreen font-medium rounded-full px-5 py-2.5 hover:scale-[1.02] active:scale-[0.98] transition-all inline-block'>Works</Link>
                    </li>
                    <li>
                        <Link href={'/'} className='rounded-full px-5 py-2.5 hover:bg-darkgreen/5 transition-all inline-block'>About</Link>
                    </li>
                    <li>
                        <Link href={'/'} className='rounded-full px-5 py-2.5 hover:bg-darkgreen/5 transition-all inline-block'>Event</Link>
                    </li>
                    <li>
                        <Link href={'/'} className='rounded-full px-5 py-2.5 hover:bg-darkgreen/5 transition-all inline-block'>Gallery</Link>
                    </li>
                    <li className='ml-2 h-8 w-px bg-darkgreen/10' />
                    <li className='pl-2 pr-4'>
                        <SoundToggle />
                    </li>
                </ul>

                <Link href={'/'} className='border-2 border-darkgreen text-darkgreen font-medium rounded-full px-7 py-2.5 hover:bg-darkgreen hover:text-white hover:shadow-lg hover:shadow-darkgreen/20 transition-all active:scale-95'>Join us</Link>
            </nav>
        </motion.header>
    )
}

export default Header