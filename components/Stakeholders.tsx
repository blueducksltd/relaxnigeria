import React from 'react'

const Stakeholders = () => {
    return (
        <main className='px-20 bg-darkgreen py-24 my-44'>
            <section className='flex items-center justify-between'>
                <div className='text-sm'>
                    <div className='flex items-center gap-5'>
                        <div className='w-36 h-36 bg-[#2E7043] rounded-full'></div>
                        <div className='w-36 h-36 bg-[url(/governor.png)] bg-cover rounded-full'></div>
                        <div className='w-80 h-36 bg-lightgreen rounded-full flex flex-col items-start justify-center col-span-2 pl-7'>
                            <p className='font-medium'>Dr. Peter Ndubuisi Mbah</p>
                            <p>Governor of Enugu State, Nigeria</p>
                            <p className='text-sm'>RTIFN Patron</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 mt-5'>
                        <div className='w-36 h-36 bg-[#50755C] rounded-full'></div>
                        <div className='w-36 h-36 bg-[#2E7043] rounded-full'></div>
                        <div className='w-36 h-36 bg-[#50755C] rounded-full'></div>
                        <div className='w-36 h-36 bg-[#2E7043] rounded-full'></div>
                    </div>

                    <div className='flex items-center gap-5 mt-5'>
                        <div className='w-36 h-36 bg-[url(/seyi.png)] bg-cover rounded-full'></div>
                        <div className='w-80 h-36 bg-lightgreen rounded-full flex flex-col items-start justify-center col-span-2 pl-7'>
                            <p className='font-medium'>Oluwaseyi Abiodun Tinubu.</p>
                            <p>(Seyi Tinubu)</p>
                            <p>Òkanlòmọ of Yorubaland’</p>
                            <p className='text-sm'>Director General RTFIN</p>
                        </div>
                        <div className='w-36 h-36 bg-[#2E7043] rounded-full'></div>
                    </div>

                    <div className='flex items-center gap-5 mt-5'>
                        <div className='w-36 h-36 bg-[#50755C] rounded-full'></div>
                        <div className='w-36 h-36 bg-[url(/johnson.png)] bg-cover rounded-full'></div>
                        <div className='w-80 h-36 bg-lightgreen rounded-full flex flex-col items-start justify-center col-span-2 pl-7'>
                            <p className='font-medium'>Dr. Johnson Samuel Ani</p>
                            <p>Majority Leader Enugu State</p>
                            <p className='text-sm'>RTIFN Enugu Coordinator</p>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-end'>
                    <h2 className='text-lg text-white'>Enugu State Patron</h2>
                    <p className='font-laybar text-6xl mt-2 text-milk text-right'>Meet the <br /> Stakeholders</p>
                </div>
            </section>
        </main>
    )
}

export default Stakeholders