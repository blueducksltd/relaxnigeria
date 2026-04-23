'use client'
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Share2, Download, Calendar, MapPin, Clock } from 'lucide-react';

interface EventModalProps {
    isOpen: boolean;
    event: any | null;
    onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, event, onClose }) => {
    if (!event) return null;

    const handleShare = async () => {
        const shareData = {
            title: event.title,
            text: event.description,
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

    const handleDownload = async () => {
        try {
            const response = await fetch(event.image);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${event.title.replace(/\s+/g, '-').toLowerCase()}-image.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error downloading image:', err);
            // Fallback: open image in new tab
            window.open(event.image, '_blank');
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
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-300"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] md:w-full max-w-4xl bg-white rounded-3xl shadow-2xl z-301 overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
                    >
                        {/* Image Section */}
                        <div className="relative w-full md:w-1/2 h-[300px] md:h-auto overflow-hidden">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Action Buttons Overlay - Top Right of Image */}
                            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleShare(); }}
                                    className="p-2.5 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full transition-all active:scale-90 border border-white/30"
                                    title="Share Event"
                                >
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDownload(); }}
                                    className="p-2.5 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full transition-all active:scale-90 border border-white/30"
                                    title="Download Image"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                                    className="p-2.5 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full transition-all active:scale-90 border border-white/30"
                                    title="Close"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent md:hidden" />
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col bg-[#FBFFDD] overflow-y-auto">
                            <div className="mb-6">
                                <span className="px-3 py-1 bg-darkgreen/10 text-darkgreen text-xs font-bold rounded-full uppercase tracking-wider">
                                    Event Details
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-black mt-4 leading-tight">
                                    {event.title}
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm text-darkgreen">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-black/40 uppercase tracking-widest">Date</p>
                                        <p className="text-lg font-semibold text-black">
                                            {new Date(event.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm text-darkgreen">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-black/40 uppercase tracking-widest">Time</p>
                                        <p className="text-lg font-semibold text-black">{event.time || "10:00 AM"}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm text-darkgreen">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-black/40 uppercase tracking-widest">Location</p>
                                        <p className="text-lg font-semibold text-black">{event.location || "Online / Nationwide"}</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-darkgreen/10">
                                    <p className="text-xs font-bold text-black/40 uppercase tracking-widest mb-3">About this event</p>
                                    <p className="text-black/70 leading-relaxed text-lg whitespace-pre-line">
                                        {event.description}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-auto pt-10">
                                <button
                                    onClick={onClose}
                                    className="w-full py-4 bg-darkgreen text-white font-bold rounded-2xl shadow-lg hover:shadow-darkgreen/30 hover:-translate-y-0.5 transition-all active:scale-95"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EventModal;
