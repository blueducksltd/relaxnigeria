'use client'
import React from 'react'
import Link from 'next/link'
import { Calendar, ListFilter, MapPin, Search } from 'lucide-react'

const events = [
    {
        title: 'Enugu RTFIN Mega Rally',
        description: 'Ani Samuel is a Nigerian politician at the State Houses of Assembly level.',
        location: 'Okpara Square, Enugu State',
        date: 'Apr 8, 2026',
        time: '10:00 AM',
        image: '/event3.jpg',
    }
]

const Events = () => {
    const [items, setItems] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [stateFilter, setStateFilter] = React.useState("all");
    const [dateFilter, setDateFilter] = React.useState("");

    const handleClear = () => {
        setSearchTerm("");
        setStatusFilter("all");
        setStateFilter("all");
        setDateFilter("");
    };

    React.useEffect(() => {
        fetch("/api/events")
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch events", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-darkgreen border-t-transparent rounded-full animate-spin"></div>
        </div>
    }

    const displayItems = items.length > 0 ? items : [...events, ...events, ...events];

    const filteredItems = displayItems.filter(event => {
        let matches = true;

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            matches = matches && (
                event.title?.toLowerCase().includes(term) ||
                event.description?.toLowerCase().includes(term) ||
                event.location?.toLowerCase().includes(term)
            );
        }

        if (statusFilter !== 'all') {
            const eventDate = new Date(event.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (statusFilter === 'upcoming') {
                matches = matches && eventDate > today;
            } else if (statusFilter === 'passed') {
                matches = matches && eventDate < today;
            } else if (statusFilter === 'ongoing') {
                matches = matches && eventDate.getTime() === today.getTime();
            }
        }

        if (stateFilter !== 'all') {
            const stateName = stateFilter.replace('_', ' ').toLowerCase();
            matches = matches && event.location?.toLowerCase().includes(stateName);
        }

        if (dateFilter) {
            const eDate = new Date(event.date);
            if (!isNaN(eDate.getTime())) {
                const eYear = eDate.getFullYear();
                const eMonth = String(eDate.getMonth() + 1).padStart(2, '0');
                const eDay = String(eDate.getDate()).padStart(2, '0');
                const eDateLocalStr = `${eYear}-${eMonth}-${eDay}`;
                matches = matches && eDateLocalStr === dateFilter;
            } else {
                matches = false;
            }
        }

        return matches;
    });

    return (
        <main className='my-20 md:my-44 overflow-hidden'>

            <section className='flex flex-col justify-center items-center mb-12 md:mb-16 gap-6 text-center px-10 md:px-96'>
                <div>
                    <h2 className='text-sm md:text-lg text-black font-medium'>Programs to attend</h2>
                    <p className='font-laybar text-5xl md:text-7xl mt-2 text-darkgreen'>Our Events</p>
                </div>

                <div className='bg-white w-full p-5 md:rounded-full rounded-2xl flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x-[1.5px] divide-gray-400 gap-4 md:gap-0'>
                    <div className='flex items-center gap-2 md:pr-4 pt-2 md:pt-0'>
                        <Search className='text-darkgreen' size={15} color='gray' />
                        <input
                            type="text"
                            placeholder='Event title or Keyword'
                            className='w-full outline-none border-none text-sm text-gray-500 bg-transparent'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className='flex items-center gap-2 md:px-6 pt-4 md:pt-0'>
                        <ListFilter className='text-darkgreen' size={15} color='gray' />
                        <select
                            className='w-full outline-none border-none text-sm text-gray-400 bg-transparent'
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="passed">Passed</option>
                        </select>
                    </div>

                    <div className='flex items-center gap-2 md:px-4 pt-4 md:pt-0'>
                        <MapPin className='text-darkgreen' size={15} color='gray' />
                        <select
                            className='w-full outline-none border-none text-sm text-gray-400 bg-transparent'
                            value={stateFilter}
                            onChange={(e) => setStateFilter(e.target.value)}
                        >
                            <option value="all">All States</option>
                            <option value="abia">Abia</option>
                            <option value="adamawa">Adamawa</option>
                            <option value="akwa_ibom">Akwa Ibom</option>
                            <option value="anambra">Anambra</option>
                            <option value="bauchi">Bauchi</option>
                            <option value="bayelsa">Bayelsa</option>
                            <option value="benue">Benue</option>
                            <option value="borno">Borno</option>
                            <option value="cross_river">Cross River</option>
                            <option value="delta">Delta</option>
                            <option value="ebonyi">Ebonyi</option>
                            <option value="edo">Edo</option>
                            <option value="ekiti">Ekiti</option>
                            <option value="enugu">Enugu</option>
                            <option value="gombe">Gombe</option>
                            <option value="imo">Imo</option>
                            <option value="jigawa">Jigawa</option>
                            <option value="kaduna">Kaduna</option>
                            <option value="kano">Kano</option>
                            <option value="katsina">Katsina</option>
                            <option value="kebbi">Kebbi</option>
                            <option value="kogi">Kogi</option>
                            <option value="kwara">Kwara</option>
                            <option value="lagos">Lagos</option>
                            <option value="nasarawa">Nasarawa</option>
                            <option value="niger">Niger</option>
                            <option value="ogun">Ogun</option>
                            <option value="ondo">Ondo</option>
                            <option value="osun">Osun</option>
                            <option value="oyo">Oyo</option>
                            <option value="plateau">Plateau</option>
                            <option value="rivers">Rivers</option>
                            <option value="sokoto">Sokoto</option>
                            <option value="taraba">Taraba</option>
                            <option value="yobe">Yobe</option>
                            <option value="zamfara">Zamfara</option>
                            <option value="abuja">Abuja (FCT)</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className='flex items-center gap-2 md:px-6 pt-4 md:pt-0'>
                        <Calendar className='text-darkgreen' size={15} color='gray' />
                        <input
                            type="date"
                            className='w-full outline-none border-none text-sm text-gray-400 bg-transparent'
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                    </div>

                    <div className='flex items-center gap-2 md:px-6 pt-4 md:pt-0 pb-2 md:pb-0'>
                        <button
                            onClick={handleClear}
                            className='bg-white text-darkgreen rounded-full text-sm text-left md:text-right w-full cursor-pointer duration-500 hover:scale-105 hover:text-red-400 transition-all font-semibold'
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </section>

            <section className='px-6 md:px-20 bg-[#FBFFDD] py-20 md:py-24'>
                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 justify-items-center'>
                    {filteredItems.length > 0 ? filteredItems.map((event, index) => (
                        <div key={event._id || index} className='flex flex-col group grow lg:max-w-full'>
                            <div
                                className="bg-cover bg-center w-full aspect-4/3.5 md:h-[348px] rounded-2xl md:rounded-3xl shadow-md group-hover:shadow-xl group-hover:scale-[1.01] transition-all duration-500"
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
                    )) : (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                            <p className="text-xl text-gray-500 font-medium">No events found matching your criteria.</p>
                            <button onClick={handleClear} className="mt-4 px-6 py-2 bg-darkgreen text-white rounded-full hover:bg-opacity-90 transition-all">Clear Filters</button>
                        </div>
                    )}
                </section>
            </section>
        </main>
    )
}

export default Events