'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Share2, Download, ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';

interface GalleryModalProps {
    isOpen: boolean;
    items: any[];
    initialIndex: number;
    onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, items, initialIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
        }
    }, [isOpen, initialIndex]);

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen || !items || items.length === 0) return;
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentIndex, items]);

    if (!items || items.length === 0) return null;

    const currentItem = items[currentIndex];

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const shareData = {
            title: currentItem.title,
            text: currentItem.description || currentItem.title,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    const handleDownload = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const response = await fetch(currentItem.image);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${currentItem.title.replace(/\s+/g, '-').toLowerCase()}-gallery.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error downloading image:', err);
            window.open(currentItem.image, '_blank');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-400"
                    />

                    {/* Close button - Top Right of screen */}
                    <button
                        onClick={onClose}
                        className="fixed top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full z-402 transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="fixed inset-0 flex items-center justify-center z-401 pointer-events-none">
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-10 pointer-events-auto">

                            {/* Main Slider Area */}
                            <div className="relative w-full max-w-5xl aspect-video md:aspect-video bg-black/20 rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl group">

                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentIndex}
                                        src={currentItem.image}
                                        alt={currentItem.title}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="w-full h-full object-contain"
                                    />
                                </AnimatePresence>

                                {/* Controls Overlay */}
                                <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button
                                        onClick={handlePrev}
                                        className="p-3 md:p-4 bg-white/10 backdrop-blur-md hover:bg-white/30 text-white rounded-full transition-all active:scale-90 border border-white/20"
                                    >
                                        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="p-3 md:p-4 bg-white/10 backdrop-blur-md hover:bg-white/30 text-white rounded-full transition-all active:scale-90 border border-white/20"
                                    >
                                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                                    </button>
                                </div>

                                {/* Top Actions Overlay */}
                                <div className="absolute top-6 right-6 flex items-center gap-3">
                                    <button
                                        onClick={handleShare}
                                        className="p-3 bg-black/40 backdrop-blur-md hover:bg-black/60 text-white rounded-xl transition-all active:scale-90 border border-white/10"
                                        title="Share Image"
                                    >
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleDownload}
                                        className="p-3 bg-black/40 backdrop-blur-md hover:bg-black/60 text-white rounded-xl transition-all active:scale-90 border border-white/10"
                                        title="Download Image"
                                    >
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Counter */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/40 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/10">
                                    {currentIndex + 1} / {items.length}
                                </div>
                            </div>

                            {/* Details Area */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 text-center max-w-3xl"
                            >
                                <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                                    {currentItem.title}
                                </h2>
                                <div className="flex items-center justify-center gap-6 mt-4 text-white/60 text-sm md:text-base">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-darkgreen" />
                                        {new Date(currentItem.createdAt || currentItem.date).toLocaleDateString('en-US', {
                                            month: 'long', day: 'numeric', year: 'numeric'
                                        })}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-darkgreen" />
                                        {currentItem.time || "Recently"}
                                    </div>
                                </div>
                                {currentItem.description && (
                                    <p className="mt-6 text-white/70 leading-relaxed">
                                        {currentItem.description}
                                    </p>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default GalleryModal;
