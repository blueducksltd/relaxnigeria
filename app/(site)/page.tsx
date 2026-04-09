import Achievements from '@/components/Achievements'
import BannerLeft from '@/components/BannerLeft'
import BannerRight from '@/components/BannerRight'
import Events from '@/components/Events'
import Hero from '@/components/Hero'
import Stakeholders from '@/components/Stakeholders'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const promises = [
  {
    title: 'Stabilising the Economy',
    promise: 'Transform Nigeria&apos;s economy into a stable, growth-oriented system.',
    achievement: 'External foreign reserves surged from about $3.99 billion in 2023 to over $23 billion by end of 2024, strengthening Nigeria&apos;s cash buffer and investor confidence. Over $50 billion in new FDI commitments were unlocked alongside $8 billion in oil and gas investments. GDP growth hit around 3.8%-4.2%, with the World Bank projecting continued growth in 2026.',
  },

  {
    title: 'Fiscal Reform & Sustainability',
    promise: 'Remove wasteful subsidies and streamline fiscal policy.',
    achievement: 'The long‑standing fuel subsidy was completely removed, enabling reallocation of funds into priority sectors. Fiscal discipline also tightened: the fiscal deficit narrowed sharply from ~5.4% of GDP in 2023 to about 3.0% in 2024, and government revenue increased, including over N6 trillion in revenue in a single quarter.',
  },

  {
    title: 'Economic Diversification & Non‑Oil Growth',
    promise: 'Broaden Nigeria’s revenue beyond oil.',
    achievement: 'Non‑oil revenues hit record levels, surpassing N20 trillion in 2025, with trade surplus rising by 44.3%, signalling expanding manufacturing and non‑oil export strength.',
  },

  {
    title: 'Infrastructure & Investment',
    promise: 'Build modern infrastructure to connect markets and spur development.',
    achievement: 'More than 440 major road projects are underway across Nigeria, including over 2,700 km of superhighways, and gas processing plants were inaugurated, boosting domestic energy capacity — clear signs of capital investment in national growth.',
  },

  {
    title: 'Support for Youth & Education',
    promise: 'Empower students and young Nigerians with opportunities.',
    achievement: 'Over 900,000 Nigerians have benefited from presidential loans and grants, and 300,000 students accessed student loan support to pursue higher education, laying a foundation for long‑term skills and entrepreneurship growth.',
  },

  {
    title: 'National Pride & Recognition',
    promise: 'Celebrate and reward national achievers.',
    achievement: 'Sports teams like D’Tigress and Super Eagles received promised houses, cash rewards, and national honours, inspiring national unity and pride.',
  },
]

const page = () => {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <BannerRight />

      {/* Regime */}
      <section className='pt-20 md:pt-24 text-center px-6 md:px-20'>
        <h2 className='text-base md:text-lg opacity-70'>The government we trust </h2>
        <p className='font-laybar text-4xl md:text-6xl mt-2 text-darkgreen'>The regime we <br className="hidden md:block" /> love</p>

        <div className='flex flex-col lg:flex-row gap-5 lg:gap-8 items-center lg:items-end justify-center mt-10'>
          <div className='w-full max-w-[401px] aspect-401/600 bg-lightgreen rounded-[40px] md:rounded-[56px] bg-[url(/president2.jpg)] bg-center bg-cover shadow-xl'></div>
          <div className='w-full max-w-[600px] aspect-600/500 bg-lightgreen rounded-[40px] md:rounded-[56px] bg-[url(/leaders.png)] bg-center bg-cover shadow-xl'></div>
          <div className='w-full max-w-[401px] aspect-401/600 bg-lightgreen rounded-[40px] md:rounded-[56px] bg-[url(/vice.png)] bg-center bg-cover shadow-xl'></div>
        </div>
      </section>

      {/* Relax */}
      <section className='flex flex-col items-center justify-center py-20 px-6'>
        <Image src={'/rtifn.png'} alt='Relax Logo' width={350} height={350} className="w-48 md:w-[350px] h-auto" />
        <p className='text-xl md:text-5xl text-center max-w-220 md:-mt-12 leading-snug md:leading-14 font-light text-darkgreen/90'>Relax Tinubu Is Fixing Nigeria (RTIFN) is a grassroots group advancing the <span className='text-darkgreen font-bold'>Renewed Hope Agenda</span>. We mobilize communities to champion the vision of <span className='font-bold text-black'>President Bola Ahmed Tinubu</span></p>
      </section>

      {/* Achievements */}
      <Achievements />

      {/* Promises */}
      <section className='pt-10 md:pt-5 text-center px-6 md:px-20'>
        <h2 className='text-base md:text-lg opacity-70'>Campaign Promises &</h2>
        <p className='font-laybar text-4xl md:text-6xl mt-2 text-darkgreen'>Tinubu&apos;s Fulfilment</p>

        <div className='grid grid-cols-1 md:grid-cols-2 py-12 md:py-20 gap-6 md:gap-7'>
          {promises.map((item, index) => (
            <div className='bg-white p-7 md:p-10 rounded-3xl md:rounded-4xl border border-darkgreen/5 shadow-sm' key={index}>
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4'>
                <p className='text-lg font-bold text-black text-left'>{index + 1}. {item.title}</p>
                <Link href={'/'} className='border border-darkgreen text-darkgreen rounded-full px-5 py-1.5 hover:bg-darkgreen hover:text-white transition-all text-xs font-semibold whitespace-nowrap'>Read more</Link>
              </div>
              <p className='text-left mt-2 leading-relaxed'><span className='font-bold'>Promise:</span> {item.promise}</p>
              <hr className='border-darkgreen/10 my-5' />
              <p className='text-left leading-relaxed'><span className='font-bold'>Achievement:</span> {item.achievement}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stakeholders */}
      <Stakeholders />

      {/* Banner Left */}
      <BannerLeft />

      {/* Events */}
      <Events />
    </main>
  )
}

export default page
