'use client'
import { motion } from 'motion/react'

const Achievements = () => {
    return (
        <main className='px-6 md:px-20 bg-darkgreen py-20 md:py-24 my-10 md:my-20 rounded-[40px] md:rounded-[100px] overflow-hidden'>
            <section className='flex flex-col mb-10 md:mb-16'>
                <h2 className='text-sm md:text-lg text-lightgreen font-normal'>What has this Government done?</h2>
                <p className='font-laybar text-5xl md:text-7xl mt-4 text-milk text-left'>Tinubu&apos;s <br /> Achievements</p>
            </section>

            <section className='flex flex-col lg:flex-row items-center lg:items-end lg:-mt-36 lg:px-10 gap-8 lg:gap-0 pb-10'>
                {/* Card 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='w-full lg:w-[600px] min-h-[350px] lg:h-[350px] bg-[#97DF73] rounded-[32px] md:rounded-[48px] p-8 md:p-12 relative z-10 shadow-3xl flex flex-col justify-between group cursor-pointer'
                >
                    <div>
                        <h3 className='text-5xl md:text-6xl font-black text-darkgreen'>+3.8%</h3>
                        <p className='text-lg md:text-xl font-bold mt-2 uppercase text-darkgreen/70'>GDP Increase</p>
                    </div>
                    <p className='text-base md:text-lg leading-relaxed font-medium text-black md:w-88 mt-6 md:mt-0'>The nation&apos;s economy grew by 3.84% in a quarter, indicating increased production and economic expansion across key sectors.</p>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className='w-full lg:w-[600px] min-h-[400px] lg:h-[550px] bg-[#3EA35D] rounded-[32px] md:rounded-[48px] p-8 md:p-12 relative z-20 lg:-ml-40 shadow-3xl lg:border-l-12 border-darkgreen/20 flex flex-col justify-between group cursor-pointer'
                >
                    <div className='text-black'>
                        <h3 className='text-6xl md:text-7xl font-black'>+66%</h3>
                        <p className='text-lg md:text-xl font-bold mt-2 uppercase opacity-80'>Capital Inflow</p>
                    </div>
                    <p className='text-base md:text-lg leading-relaxed font-medium text-black md:w-88 mt-8 md:mt-0'>A sharp rise in foreign investments, reflecting stronger investor confidence and improved attractiveness under this administration.</p>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className='w-full lg:w-[600px] min-h-[450px] lg:h-[750px] bg-lightgreen rounded-[32px] md:rounded-[48px] p-8 md:p-12 relative z-30 lg:-ml-40 shadow-3xl lg:border-l-12 border-darkgreen/10 flex flex-col justify-between group cursor-pointer'
                >
                    <div>
                        <h3 className='text-7xl md:text-8xl font-black text-darkgreen'>-70%</h3>
                        <p className='text-lg md:text-xl font-bold mt-2 uppercase text-darkgreen/70'>Fuel Importation</p>
                    </div>
                    <p className='text-base md:text-lg text-left leading-relaxed font-medium text-black opacity-90 pb-4 md:pb-10 mt-10 md:mt-0'>Daily fuel imports dropped significantly, showing a shift toward local refining and improved energy self-sufficiency.</p>
                </motion.div>
            </section>
        </main>
    )
}

export default Achievements