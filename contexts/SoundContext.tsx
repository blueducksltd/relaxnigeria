'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface SoundContextType {
    isMuted: boolean
    toggleMute: () => void
    showModal: boolean
    setSoundPermission: (granted: boolean) => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export const SoundProvider = ({ children }: { children: ReactNode }) => {
    const [isMuted, setIsMuted] = useState(true)
    const [showModal, setShowModal] = useState(false)

    // Check localStorage on mount
    useEffect(() => {
        const savedPermission = localStorage.getItem('sound-permission')
        if (savedPermission === null) {
            // First time visit, show modal
            setShowModal(true)
        } else {
            // Respect saved preference
            setIsMuted(savedPermission === 'muted')
        }
    }, [])

    const toggleMute = () => {
        const newMuted = !isMuted
        setIsMuted(newMuted)
        localStorage.setItem('sound-permission', newMuted ? 'muted' : 'unmuted')
    }

    const setSoundPermission = (granted: boolean) => {
        setIsMuted(!granted)
        localStorage.setItem('sound-permission', granted ? 'unmuted' : 'muted')
        setShowModal(false)
    }

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, showModal, setSoundPermission }}>
            {children}
        </SoundContext.Provider>
    )
}

export const useSound = () => {
    const context = useContext(SoundContext)
    if (context === undefined) {
        throw new Error('useSound must be used within a SoundProvider')
    }
    return context
}
