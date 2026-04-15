'use client'
import React, { useRef, useState } from 'react';
import { Download, Shield, Calendar, MapPin, Phone, User, RefreshCw, CheckCircle2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
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
            position: fixed;
            top: -9999px;
            left: -9999px;
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
                                <div style="width: 100%; height: 100%; background-image: url('/Renewed Hope.jpg'); background-size: contain; background-repeat: no-repeat; background-position: center;"></div>
                            </div>
                            <div>
                                <div style="font-size: 16px; font-weight: 800; letter-spacing: 0.5px;">RELAX NIGERIA</div>
                                <div style="font-size: 9px; opacity: 0.8; letter-spacing: 2px; text-transform: uppercase;">Official Member ID</div>
                            </div>
                        </div>
                        <div style="width: 60px; height: 60px; border: 2px solid ${colors.glassBorder}; border-radius: 10px; overflow: hidden; background: ${colors.glass}; backdrop-filter: blur(4px);">
                            ${memberData.photo ? `<div style="width: 100%; height: 100%; background-image: url('${memberData.photo}'); background-size: cover; background-position: center;"></div>` : `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; opacity: 0.5;">👤</div>`}
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
                        <div style="background: ${colors.accent}; color: ${colors.primary}; font-weight: 900; height: 14px; padding: 0 10px; border-radius: 100px; display: flex; align-items: center; justify-content: center; text-transform: uppercase; font-size: 6.5px; line-height: 1;">Active Member</div>
                    </div>
                </div>
            `;
        } else {
            // Back Side Content
            div.innerHTML = `
                <div style="position: relative; z-index: 10; padding: 16px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                    <div style="width: 100%; height: 20px; background: rgba(0,0,0,0.3); position: absolute; top: 15px; left: 0;"></div>
                    
                    <div style="background: white; padding: 8px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <div style="width: 70px; height: 70px; background-image: url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://relaxnigeria.com'); background-size: contain; background-repeat: no-repeat; background-position: center;"></div>
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

    const handleDownloadPDF = async () => {
        setIsSaving(true);
        try {
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [85.6, 53.98],
                compress: true
            });

            // --- FRONT SIDE ---
            // Background
            doc.setFillColor(6, 78, 59); // primary #064e3b
            doc.rect(0, 0, 85.6, 53.98, 'F');
            
            // Orbs/Gradients simulation
            doc.setFillColor(5, 150, 105); // secondary #059669
            doc.circle(85.6, 0, 45, 'F');
            doc.setFillColor(251, 191, 36); // accent #fbbf24
            doc.setGState(new (doc as any).GState({ opacity: 0.15 }));
            doc.circle(0, 53.98, 35, 'F');
            doc.setGState(new (doc as any).GState({ opacity: 1.0 }));

            // Logo Section
            try {
                const logoImg = new Image();
                logoImg.src = '/Renewed Hope.jpg';
                await new Promise((resolve) => { logoImg.onload = resolve; });
                doc.setFillColor(255, 255, 255);
                doc.roundedRect(6, 6, 14, 14, 3, 3, 'F');
                doc.addImage(logoImg, 'JPEG', 6.5, 6.5, 13, 13, undefined, 'FAST');
            } catch (e) { console.error('Logo failed', e); }

            // Title Header
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.text('RELAX NIGERIA', 22, 11);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(200, 200, 200);
            doc.text('OFFICIAL MEMBERSHIP ID', 22, 15);

            // Member Photo (Larger & Clearer)
            if (memberData.photo) {
                doc.setFillColor(255, 255, 255, 0.2);
                doc.roundedRect(60, 6, 20, 20, 2, 2, 'F');
                doc.addImage(memberData.photo, 'JPEG', 60.5, 6.5, 19, 19, undefined, 'MEDIUM');
            }

            // Member Name (Gold & Prominent)
            doc.setTextColor(251, 191, 36); // accent
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(`${memberData.firstName} ${memberData.lastName}`.toUpperCase(), 6, 32);

            // ID Details Grid
            doc.setTextColor(200, 200, 200);
            doc.setFontSize(7);
            doc.text('MEMBER ID', 6, 39);
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(9);
            doc.text(memberData.memberId, 6, 43);

            doc.setTextColor(200, 200, 200);
            doc.setFontSize(7);
            doc.text('JOINED', 35, 39);
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(9);
            doc.text(memberData.memberSince, 35, 43);

            // Location Footer
            doc.setDrawColor(255, 255, 255, 0.15);
            doc.line(6, 46, 80, 46);
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(7);
            doc.text(`\u2022 ${memberData.ward}, ${memberData.lga}, ${memberData.state}`.toUpperCase(), 6, 50);
            
            // Member Badge
            doc.setFillColor(251, 191, 36);
            doc.roundedRect(66, 47, 14, 4, 1, 1, 'F');
            doc.setTextColor(6, 78, 59);
            doc.setFontSize(6);
            doc.setFont('helvetica', 'bold');
            doc.text('MEMBER', 69.5, 50);

            // --- BACK SIDE ---
            doc.addPage([85.6, 53.98], 'landscape');
            doc.setFillColor(6, 78, 59);
            doc.rect(0, 0, 85.6, 53.98, 'F');
            
            // Magnetic stripe simulation
            doc.setFillColor(0, 0, 0, 0.4);
            doc.rect(0, 5, 85.6, 9, 'F');

            // QR Code (Centered & Balanced)
            try {
                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://relaxnigeria.com/verify/${memberData.memberId}`;
                const qrImg = new Image();
                qrImg.crossOrigin = "Anonymous";
                qrImg.src = qrUrl;
                await new Promise((resolve) => { qrImg.onload = resolve; });
                doc.setFillColor(255, 255, 255);
                doc.roundedRect(31, 18, 24, 24, 2, 2, 'F');
                doc.addImage(qrImg, 'PNG', 33, 20, 20, 20);
            } catch (e) { console.error('QR failed', e); }

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.text('RELAX NIGERIA INITIATIVE', 42.8, 44, { align: 'center' });
            doc.setFontSize(6);
            doc.setTextColor(200, 200, 200);
            doc.setFont('helvetica', 'normal');
            doc.text('Scan for official verification', 42.8, 47, { align: 'center' });

            // Legal info
            doc.setFontSize(5);
            doc.text(`VIN: ${memberData.votersCard}`, 6, 50);
            doc.text(`PHN: ${memberData.phone}`, 6, 52);
            
            doc.setDrawColor(255, 255, 255, 0.2);
            doc.line(60, 50, 80, 50);
            doc.text('AUTHORIZED SIGNATURE', 60, 52);

            // Final Save
            doc.save(`RelaxNigeria-ID-${memberData.memberId}.pdf`);
            
            // Cloud save handled separately to prevent failure blocking download
            setTimeout(async () => {
                try {
                    const frontCanvas = await html2canvas(createSideForDownload(false), { scale: 2 });
                    const backCanvas = await html2canvas(createSideForDownload(true), { scale: 2 });
                    await fetch('/api/save-id-card', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            memberId: memberData.memberId,
                            frontImage: frontCanvas.toDataURL('image/png'),
                            backImage: backCanvas.toDataURL('image/png')
                        })
                    });
                } catch (cloudErr) {
                    console.error('Background cloud save failed', cloudErr);
                }
            }, 500);

        } catch (error) {
            console.error('PDF Generation failed:', error);
            alert('Something went wrong during PDF generation. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDownload = async () => {
        setIsSaving(true);
        try {
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
            alert('Failed to generate ID card image.');
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
                    <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl bg-linear-to-br from-[#064e3b] via-[#059669] to-[#047857]"
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
            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
                <button
                    onClick={handleDownloadPDF}
                    disabled={isSaving}
                    className="flex-1 group relative overflow-hidden bg-amber-500 text-darkgreen font-black py-4 rounded-2xl shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    <Shield className="w-5 h-5" />
                    <span>{isSaving ? 'PREPARING...' : 'DOWNLOAD PRINT PDF'}</span>
                </button>
                <button
                    onClick={handleDownload}
                    disabled={isSaving}
                    className="flex-1 group relative overflow-hidden bg-darkgreen text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-darkgreen/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                    <span>{isSaving ? 'GENERATING...' : 'DOWNLOAD PNG'}</span>
                </button>
            </div>
        </div>
    );
};

export default MemberIDCard;

