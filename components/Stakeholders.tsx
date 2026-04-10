'use client'
import React from 'react'

const Stakeholders = () => {
    return (
        <main className='px-6 md:px-20 bg-darkgreen py-20 md:py-24 my-20 md:my-44 overflow-hidden'>
            <section className='flex flex-col lg:flex-row items-center justify-between gap-12'>
                {/* Header Section */}
                <div className='flex flex-col items-center lg:items-end lg:order-last text-center lg:text-right'>
                    <h2 className='text-sm md:text-lg text-white'>Enugu State Patron</h2>
                    <p className='font-laybar text-4xl md:text-6xl mt-2 text-[#FBFFDD] leading-tight'>Meet the <br className="hidden md:block" /> Stakeholders</p>
                </div>

                {/* Bubble Layout Wrapper */}
                <div className='w-full max-w-4xl overflow-x-auto lg:overflow-visible pb-8 lg:pb-0 scrollbar-hide'>
                    <div className='flex flex-col items-start justify-center md:justify-start md:items-center gap-4 md:gap-5 min-w-[320px]'>
                        {/* Row 1 */}
                        <div className='flex items-center gap-3 md:gap-5 justify-center lg:justify-start'>
                            <div className='w-14 h-14 md:w-36 md:h-36 bg-[#2E7043] rounded-full shrink-0'></div>
                            <div className='w-14 h-14 md:w-36 md:h-36 bg-[url(/governor.png)] bg-cover rounded-full shrink-0 shadow-lg border-2 border-milk/10'></div>
                            <div className='w-40 md:w-80 h-14 md:h-36 bg-lightgreen rounded-full flex flex-col items-start justify-center pl-4 md:pl-7 shrink-0 shadow-lg'>
                                <p className='font-medium text-[10px] md:text-lg text-black'>Dr. Peter Ndubuisi Mbah</p>
                                <p className='text-[8px] md:text-sm text-black'>Governor of Enugu State</p>
                                <p className='text-[7px] md:text-sm text-black mt-0.5'>RTIFN Patron</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-3 md:gap-5 justify-center lg:justify-start'>
                            <div className='w-40 md:w-80 h-14 md:h-36 bg-lightgreen rounded-full flex flex-col items-end justify-center pr-4 md:pr-7 shrink-0 shadow-lg'>
                                <p className='font-medium text-[10px] md:text-lg text-black'>Hon. Ahmed Bala</p>
                                <p className='text-[8px] md:text-sm text-black'>Director General RTFIN</p>
                            </div>
                            <div className='w-14 h-14 md:w-36 md:h-36 bg-[url(/bala.png)] bg-cover rounded-full shrink-0 shadow-lg border-2 border-milk/10'></div>
                            <div className='w-14 h-14 md:w-36 md:h-36 bg-[#2E7043] rounded-full shrink-0'></div>
                        </div>

                        {/* Row 3 */}
                        <div className='flex items-center gap-3 md:gap-5 justify-center lg:justify-start'>
                            <div className='w-14 h-14 md:w-36 md:h-36 bg-[url(/seyi.png)] bg-cover rounded-full shrink-0 shadow-lg border-2 border-milk/10'></div>
                            <div className='w-40 md:w-80 h-14 md:h-36 bg-lightgreen rounded-full flex flex-col items-start justify-center pl-4 md:pl-7 shrink-0 shadow-lg'>
                                <p className='font-medium text-[10px] md:text-lg text-black'>Oluwaseyi Abiodun Tinubu</p>
                                <p className='text-[8px] md:text-sm text-black'>(Seyi Tinubu)</p>
                                <p className='text-[7px] md:text-sm text-black mt-0.5'>Founder-in-Chief RTFIN</p>
                            </div>
                            <div className='w-14 h-14 md:w-36 md:h-36 bg-[#2E7043] rounded-full shrink-0'></div>
                        </div>

                        {/* Row 4 */}
                        <div className='flex items-center gap-3 md:gap-5 justify-center lg:justify-start'>
                            <div className='w-14 h-14 md:w-36 md:h-36 bg-[#50755C] rounded-full shrink-0'></div>
                            <div className='w-14 h-14 md:w-36 md:h-36 bg-[url(/johnson.png)] bg-cover rounded-full shrink-0 shadow-lg border-2 border-milk/10'></div>
                            <div className='w-40 md:w-80 h-14 md:h-36 bg-lightgreen rounded-full flex flex-col items-start justify-center pl-4 md:pl-7 shrink-0 shadow-lg'>
                                <p className='font-medium text-[10px] md:text-lg text-black'>Dr. Johnson Samuel Ani</p>
                                <p className='text-[8px] md:text-sm text-black'>Majority Leader Enugu</p>
                                <p className='text-[7px] md:text-sm text-black mt-0.5'>RTIFN Enugu Coordinator</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Stakeholders