'use client'
import React from 'react'

const Stakeholders = () => {
    return (
        <main className='px-6 md:px-20 bg-darkgreen py-12 md:py-24 my-10 md:my-44 overflow-hidden'>
            <section className='flex flex-col lg:flex-row items-center lg:justify-between gap-10 md:gap-16'>
                <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
                    <h2 className='text-sm md:text-lg text-white'>Enugu State Exco Structure</h2>
                    <p className='font-laybar text-3xl md:text-6xl mt-2 text-[#FBFFDD] leading-tight'>Meet the <br className="hidden md:block" /> Stakeholders</p>
                </div>

                <div className='flex flex-col gap-5 md:gap-8 w-full md:w-auto items-center lg:items-end font-inter'>
                    <div className='flex items-center gap-4 md:gap-8'>
                        <div className='w-14 h-14 md:w-36 md:h-36 bg-[url(/governor.png)] bg-cover rounded-full shrink-0 shadow-lg border-2 border-milk/10'></div>

                        <div className='w-56 md:w-xl h-14 md:h-36 bg-lightgreen rounded-full flex flex-col items-start justify-center pl-4 md:pl-7 shrink-0 shadow-lg'>
                            <p className='font-bold text-[10px] md:text-lg text-black'>Dr. Peter Ndubuisi Mbah</p>
                            <p className='text-[8px] md:text-sm text-black'>Governor of Enugu State</p>
                            <p className='text-[7px] md:text-sm text-black mt-0.5'>RTIFN Patron</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 md:gap-8'>
                        <div className='w-14 h-14 md:w-36 md:h-36 bg-[url(/seyi.png)] bg-cover rounded-full shrink-0 shadow-lg border-2 border-milk/10'></div>

                        <div className='w-56 md:w-xl h-14 md:h-36 bg-lightgreen rounded-full flex flex-col items-start justify-center pl-4 md:pl-7 shrink-0 shadow-lg'>
                            <p className='font-bold text-[10px] md:text-lg text-black'>Oluwaseyi Abiodun Tinubu</p>
                            <p className='text-[8px] md:text-sm text-black'>(Seyi Tinubu)</p>
                            <p className='text-[7px] md:text-sm text-black mt-0.5'>Òkanlòmọ of Yorubaland’</p>
                            <p className='text-[7px] md:text-sm text-black mt-0.5'>Director General RTFIN</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 md:gap-8'>
                        <div className='w-14 h-14 md:w-36 md:h-36 bg-[url(/johnson.png)] bg-cover rounded-full shrink-0 shadow-lg border-2 border-milk/10'></div>

                        <div className='w-56 md:w-xl h-14 md:h-36 bg-lightgreen rounded-full flex flex-col items-start justify-center pl-4 md:pl-7 shrink-0 shadow-lg'>
                            <p className='font-bold text-[10px] md:text-lg text-black'>Dr. Johnson Samuel Ani</p>
                            <p className='text-[8px] md:text-sm text-black'>Majority Leader Enugu</p>
                            <p className='text-[7px] md:text-sm text-black mt-0.5'>RTIFN Enugu Coordinator</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Stakeholders