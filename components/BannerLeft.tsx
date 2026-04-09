'use client'
import React from 'react'
import { motion } from 'motion/react'

const items = [
    { id: 1, text: "Vote APC 2027", color: "text-lightgreen" },
    { id: 2, text: "Vote Tinubu 2027.", color: "text-white" },
]

const BannerLeft = () => {
    // Duplicate items to create a seamless loop
    const duplicatedItems = [...items, ...items, ...items, ...items, ...items, ...items, ...items];

    return (
        <main className='skew-y-3 select-none'>
            <section className='w-full py-7 bg-darkgreen flex items-center overflow-hidden'>
                <motion.div
                    className='flex items-center gap-x-5 whitespace-nowrap px-6'
                    animate={{ x: ["0%", "50%"] }}
                    transition={{
                        ease: "linear",
                        duration: 10,
                        repeat: Infinity,
                    }}
                >
                    {duplicatedItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-x-5">
                            <p className={`${item.color} text-2xl font-bold uppercase tracking-wider`}>
                                {item.text}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </section>
        </main>
    )
}

export default BannerLeft