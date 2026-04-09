'use client'
import { motion } from 'motion/react'
import Link from 'next/link'

const Events = () => {
    return (
        <main className='px-20 bg-[#FBFFDD] py-24 my-44 rounded-[100px] overflow-hidden'>
            <section className='flex justify-between items-center mb-16'>
                <div>
                    <h2 className='text-lg text-black'>Programs to attend</h2>
                    <p className='font-laybar text-7xl mt-4 text-darkgreen text-left'>Our Events</p>
                </div>

                <Link href={'/'} className='border border-darkgreen text-darkgreen rounded-full px-3 py-1'>See all events</Link>
            </section>

            <section className='grid grid-cols-3 gap-5'>
                <div className=''>
                    <div className='bg-[url(/event.png)] bg-cover w-full h-[348px] rounded-2xl'></div>
                    <h3 className='mt-4 font-medium'>Enugu RTFIN Mega Rally</h3>
                    <p className='text-sm line-clamp-2'>Ani Samuel is a Nigerian politician at the State Houses of Assembly level.</p>
                    <p className='mt-2 text-sm'>Okpara Square, Enugu State</p>

                    <div className='flex items-center gap-x-5 text-sm mt-1'>
                        <p>Apr 8, 2026</p>
                        <p>10:00 AM</p>
                    </div>
                </div>

                <div className=''>
                    <div className='bg-[url(/event2.jpg)] bg-cover w-full h-[348px] rounded-2xl'></div>
                    <h3 className='mt-4 font-medium'>Enugu RTFIN Mega Rally</h3>
                    <p className='text-sm line-clamp-2'>Ani Samuel is a Nigerian politician at the State Houses of Assembly level.</p>
                    <p className='mt-2 text-sm'>Okpara Square, Enugu State</p>

                    <div className='flex items-center gap-x-5 text-sm mt-1'>
                        <p>Apr 8, 2026</p>
                        <p>10:00 AM</p>
                    </div>
                </div>

                <div className=''>
                    <div className='bg-[url(/event3.jpg)] bg-cover w-full h-[348px] rounded-2xl'></div>
                    <h3 className='mt-4 font-medium'>Enugu RTFIN Mega Rally</h3>
                    <p className='text-sm line-clamp-2'>Ani Samuel is a Nigerian politician at the State Houses of Assembly level.</p>
                    <p className='mt-2 text-sm'>Okpara Square, Enugu State</p>

                    <div className='flex items-center gap-x-5 text-sm mt-1'>
                        <p>Apr 8, 2026</p>
                        <p>10:00 AM</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Events