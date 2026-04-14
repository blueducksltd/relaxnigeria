'use client'
import React, { useRef, useState } from 'react';
import { Download, Printer, Shield, Calendar, MapPin, Phone, Mail, User } from 'lucide-react';
import html2canvas from 'html2canvas';

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
        photo?: string; // User photo for ID card
    };
}

const MemberIDCard: React.FC<MemberIDCardProps> = ({ memberData }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isSaving, setIsSaving] = useState(false);

    const createCleanIdCardElement = () => {
        // Create a clean element for html2canvas
        const tempDiv = document.createElement('div')
        tempDiv.style.cssText = `
            width: 3.375in;
            height: 2.125in;
            background: linear-gradient(to bottom right, rgb(5 150 105), rgb(4 120 97), rgb(6 95 70));
            border-radius: 16px;
            position: relative;
            overflow: hidden;
            padding: 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-family: system-ui, -apple-system, sans-serif;
            color: white;
        `

        // Add background pattern
        const patternDiv = document.createElement('div')
        patternDiv.style.cssText = `
            position: absolute;
            inset: 0;
            opacity: 0.1;
            background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px);
        `
        tempDiv.appendChild(patternDiv)

        // Add content based on memberData
        const contentDiv = document.createElement('div')
        contentDiv.style.cssText = `
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
        `

        // Left section (logo and org info)
        const leftSection = document.createElement('div')
        leftSection.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
        `

        const logoDiv = document.createElement('div')
        logoDiv.style.cssText = `
            width: 48px;
            height: 48px;
            background: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `
        const logoImg = document.createElement('img')
        logoImg.src = '/RTIFN Logo.jpg'
        logoImg.alt = 'RTFIN Logo'
        logoImg.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: contain;
        `
        logoDiv.appendChild(logoImg)
        leftSection.appendChild(logoDiv)

        const orgInfo = document.createElement('div')
        orgInfo.innerHTML = `
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 4px;">RTFIN</div>
            <div style="font-size: 12px; opacity: 0.8;">Member ID Card</div>
            <div style="font-size: 12px; opacity: 0.6; font-family: monospace;">${memberData.memberId}</div>
        `
        leftSection.appendChild(orgInfo)
        contentDiv.appendChild(leftSection)

        // Right section (photo)
        const photoDiv = document.createElement('div')
        photoDiv.style.cssText = `
            width: 64px;
            height: 64px;
            background: rgba(255,255,255,0.2);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid rgba(255,255,255,0.3);
            backdrop-filter: blur(4px);
            overflow: hidden;
        `
        if (memberData.photo) {
            const photoImg = document.createElement('img')
            photoImg.src = memberData.photo
            photoImg.alt = 'Member Photo'
            photoImg.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
            `
            photoDiv.appendChild(photoImg)
        } else {
            photoDiv.innerHTML = '<div style="font-size: 24px; opacity: 0.6;">ð</div>'
        }
        contentDiv.appendChild(photoDiv)
        tempDiv.appendChild(contentDiv)

        // Middle section (personal info)
        const middleDiv = document.createElement('div')
        middleDiv.style.cssText = `
            position: relative;
            z-index: 1;
            padding: 8px 0;
        `
        middleDiv.innerHTML = `
            <div style="font-size: 14px; font-weight: bold; margin-bottom: 4px;">${memberData.firstName} ${memberData.lastName}</div>
            <div style="font-size: 11px; line-height: 1.4; opacity: 0.9;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                    <span>${memberData.phone}</span>
                    <span>${memberData.ward}, ${memberData.lga}</span>
                </div>
                <div>VIN: ${memberData.votersCard}</div>
            </div>
        `
        tempDiv.appendChild(middleDiv)

        // Bottom section
        const bottomDiv = document.createElement('div')
        bottomDiv.style.cssText = `
            position: relative;
            z-index: 1;
            padding-top: 8px;
            border-top: 1px solid rgba(255,255,255,0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 11px;
        `
        bottomDiv.innerHTML = `
            <div style="opacity: 0.8;">Since: ${memberData.memberSince}</div>
            <div style="opacity: 0.6;">Valid Member</div>
        `
        tempDiv.appendChild(bottomDiv)

        return tempDiv
    }

    const handleDownload = async () => {
        if (cardRef.current) {
            try {
                const tempDiv = createCleanIdCardElement()

                // Add to body temporarily for html2canvas
                document.body.appendChild(tempDiv)

                const canvas = await html2canvas(tempDiv, {
                    scale: 2,
                    backgroundColor: null,
                    logging: false,
                    useCORS: true,
                    allowTaint: true,
                });

                // Clean up temporary element
                document.body.removeChild(tempDiv)

                const link = document.createElement('a');
                link.download = `RTFIN-ID-${memberData.memberId}.png`;
                link.href = canvas.toDataURL();
                link.click();
            } catch (error) {
                console.error('Error downloading ID card:', error);
                alert('Failed to download ID card. Please try again.');
            }
        }
    };

    const saveToBlob = async () => {
        if (cardRef.current) {
            setIsSaving(true);
            try {
                const tempDiv = createCleanIdCardElement()

                // Add to body temporarily for html2canvas
                document.body.appendChild(tempDiv)

                const canvas = await html2canvas(tempDiv, {
                    scale: 2,
                    backgroundColor: null,
                    logging: false,
                    useCORS: true,
                    allowTaint: true,
                });

                // Clean up temporary element
                document.body.removeChild(tempDiv)

                const imageData = canvas.toDataURL('image/png');

                const response = await fetch('/api/save-id-card', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        memberId: memberData.memberId,
                        imageData: imageData
                    }),
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    console.log('ID card saved to blob:', result.url);
                    alert('ID card saved successfully!');
                } else {
                    throw new Error(result.error || 'Failed to save ID card');
                }
            } catch (error) {
                console.error('Error saving ID card:', error);
                alert('Failed to save ID card. Please try again.');
            } finally {
                setIsSaving(false);
            }
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="w-full mx-auto">
            {/* Horizontal ID Card Design - CR80 Standard: 3.375" x 2.125" */}
            <div
                ref={cardRef}
                data-id-card="true"
                className="relative rounded-2xl shadow-2xl overflow-hidden print:shadow-none"
                style={{
                    width: '3.375in',
                    height: '2.125in',
                    maxWidth: '100%',
                    aspectRatio: '3.375/2.125',
                    background: 'linear-gradient(to bottom right, rgb(5 150 105), rgb(4 120 97), rgb(6 95 70))'
                }}
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
                    }}></div>
                </div>

                {/* Main Content - Horizontal Layout */}
                <div className="relative p-4 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        {/* Left Section - Logo and Organization Info */}
                        <div className="flex items-center space-x-3">
                            {/* Logo */}
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg">
                                <img src="/RTIFN Logo.jpg" alt="RTFIN Logo" className="w-full h-full object-contain" />
                            </div>

                            {/* Organization Details */}
                            <div className="text-white">
                                <h3 className="text-lg font-bold">RTFIN</h3>
                                <p className="text-white/80 text-xs">Member ID Card</p>
                                <p className="text-white/60 text-xs font-mono">{memberData.memberId}</p>
                            </div>
                        </div>

                        {/* Right Section - Photo */}
                        <div className="shrink-0">
                            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border-2 border-white/30 overflow-hidden">
                                {memberData.photo ? (
                                    <img src={memberData.photo} alt="Member Photo" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-8 h-8 text-white/60" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Middle Section - Personal Information */}
                    <div className="py-2">
                        <h4 className="text-white font-bold text-sm mb-1">
                            {memberData.firstName} {memberData.lastName}
                        </h4>

                        <div className="space-y-2 text-xs">
                            <div className='flex w-full gap-3 items-center'>
                                <div className="flex items-center space-x-1 text-white/90">
                                    <Phone className="w-3 h-3 shrink-0" />
                                    <span>{memberData.phone}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-white/90">
                                    <MapPin className="w-3 h-3 shrink-0" />
                                    <span className="truncate">{memberData.ward}, {memberData.lga}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1 text-white/90">
                                <Shield className="w-3 h-3 shrink-0" />
                                <span className="truncate">VIN: {memberData.votersCard}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - Additional Info */}
                    <div className="pt-2 border-t border-white/20">
                        <div className="flex items-center justify-between">
                            <div className="text-white/80 text-xs">
                                <div className="flex items-center space-x-1">
                                    <Calendar className="w-3 h-3" />
                                    <span className="truncate">Since: {memberData.memberSince}</span>
                                </div>
                            </div>
                            <div className="text-xs text-white/60">
                                <span>Valid Member</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 print:hidden">
                <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center space-x-2 bg-emerald-600 text-white px-4 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                >
                    <Download className="w-4 h-4" />
                    <span>Download ID Card</span>
                </button>
            </div>
        </div>
    );
};

export default MemberIDCard;
