import BannerRight from '@/components/BannerRight'
import Events from '@/components/events/Events'

const Page = () => {
    return (
        <main className='w-full'>
            <section className='pt-32 md:pt-56'>
                <BannerRight />
            </section>

            <Events />
        </main>
    )
}

export default Page