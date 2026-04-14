'use client'
import React from 'react'
import Link from 'next/link'

const Events = () => {
    const [events, setEvents] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch("/api/events")
            .then(res => res.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch events", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="py-20 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-darkgreen border-t-transparent rounded-full animate-spin"></div>
        </div>
    }

    return (
        <main className='px-6 md:px-20 bg-[#FBFFDD] py-20 md:py-24 my-20 md:my-44 rounded-[40px] md:rounded-[100px] overflow-hidden'>
            <section className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 md:mb-16 gap-6'>
                <div>
                    <h2 className='text-sm md:text-lg text-black font-medium'>Programs to attend</h2>
                    <p className='font-laybar text-5xl md:text-7xl mt-2 text-darkgreen'>Our Events</p>
                </div>

                <Link href={'/events'} className='border-2 border-darkgreen text-darkgreen font-bold rounded-full px-8 py-2.5 hover:bg-darkgreen hover:text-white transition-all text-sm active:scale-95 shadow-sm'>
                    See all events
                </Link>
            </section>

            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8'>
                {events.map((event, index) => (
                    <div key={event._id || index} className='flex flex-col group grow'>
                        <div 
                            className='bg-cover bg-center w-full aspect-4/3.5 md:h-[348px] rounded-2xl md:rounded-3xl shadow-md group-hover:shadow-xl group-hover:scale-[1.01] transition-all duration-500'
                            style={{ backgroundImage: `url(${event.image})` }}
                        ></div>
                        <div className='mt-6 px-1'>
                            <h3 className='text-xl md:text-2xl font-bold text-black leading-tight'>{event.title}</h3>
                            <p className='text-sm mt-3 text-black/70 line-clamp-2 leading-relaxed'>{event.description}</p>
                            <p className='mt-4 text-sm font-semibold text-black flex items-center gap-2'>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                {event.location || "Online / Nationwide"}
                            </p>

                            <div className='flex items-center gap-x-5 text-xs font-black uppercase tracking-widest mt-4 text-darkgreen/40'>
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    {new Date(event.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {event.time || "TBA"}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    )
}

export default Events