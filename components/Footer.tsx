import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BannerRight from './BannerRight'

const Footer = () => {
    return (
        <>
            {/* Banner Right */}
            <BannerRight />

            <footer className='bg-white mt-44 mb-20 rounded-b-[100px] p-20'>
                <section className='bg-[url(/footerbg.png)] bg-cover p-24 rounded-4xl flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <h3 className='text-[#FBFFDD] text-3xl w-lg font-medium'>Join the movement shaping Nigeria’s future 🇳🇬✨</h3>
                        <p className='text-lg font-light text-white w-xl mt-5'>Support the Renewed Hope vision of Bola Ahmed Tinubu. Register today and donate to help us reach more communities and build a stronger nation together</p>
                    </div>

                    <div className='flex flex-col gap-3 w-96'>
                        <button className='bg-brown text-black px-10 py-5 rounded-full'>Donation</button>
                        <button className='bg-lightgreen text-black px-10 py-5 rounded-full'>Join RTFI</button>
                    </div>
                </section>

                <section className='pt-14 flex items-start justify-between'>
                    <div className='flex flex-col'>
                        <div className='flex items-center'>
                            <Image src={'/Renewed Hope.jpg'} alt='Renewed Hope Logo' width={100} height={100} />
                            <Image src={'/rtifn.png'} alt='RTIFN Logo' className='-ml-3' width={100} height={100} />
                            <Image src={'/apc.png'} alt='APC Logo' className='ml-3' width={50} height={50} />
                        </div>
                        <p className='text-2xl text-darkgreen text-left font-laybar leading-6 ml-7 -mt-2'>Relax Tinubu is <br /> Fixing Nigeria</p>
                    </div>

                    <div className='flex items-start gap-36 mt-5'>
                        <ul className='flex flex-col font-normal text-sm gap-3'>
                            <Link href={'/'}>Works</Link>
                            <Link href={'/'}>About</Link>
                            <Link href={'/'}>Events</Link>
                            <Link href={'/'}>Gallery</Link>
                        </ul>

                        <ul className='flex flex-col font-normal text-sm gap-3'>
                            <Link href={'https://www.facebook.com/share/1GgzLd85Er/'} target='_blank'>Facebook</Link>
                            <Link href={'https://www.instagram.com/relaxnigeria'} target='_blank'>Instagram</Link>
                            <Link href={'https://x.com/RelaxNigeria'} target='_blank'>Twitter / X</Link>
                            <Link href={'https://www.tiktok.com/@relaxnigeria'} target='_blank'>Tiktok</Link>
                        </ul>

                        <ul className='flex flex-col font-normal text-sm gap-3'>
                            <Link href={'/'}>Contact Us</Link>
                            <Link href={'/'}>WhatsApp us</Link>
                            <Link href={'/'}>support@relaxnigeria.com</Link>
                            <Link href={'/'}>+234 704 256 5521</Link>
                        </ul>
                    </div>

                    <div className='flex flex-col justify-between items-end relative h-[120px] mt-5'>
                        <Image src={'/blueducks.png'} alt='Blueducks Logo' width={100} height={100} />
                        <p className='text-sm text-right'>© {new Date().getFullYear()} RTFIN Enugu Chapter</p>
                    </div>
                </section>
            </footer>
        </>
    )
}

export default Footer