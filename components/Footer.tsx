'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'motion/react'

const items = [
    { id: 1, text: "Vote APC 2027", color: "text-lightgreen" },
    { id: 2, text: "Vote Tinubu 2027.", color: "text-white" },
]

const Footer = () => {
    const duplicatedItems = [...items, ...items, ...items];
    return (
        <main className="">
            {/* Banner Right */}
            <main className='-skew-y-2 md:-skew-y-3 select-none'>
                <section className='w-full py-5 md:py-7 bg-darkgreen flex items-center'>
                    <motion.div
                        className='flex items-center gap-x-5 whitespace-nowrap px-6'
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            ease: "linear",
                            duration: 10,
                            repeat: Infinity,
                        }}
                    >
                        {duplicatedItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-x-5">
                                <p className={`${item.color} text-lg md:text-2xl font-bold uppercase tracking-wider`}>
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </section>
            </main>

            <footer className='bg-white mt-20 md:mt-44 mb-10 md:mb-20 rounded-b-[40px] md:rounded-b-[100px] p-6 md:p-20'>
                <section className='bg-[url(/footerbg.png)] bg-cover p-8 md:p-24 rounded-3xl md:rounded-4xl flex flex-col lg:flex-row justify-between items-center gap-10 md:gap-16'>
                    <div className='flex flex-col text-center lg:text-left'>
                        <h3 className='text-[#FBFFDD] text-2xl md:text-3xl md:max-w-lg font-medium leading-tight'>Join the movement shaping Nigeria’s future 🇳🇬✨</h3>
                        <p className='text-base md:text-lg font-light text-white max-w-xl mt-5'>Support the Renewed Hope vision of Bola Ahmed Tinubu. Register today and donate to help us reach more communities and build a stronger nation together</p>
                    </div>

                    <div className='flex flex-col gap-3 w-full max-w-96'>
                        <button className='bg-brown text-black px-10 py-5 rounded-full font-bold hover:scale-[1.02] transition-all active:scale-95 whitespace-nowrap'>Donation</button>
                        <button className='bg-lightgreen text-black px-10 py-5 rounded-full font-bold hover:scale-[1.02] transition-all active:scale-95 whitespace-nowrap'>Join RTFI</button>
                    </div>
                </section>

                <section className='pt-16 md:pt-20 flex flex-col lg:flex-row md:items-center lg:items-start justify-between gap-12 lg:gap-0'>
                    <div className='flex flex-col items-start'>
                        <div className='flex items-center justify-center lg:justify-start'>
                            <Image src={'/Renewed Hope.jpg'} alt='Renewed Hope Logo' width={80} height={80} className="w-16 md:w-24 h-auto" />
                            <Image src={'/rtifn.png'} alt='RTIFN Logo' className='-ml-3 w-16 md:w-24 h-auto' width={80} height={80} />
                            <Image src={'/apc.png'} alt='APC Logo' className='ml-3 w-10 md:w-12 h-auto' width={40} height={40} />
                        </div>
                        <p className='text-xl md:text-2xl text-darkgreen text-left font-laybar leading-tight mt-4 lg:ml-7'>Relax Tinubu is <br /> Fixing Nigeria</p>
                    </div>

                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-20 lg:gap-36 mt-5 px-4 md:px-0'>
                        <ul className='flex flex-col font-normal text-sm gap-4'>
                            {/* <li className='font-bold uppercase tracking-widest text-[10px] opacity-40 mb-2'>Navigation</li> */}
                            <li><Link href={'/'} className="hover:text-darkgreen transition-colors">Works</Link></li>
                            <li><Link href={'/'} className="hover:text-darkgreen transition-colors">About</Link></li>
                            <li><Link href={'/'} className="hover:text-darkgreen transition-colors">Events</Link></li>
                            <li><Link href={'/'} className="hover:text-darkgreen transition-colors">Gallery</Link></li>
                        </ul>

                        <ul className='flex flex-col font-normal text-sm gap-4'>
                            {/* <li className='font-bold uppercase tracking-widest text-[10px] opacity-40 mb-2'>Social Connect</li> */}
                            <li><Link href={'https://www.facebook.com/share/1GgzLd85Er/'} target='_blank' className="hover:text-darkgreen transition-colors">Facebook</Link></li>
                            <li><Link href={'https://www.instagram.com/rtifn_enugu/'} target='_blank' className="hover:text-darkgreen transition-colors">Instagram</Link></li>
                            <li><Link href={'https://x.com/RelaxNigeria'} target='_blank' className="hover:text-darkgreen transition-colors">Twitter / X</Link></li>
                            <li><Link href={'https://www.tiktok.com/@relaxnigeria'} target='_blank' className="hover:text-darkgreen transition-colors">Tiktok</Link></li>
                        </ul>

                        <ul className='flex flex-col font-normal text-sm gap-4 col-span-2 sm:col-span-1'>
                            {/* <li className='font-bold uppercase tracking-widest text-[10px] opacity-40 mb-2'>Contact Support</li> */}
                            <li><Link href={'/'} className="hover:text-darkgreen transition-colors">Contact Us</Link></li>
                            <li><Link href={'/'} className="hover:text-darkgreen transition-colors">WhatsApp us</Link></li>
                            <li><Link href={'/'} className="hover:text-darkgreen transition-colors truncate block max-w-[200px]">support@relaxnigeria.com</Link></li>
                            <li><Link href={'/'} className="hover:text-darkgreen transition-colors">+234 704 256 5521</Link></li>
                        </ul>
                    </div>

                    <div className='flex flex-col justify-between md:items-center lg:items-end relative h-auto lg:min-h-[140px] mt-12 lg:mt-5 gap-8 lg:gap-4'>
                        <Link href={'https://blueducksltd.com'} target='_blank'>
                            <Image src={'/blueducks.png'} alt='Blueducks Logo' width={100} height={100} className="w-24 md:w-28 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                        </Link>
                        <p className='text-[10px] md:text-sm text-center lg:text-right opacity-50 px-6 lg:px-0'>© {new Date().getFullYear()} RTFIN Enugu Chapter.</p>
                    </div>
                </section>
            </footer>
        </main>
    )
}

export default Footer