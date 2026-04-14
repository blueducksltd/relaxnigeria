'use client'
import React, { useRef, useState } from 'react';
import { Download, Shield, Calendar, MapPin, Phone, User, RefreshCw, CheckCircle2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberIDCardProps {
    memberData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        state: string;
        lga: string;
        ward: string;
        votersCard: string;
        memberSince: string;
        memberId: string;
        photo?: string;
    };
}

const MemberIDCard: React.FC<MemberIDCardProps> = ({ memberData }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    // CSS Constants for consistent look
    const colors = {
        primary: '#064e3b', // darkgreen
        secondary: '#059669', // emerald-600
        accent: '#fbbf24', // amber-400
        glass: 'rgba(255, 255, 255, 0.1)',
        glassBorder: 'rgba(255, 255, 255, 0.2)',
    };

    const createSideForDownload = (isBack: boolean) => {
        const div = document.createElement('div');
        div.style.cssText = `
            width: 3.375in;
            height: 2.125in;
            background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
            border-radius: 12px;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            color: white;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
        `;

        // Background Pattern
        const pattern = document.createElement('div');
        pattern.style.cssText = `
            position: absolute;
            inset: 0;
            opacity: 0.1;
            background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0);
            background-size: 15px 15px;
        `;
        div.appendChild(pattern);

        if (!isBack) {
            // Front Side Content
            div.innerHTML = `
                <div style="position: relative; z-index: 10; padding: 16px; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 40px; height: 40px; background: white; border-radius: 8px; padding: 4px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
                                <img src="/RTIFN Logo.jpg" style="width: 100%; height: 100%; object-fit: contain;" />
                            </div>
                            <div>
                                <div style="font-size: 16px; font-weight: 800; letter-spacing: 0.5px;">RELAX NIGERIA</div>
                                <div style="font-size: 9px; opacity: 0.8; letter-spacing: 2px; text-transform: uppercase;">Official Member ID</div>
                            </div>
                        </div>
                        <div style="width: 60px; height: 60px; border: 2px solid ${colors.glassBorder}; border-radius: 10px; overflow: hidden; background: ${colors.glass}; backdrop-filter: blur(4px);">
                            ${memberData.photo ? `<img src="${memberData.photo}" style="width: 100%; height: 100%; object-fit: cover;" />` : `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; opacity: 0.5;">👤</div>`}
                        </div>
                    </div>
                    
                    <div style="margin-top: 8px;">
                        <div style="font-size: 14px; font-weight: 700; color: ${colors.accent}; margin-bottom: 2px;">${memberData.firstName} ${memberData.lastName}</div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 8.5px; opacity: 0.9;">
                            <div>
                                <div style="opacity: 0.6; text-transform: uppercase; font-size: 7px; margin-bottom: 1px;">ID Number</div>
                                <div style="font-family: monospace; font-size: 10px; font-weight: bold;">${memberData.memberId}</div>
                            </div>
                            <div>
                                <div style="opacity: 0.6; text-transform: uppercase; font-size: 7px; margin-bottom: 1px;">Member Since</div>
                                <div>${memberData.memberSince}</div>
                            </div>
                        </div>
                    </div>

                    <div style="margin-top: auto; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; font-size: 8px;">
                        <div style="display: flex; align-items: center; gap: 4px; opacity: 0.8;">
                            <span>📍 ${memberData.ward}, ${memberData.lga}, ${memberData.state}</span>
                        </div>
                        <div style="background: ${colors.accent}; color: ${colors.primary}; font-weight: 800; padding: 2px 8px; border-radius: 100px; text-transform: uppercase; font-size: 7px;">Active Member</div>
                    </div>
                </div>
            `;
        } else {
            // Back Side Content
            div.innerHTML = `
                <div style="position: relative; z-index: 10; padding: 16px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                    <div style="width: 100%; height: 20px; background: rgba(0,0,0,0.3); position: absolute; top: 15px; left: 0;"></div>
                    
                    <div style="background: white; padding: 8px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://relaxnigeria.com" style="width: 70px; height: 70px;" />
                    </div>
                    
                    <div style="font-size: 8px; opacity: 0.8; max-width: 200px;">
                        <p style="margin-bottom: 6px; font-weight: bold;">This card is the property of Relax Nigeria initiative.</p>
                        <p style="font-size: 7px; line-height: 1.3;">Validation of this card can be performed by scanning the QR code above or visiting relaxnigeria.com. If found, please return to the nearest local government branch.</p>
                    </div>

                    <div style="margin-top: 10px; width: 100%; display: flex; justify-content: space-between; align-items: flex-end; font-size: 7px; opacity: 0.6;">
                        <div style="text-align: left;">
                            <div>VIN: ${memberData.votersCard}</div>
                            <div>Phone: ${memberData.phone}</div>
                        </div>
                        <div style="text-align: right; font-style: italic; border-top: 1px solid rgba(255,255,255,0.4); padding-top: 4px; width: 60px;">
                            Signature
                        </div>
                    </div>
                </div>
            `;
        }
        return div;
    };

    const handleDownload = async () => {
        setIsSaving(true);
        try {
            // Generate Canvases
            const frontDiv = createSideForDownload(false);
            document.body.appendChild(frontDiv);
            const frontCanvas = await html2canvas(frontDiv, { scale: 2, backgroundColor: null, useCORS: true });
            document.body.removeChild(frontDiv);

            const backDiv = createSideForDownload(true);
            document.body.appendChild(backDiv);
            const backCanvas = await html2canvas(backDiv, { scale: 2, backgroundColor: null, useCORS: true });
            document.body.removeChild(backDiv);

            const frontData = frontCanvas.toDataURL('image/png');
            const backData = backCanvas.toDataURL('image/png');

            // 1. Save to Cloud (v2: permanent storage)
            try {
                const saveRes = await fetch('/api/save-id-card', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        memberId: memberData.memberId,
                        frontImage: frontData,
                        backImage: backData
                    })
                });
                
                if (!saveRes.ok) {
                    console.error('Failed to save ID card to cloud');
                }
            } catch (saveError) {
                console.error('Error saving to cloud:', saveError);
            }

            // 2. Trigger Downloads
            const downloadLink = (dataUrl: string, suffix: string) => {
                const link = document.createElement('a');
                link.download = `RelaxNigeria-ID-${memberData.memberId}-${suffix}.png`;
                link.href = dataUrl;
                link.click();
            };

            downloadLink(frontData, 'front');
            setTimeout(() => downloadLink(backData, 'back'), 500);

        } catch (error) {
            console.error('Generation failed:', error);
            alert('Failed to generate ID card. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            {/* Perspective Container for Flip */}
            <div className="relative group cursor-pointer" 
                 style={{ perspective: '1000px', width: '3.375in', height: '2.125in' }}
                 onClick={() => setIsFlipped(!isFlipped)}>
                
                <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    style={{ 
                        transformStyle: 'preserve-3d', 
                        width: '100%', 
                        height: '100%',
                        position: 'relative'
                    }}
                >
                    {/* Front Side */}
                    <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#064e3b] via-[#059669] to-[#047857]"
                         style={{ backfaceVisibility: 'hidden', zIndex: isFlipped ? 0 : 2 }}>
                        
                        {/* Mesh Gradient / Orbs */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-400/20 blur-3xl rounded-full" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-400/20 blur-3xl rounded-full" />
                        
                        {/* Background Logo Touch Design */}
                        <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-15 pointer-events-none overflow-hidden">
                            <img src="/rtifn.png" alt="" className="h-full w-full object-contain translate-x-1/4 scale-150 grayscale brightness-200" />
                        </div>

                        {/* Dot Pattern Overlay */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '15px 15px' }} />

                        <div className="relative p-5 h-full flex flex-col justify-between z-10 text-white">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center p-1 shadow-xl">
                                        <img src="/Renewed Hope.jpg" alt="Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-black tracking-tight leading-tight uppercase font-laybar">Relax Nigeria</h3>
                                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/70 font-bold">Official ID</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 bg-white/10 backdrop-blur-md shadow-inner flex items-center justify-center">
                                        {memberData.photo ? (
                                            <img src={memberData.photo} alt="Photo" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-8 h-8 text-white/40" />
                                        )}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1">
                                        <div className="bg-amber-400 text-[#064e3b] p-0.5 rounded-full shadow-lg">
                                            <CheckCircle2 className="w-3 h-3" strokeWidth={3} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-xl font-bold tracking-tight text-amber-400 uppercase">
                                    {memberData.firstName} {memberData.lastName}
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[7px] text-white/50 uppercase font-black">Member ID</p>
                                        <p className="text-xs font-mono font-bold tracking-wider">{memberData.memberId}</p>
                                    </div>
                                    <div>
                                        <p className="text-[7px] text-white/50 uppercase font-black">Joined</p>
                                        <p className="text-xs font-bold">{memberData.memberSince}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[8px] font-bold">
                                <div className="flex items-center gap-1.5 text-white/80 uppercase tracking-wide">
                                    <MapPin className="w-2.5 h-2.5 text-amber-400" />
                                    <span>{memberData.ward}, {memberData.lga}, {memberData.state}</span>
                                </div>
                                <div className="bg-amber-400 px-2 py-0.5 rounded-full text-[#064e3b] uppercase">Member</div>
                            </div>
                        </div>
                    </div>

                    {/* Back Side */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-[#064e3b]"
                         style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', zIndex: isFlipped ? 2 : 0 }}>
                        
                        <div className="absolute top-4 left-0 w-full h-6 bg-black/30" />
                        
                        <div className="h-full p-5 flex flex-col items-center justify-center text-center space-y-3 z-10 relative">
                            <div className="bg-white p-2 rounded-xl shadow-2xl">
                                <img 
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://relaxnigeria.com" 
                                    alt="QR" 
                                    className="w-16 h-16"
                                />
                            </div>
                            
                            <div className="space-y-1">
                                <p className="text-[9px] text-white font-bold opacity-90 uppercase tracking-widest leading-tight">Relax Nigeria Initiative</p>
                                <p className="text-[7px] text-white/60 leading-relaxed max-w-[200px] mx-auto">
                                    This card is issued to the person whose details appear on the front. 
                                    Scan QR code to verify membership status or visit relaxnigeria.com
                                </p>
                            </div>

                            <div className="w-full pt-2 flex justify-between items-end border-t border-white/10 mt-auto">
                                <div className="text-[7px] text-left space-y-0.5 text-white/40 font-mono">
                                    <p>VIN: {memberData.votersCard}</p>
                                    <p>PHN: {memberData.phone}</p>
                                </div>
                                <div className="text-right">
                                    <div className="w-16 border-t border-white/30 h-0 my-1" />
                                    <p className="text-[6px] text-white/30 uppercase italic">Authorized Signature</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Hint */}
            <p className="mt-4 text-[10px] text-darkgreen/40 uppercase font-black tracking-widest flex items-center gap-2 animate-pulse">
                <RefreshCw className="w-3 h-3" />
                Tap card to flip
            </p>

            {/* Actions */}
            <div className="mt-8 flex gap-4 w-full">
                <button
                    onClick={handleDownload}
                    disabled={isSaving}
                    className="flex-1 group relative overflow-hidden bg-darkgreen text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-darkgreen/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                    <span>{isSaving ? 'GENERATING...' : 'DOWNLOAD ID CARD'}</span>
                </button>
            </div>
        </div>
    );
};

export default MemberIDCard;

