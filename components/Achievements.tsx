'use client'
import { motion } from 'motion/react'

const Achievements = () => {
    return (
        <main className='px-20 bg-darkgreen py-24 my-20 rounded-[100px] overflow-hidden'>
            <section className='flex flex-col mb-16'>
                <h2 className='text-lg text-lightgreen'>What has this Government done?</h2>
                <p className='font-laybar text-7xl mt-4 text-milk text-left'>Tinubu&apos;s <br /> Achievements</p>
            </section>

            <section className='flex items-end -mt-36 px-10'>
                {/* Card 1 */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className='w-[600px] h-[350px] bg-[#97DF73] rounded-[48px] p-12 relative z-10 shadow-2xl flex flex-col justify-between group cursor-pointer'
                >
                    <div>
                        <h3 className='text-6xl font-black'>+3.8%</h3>
                        <p className='text-xl font-bold mt-2 uppercase text-darkgreen/70'>GDP Increase</p>
                    </div>
                    <p className='text-lg leading-relaxed font-medium text-black w-88'>The nation&apos;s economy grew by 3.84% in a quarter, indicating increased production and economic expansion across key sectors.</p>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className='w-[600px] h-[550px] bg-[#3EA35D] rounded-[48px] p-12 relative z-20 -ml-40 shadow-2xl border-l-12 border-darkgreen/20 flex flex-col justify-between group cursor-pointer'
                >
                    <div className='text-black'>
                        <h3 className='text-7xl font-black'>+66%</h3>
                        <p className='text-xl font-bold mt-2 uppercase opacity-80'>Capital Inflow</p>
                    </div>
                    <p className='text-lg leading-relaxed font-medium text-black w-88'>A sharp rise in foreign investments, reflecting stronger investor confidence and improved attractiveness under this administration.</p>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className='w-[600px] h-[750px] bg-lightgreen rounded-[48px] p-12 relative z-30 -ml-40 shadow-2xl border-l-12 border-darkgreen/10 flex flex-col justify-between group cursor-pointer'
                >
                    <div>
                        <h3 className='text-8xl font-black'>-70%</h3>
                        <p className='text-lg font-bold mt-2 uppercase text-darkgreen/70'>Fuel Importation</p>
                    </div>
                    <p className='text-lg text-left leading-relaxed font-medium text-black opacity-90 pb-10'>Daily fuel imports dropped significantly, showing a shift toward local refining and improved energy self-sufficiency.</p>
                </motion.div>
            </section>
        </main>
    )
}

export default Achievements