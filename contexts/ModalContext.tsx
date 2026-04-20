'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import JoinUsModal from '@/components/JoinUsModal'

interface ModalContextType {
    isJoinUsModalOpen: boolean
    openJoinUsModal: () => void
    closeJoinUsModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isJoinUsModalOpen, setIsJoinUsModalOpen] = useState(false)

    const openJoinUsModal = () => setIsJoinUsModalOpen(true)
    const closeJoinUsModal = () => setIsJoinUsModalOpen(false)

    return (
        <ModalContext.Provider value={{ isJoinUsModalOpen, openJoinUsModal, closeJoinUsModal }}>
            {children}
            <JoinUsModal isOpen={isJoinUsModalOpen} onClose={closeJoinUsModal} />
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
