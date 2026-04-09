'use client'

import React, { useEffect, useRef } from 'react'
import { useSound } from '@/contexts/SoundContext'

const Hero = () => {
    const { isMuted } = useSound()
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
        <main className='px-20 pt-60 pb-32'>
            <section className='flex items-start gap-28 justify-center'>
                <div
                    className="relative w-[700px] h-[550px] border-4 border-white shadow-4xl overflow-hidden"
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

                <div className='flex flex-col gap-5'>
                    <h2 className='font-laybar text-8xl w-lg text-darkgreen'>Relax Tinubu is Fixing Nigeria</h2>
                    <p className='w-120'>Hope is rising, progress is unfolding. Stand with Bola Ahmed Tinubu in 2027 to continue building a stronger, united Nigeria for all — Relax Tinubu Is Fixing Nigeria today.!!!</p>

                    <div className='flex items-center gap-5'>
                        <button className='bg-brown text-black px-12 py-3 rounded-full'>Donate</button>
                        <button className='bg-darkgreen text-milk px-12 py-3 rounded-full'>Volunteer</button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Hero