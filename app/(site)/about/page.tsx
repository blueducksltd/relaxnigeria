import Stakeholders from '@/components/about/Stakeholders'
import BannerRight from '@/components/BannerRight'
import Image from 'next/image'
import React from 'react'

const items = [
    {
        title: 'Our Vision',
        content: 'External foreign reserves surged from about $3.99 billion in 2023 to over $23 billion by end of 2024, strengthening Nigeria’s cash buffer and investor confidence. Over $50 billion in new FDI commitments were unlocked alongside $8 billion in oil and gas investments. GDP growth hit around 3.8%–4.2%, with the World Bank projecting continued growth in 2026.'
    },

    {
        title: 'Our Mission',
        content: 'External foreign reserves surged from about $3.99 billion in 2023 to over $23 billion by end of 2024, strengthening Nigeria’s cash buffer and investor confidence. Over $50 billion in new FDI commitments were unlocked alongside $8 billion in oil and gas investments. GDP growth hit around 3.8%–4.2%, with the World Bank projecting continued growth in 2026.'
    }
]

const About = () => {
    return (
        <main className='w-full'>
            <section className='pt-32 md:pt-56'>
                <BannerRight />
            </section>

            <section className='px-6 md:px-20 py-16 md:py-44 flex flex-col lg:flex-row justify-center gap-10 items-center'>
                <p className='text-left text-xl md:text-3xl w-full lg:w-200 leading-relaxed md:leading-12'>
                    <span className='font-medium'>Relax Tinubu Is Fixing Nigeria (RTIFN)</span> is a grassroots movement formed to promote the <span className='font-medium text-darkgreen'>Renewed Hope agenda</span> of Bola Ahmed Tinubu. Born from the need to mobilize communities and amplify positive engagement, RTIFN works alongside allied groups to educate citizens, highlight achievements, and encourage active participation in building a <span className='font-medium'>stronger Nigeria.</span>
                </p>

                <div className='flex flex-col items-center'>
                    <Image src={'/hope.png'} alt='about' width={450} height={450} className='w-full max-w-[300px] md:w-[450px] h-auto' />
                    <Image src={'/rtifn.png'} alt='about' width={450} height={450} className='-mt-32 md:-mt-32 w-full max-w-[300px] md:w-[450px] h-auto' />
                </div>
            </section>

            <section className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 px-6 md:px-20'>
                {items.map((item, index) => (
                    <div className='bg-white p-7 md:p-10 rounded-3xl md:rounded-4xl border border-darkgreen/5' key={index}>
                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4'>
                            <p className='text-lg font-bold text-black text-left'>{index + 1}. {item.title}</p>
                        </div>
                        <hr className='border-darkgreen/10 my-5 w-full' />
                        <p className='text-left mt-2 leading-relaxed'>{item.content}</p>
                    </div>
                ))}
            </section>

            {/* Stakeholders */}
            <Stakeholders />
        </main>
    )
}

export default About