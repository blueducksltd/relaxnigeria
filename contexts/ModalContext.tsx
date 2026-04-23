'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import JoinUsModal from '@/components/JoinUsModal'
import EventModal from '@/components/EventModal'
import GalleryModal from '@/components/GalleryModal'

interface ModalContextType {
    isJoinUsModalOpen: boolean
    openJoinUsModal: () => void
    closeJoinUsModal: () => void
    isEventModalOpen: boolean
    selectedEvent: any | null
    openEventModal: (event: any) => void
    closeEventModal: () => void
    isGalleryModalOpen: boolean
    selectedGalleryIndex: number
    galleryItems: any[]
    openGalleryModal: (items: any[], index: number) => void
    closeGalleryModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isJoinUsModalOpen, setIsJoinUsModalOpen] = useState(false)
    const [isEventModalOpen, setIsEventModalOpen] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
    const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0)
    const [galleryItems, setGalleryItems] = useState<any[]>([])

    const openJoinUsModal = () => setIsJoinUsModalOpen(true)
    const closeJoinUsModal = () => setIsJoinUsModalOpen(false)

    const openEventModal = (event: any) => {
        setSelectedEvent(event)
        setIsEventModalOpen(true)
    }
    const closeEventModal = () => {
        setIsEventModalOpen(false)
        setTimeout(() => setSelectedEvent(null), 300) // Clear after exit animation
    }

    const openGalleryModal = (items: any[], index: number) => {
        setGalleryItems(items)
        setSelectedGalleryIndex(index)
        setIsGalleryModalOpen(true)
    }
    const closeGalleryModal = () => {
        setIsGalleryModalOpen(false)
        setTimeout(() => {
            setGalleryItems([])
            setSelectedGalleryIndex(0)
        }, 300)
    }

    return (
        <ModalContext.Provider value={{
            isJoinUsModalOpen, openJoinUsModal, closeJoinUsModal,
            isEventModalOpen, selectedEvent, openEventModal, closeEventModal,
            isGalleryModalOpen, selectedGalleryIndex, galleryItems, openGalleryModal, closeGalleryModal
        }}>
            {children}
            <JoinUsModal isOpen={isJoinUsModalOpen} onClose={closeJoinUsModal} />
            <EventModal isOpen={isEventModalOpen} event={selectedEvent} onClose={closeEventModal} />
            <GalleryModal 
                isOpen={isGalleryModalOpen} 
                items={galleryItems} 
                initialIndex={selectedGalleryIndex} 
                onClose={closeGalleryModal} 
            />
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}
