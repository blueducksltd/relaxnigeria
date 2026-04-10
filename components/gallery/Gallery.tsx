'use client'
import React from 'react'
import Link from 'next/link'

const gallery = [
    {
        title: 'Enugu RTFIN Mega Rally',
        date: 'Apr 8, 2026',
        time: '10:00 AM',
        image: '/event2.jpg',
    },

    {
        title: 'FCT Women Walk for Tinubu',
        date: 'Apr 8, 2026',
        time: '10:00 AM',
        image: '/event3.jpg',
    },

    {
        title: 'FCT Women Walk for Tinubu',
        date: 'Apr 8, 2026',
        time: '10:00 AM',
        image: '/event2.jpg',
    }
]

const Gallery = () => {
    return (
        <main className='my-20 md:my-44 overflow-hidden'>

            <section className='flex flex-col justify-center items-center mb-12 md:mb-16 gap-6 text-center px-10 md:px-96'>
                <div>
                    <h2 className='text-sm md:text-lg text-black font-medium'>Activities and Moments</h2>
                    <p className='font-laybar text-5xl md:text-7xl mt-2 text-darkgreen'>Our Gallery</p>
                </div>
            </section>

            <section className='px-6 md:px-20 bg-[#FBFFDD] py-20 md:py-24'>
                <section className='flex flex-wrap justify-center gap-10 md:gap-8'>
                    {[...gallery, ...gallery].map((item) => (
                        <div className='flex flex-col group w-max grow'>
                            <div className={`bg-[url(${item.image})] bg-cover bg-center w-full aspect-4/3.5 md:h-[348px] rounded-2xl md:rounded-3xl shadow-md group-hover:shadow-xl group-hover:scale-[1.01] transition-all duration-500`}></div>
                            <div className='mt-6 px-1'>
                                <h3 className='text-xl md:text-2xl font-bold text-black leading-tight'>{item.title}</h3>

                                <div className='flex items-center gap-x-5 text-xs font-black uppercase tracking-widest mt-4 text-darkgreen/40'>
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        Apr 8, 2026
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        10:00 AM
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </section>
        </main>
    )
}

export default Gallery