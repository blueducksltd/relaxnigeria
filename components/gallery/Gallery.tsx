'use client'
import React from 'react'
import Link from 'next/link'
import { useModal } from '@/contexts/ModalContext'

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
    const { openGalleryModal } = useModal();
    const [items, setItems] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch("/api/gallery")
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch gallery", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-darkgreen border-t-transparent rounded-full animate-spin"></div>
        </div>
    }

    const displayItems = items.length > 0 ? items : gallery;

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
                    {displayItems.map((item, index) => (
                        <div 
                            key={item._id || index} 
                            className='flex flex-col group w-max grow lg:max-w-[500px] cursor-pointer'
                            onClick={() => openGalleryModal(displayItems, index)}
                        >
                            <div
                                className="bg-cover bg-center w-full aspect-4/3.5 md:h-[348px] rounded-2xl md:rounded-3xl shadow-md group-hover:shadow-xl group-hover:scale-[1.01] transition-all duration-500"
                                style={{ backgroundImage: `url(${item.image})` }}
                            ></div>
                            <div className='mt-6 px-1'>
                                <h3 className='text-xl md:text-2xl font-bold text-black leading-tight'>{item.title}</h3>

                                <div className='flex items-center gap-x-5 text-xs font-black uppercase tracking-widest mt-4 text-darkgreen/40'>
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        {new Date(item.createdAt || item.date).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {item.time || "Recently"}
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