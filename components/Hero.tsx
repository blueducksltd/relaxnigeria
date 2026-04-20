'use client'

import React, { useEffect, useRef } from 'react'
import { useSound } from '@/contexts/SoundContext'
import { useModal } from '@/contexts/ModalContext'

const Hero = () => {
    const { isMuted } = useSound()
    const { openJoinUsModal } = useModal()
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        // Sync muted state
        video.muted = isMuted

        if (!isMuted) {
            // Attempt unmuted playback
            const playPromise = video.play()

            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    // Autoplay with sound was blocked. 
                    // Fallback: Play muted so the video is at least visible and playing
                    video.muted = true
                    video.play()

                    console.log("Audio autoplay blocked, playing muted fallback.")

                    const unlockAudio = () => {
                        video.muted = false
                        video.play()
                        window.removeEventListener('click', unlockAudio)
                        window.removeEventListener('touchstart', unlockAudio)
                        window.removeEventListener('keydown', unlockAudio)
                    }

                    window.addEventListener('click', unlockAudio)
                    window.addEventListener('touchstart', unlockAudio)
                    window.addEventListener('keydown', unlockAudio)
                })
            }
        }
    }, [isMuted])

    return (
        <main className='px-6 md:px-20 pt-32 md:pt-60 pb-20 md:pb-32'>
            <section className='flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-28 justify-center'>
                <div
                    className="relative w-full max-w-[700px] aspect-700/550 border-4 border-white shadow-4xl overflow-hidden"
                    style={{
                        WebkitMask: "url('/nigeria2.png') center/contain no-repeat",
                        mask: "url('/nigeria2.png') center/contain no-repeat",
                    }}
                >
                    <video
                        ref={videoRef}
                        src="/vids/president-speech.mp4"
                        poster='/president.png'
                        autoPlay
                        loop
                        playsInline
                        muted={isMuted}
                        className='absolute top-0 left-0 w-full h-full object-cover'
                    />
                </div>

                <div className='flex flex-col gap-5 text-center lg:text-left'>
                    <h2 className='font-laybar text-5xl md:text-8xl lg:w-lg text-darkgreen'>Relax Tinubu is Fixing Nigeria</h2>
                    <p className='md:w-120 mx-auto lg:mx-0 text-sm md:text-base'>Hope is rising, progress is unfolding. Stand with Bola Ahmed Tinubu in 2027 to continue building a stronger, united Nigeria for all — Relax Tinubu Is Fixing Nigeria Enugu Chapter.!!!</p>

                    <div className='flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-5 mt-4'>
                        <button className='bg-brown text-black px-8 md:px-12 py-3 rounded-full hover:scale-105 transition-transform w-full sm:w-auto'>Donate</button>
                        <button onClick={openJoinUsModal} className='bg-darkgreen text-milk px-8 md:px-12 py-3 rounded-full hover:scale-105 transition-transform w-full sm:w-auto'>Volunteer</button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Hero