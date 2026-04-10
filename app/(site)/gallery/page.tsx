import BannerRight from '@/components/BannerRight'
import Gallery from '@/components/gallery/Gallery'

const Page = () => {
    return (
        <main className='w-full'>
            <section className='pt-32 md:pt-56'>
                <BannerRight />
            </section>

            <Gallery />
        </main>
    )
}

export default Page