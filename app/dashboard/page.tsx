'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import {
    Bell, LogOut, User, MapPin, CreditCard, Phone, Mail,
    MessageSquare, ChevronDown, ChevronUp, Calendar, Camera, Download
} from 'lucide-react'
import MemberIDCard from '../../components/MemberIDCard'
import PhotoCapture from '../../components/PhotoCapture'

interface Message {
    _id: string
    subject: string
    body: string
    sentBy: string
    createdAt: string
}

export default function UserDashboard() {
    const { data: session, status } = useSession()
    
    // Client-side role check (with delay to allow middleware to handle)
    useEffect(() => {
        const userRole = (session?.user as any)?.role;
        if (status === 'authenticated' && session?.user && (userRole === 'admin' || userRole === 'super-admin')) {
            // Give middleware priority to handle redirect
            setTimeout(() => {
                if (window.location.pathname === '/dashboard') {
                    window.location.href = '/admin'
                }
            }, 500)
        }
    }, [status, session])
    const [messages, setMessages] = useState<Message[]>([])
    const [loadingMessages, setLoadingMessages] = useState(true)
    const [expandedMsg, setExpandedMsg] = useState<string | null>(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [loggingIn, setLoggingIn] = useState(false)
    
    // ID Card states
    const [showPhotoCapture, setShowPhotoCapture] = useState(false)
    const [userPhoto, setUserPhoto] = useState<string | null>(null)
    const [memberData, setMemberData] = useState<any>(null)
    const [loadingMemberData, setLoadingMemberData] = useState(false)
    const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

    useEffect(() => {
        if (session) {
            fetch('/api/user/messages')
                .then(r => r.json())
                .then(data => { setMessages(Array.isArray(data) ? data : []); setLoadingMessages(false) })
                .catch(() => setLoadingMessages(false))
            
            // Check if user has an existing ID card
            loadExistingIdCard()
        }
    }, [session])

    const loadExistingIdCard = async () => {
        try {
            // Get user data first
            const res = await fetch('/api/user/member-data')
            const data = await res.json()

            if (res.ok && data.success) {
                // Check if ID card exists for this member
                const cardRes = await fetch(`/api/get-id-card?memberId=${data.memberData.memberId}`)
                const cardData = await cardRes.json()

                if (cardRes.ok && cardData.success && cardData.blobUrl) {
                    // Load existing member data with photo
                    setMemberData({
                        ...data.memberData,
                        photo: cardData.photoUrl || null
                    })
                    console.log('Loaded existing ID card from storage')
                }
            }
        } catch (error) {
            console.log('No existing ID card found or error loading:', error)
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoggingIn(true)
        setLoginError('')
        const res = await signIn('user-login', { email, password, redirect: false })
        setLoggingIn(false)
        if (res?.error) setLoginError('Invalid email or password.')
    }

    const handlePhotoCapture = (photoDataUrl: string) => {
        setUserPhoto(photoDataUrl)
        setShowPhotoCapture(false)
        generateMemberIdCard(photoDataUrl)
    }

    const generateMemberIdCard = async (photo?: string) => {
        setLoadingMemberData(true)
        try {
            // Get user's registration data (includes pre-generated Member ID)
            const res = await fetch('/api/user/member-data')
            const data = await res.json()

            if (res.ok && data.success) {
                // Use existing member data with photo
                const memberDataWithPhoto = { 
                    ...data.memberData, 
                    photo: photo || userPhoto 
                }
                setMemberData(memberDataWithPhoto)

                // Automatically save ID card to Vercel Blob after a short delay
                // to ensure the component is rendered
                setTimeout(async () => {
                    await autoSaveIdCard(memberDataWithPhoto)
                }, 1000)
            }
        } catch (error) {
            console.error('Error fetching member data:', error)
        } finally {
            setLoadingMemberData(false)
        }
    }

    const autoSaveIdCard = async (memberData: any) => {
        try {
            setAutoSaveStatus('saving')
            console.log('Starting auto-save for member:', memberData.memberId)
            
            // Get the ID card element and convert to canvas
            const idCardElement = document.querySelector('[data-id-card="true"]')
            if (!idCardElement) {
                console.error('ID card element not found for auto-save')
                setAutoSaveStatus('error')
                // Reset status after 3 seconds
                setTimeout(() => setAutoSaveStatus('idle'), 3000)
                return
            }

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
                background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0);
                background-size: 15px 15px;
            `
            tempDiv.appendChild(patternDiv)

            // Add background logo touch design (watermark)
            const watermarkMsg = document.createElement('div')
            watermarkMsg.style.cssText = `
                position: absolute;
                right: -20px;
                bottom: -20px;
                width: 150px;
                height: 150px;
                opacity: 0.15;
                pointer-events: none;
            `
            watermarkMsg.innerHTML = '<img src="/rtifn.png" style="width: 100%; height: 100%; object-fit: contain; transform: rotate(-15deg);" />'
            tempDiv.appendChild(watermarkMsg)
            
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
                width: 44px;
                height: 44px;
                background: white;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 4px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                overflow: hidden;
            `
            logoDiv.innerHTML = '<img src="/Renewed Hope.jpg" style="width: 100%; height: 100%; object-fit: contain;" />'
            leftSection.appendChild(logoDiv)
            
            const orgInfo = document.createElement('div')
            orgInfo.innerHTML = `
                <div style="font-size: 16px; font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase;">Relax Nigeria</div>
                <div style="font-size: 7px; opacity: 0.7; letter-spacing: 2px; text-transform: uppercase; font-weight: bold;">Official Member</div>
            `
            leftSection.appendChild(orgInfo)
            contentDiv.appendChild(leftSection)
            
            // Right section (photo)
            const photoDiv = document.createElement('div')
            photoDiv.style.cssText = `
                width: 60px;
                height: 60px;
                background: rgba(255,255,255,0.1);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid rgba(255,255,255,0.2);
                backdrop-filter: blur(4px);
                overflow: hidden;
            `
            if (memberData.photo) {
                photoDiv.innerHTML = `<img src="${memberData.photo}" style="width: 100%; height: 100%; object-fit: cover;" />`
            } else {
                photoDiv.innerHTML = '<div style="font-size: 24px; opacity: 0.3;">👤</div>'
            }
            contentDiv.appendChild(photoDiv)
            tempDiv.appendChild(contentDiv)
            
            // Middle section (personal info)
            const middleDiv = document.createElement('div')
            middleDiv.style.cssText = `
                position: relative;
                z-index: 1;
                margin-top: 4px;
            `
            middleDiv.innerHTML = `
                <div style="font-size: 14px; font-weight: 800; color: #fbbf24; margin-bottom: 2px;">${memberData.firstName} ${memberData.lastName}</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 8px; opacity: 0.9;">
                    <div>
                        <div style="opacity: 0.6; text-transform: uppercase; font-size: 6px;">ID Number</div>
                        <div style="font-family: monospace; font-weight: bold;">${memberData.memberId}</div>
                    </div>
                    <div>
                        <div style="opacity: 0.6; text-transform: uppercase; font-size: 6px;">Joined</div>
                        <div>${memberData.memberSince}</div>
                    </div>
                </div>
            `
            tempDiv.appendChild(middleDiv)
            
            // Bottom section
            const bottomDiv = document.createElement('div')
            bottomDiv.style.cssText = `
                position: relative;
                z-index: 1;
                padding-top: 6px;
                border-top: 1px solid rgba(255,255,255,0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 8px;
            `
            bottomDiv.innerHTML = `
                <div style="opacity: 0.8;">📍 ${memberData.ward}, ${memberData.lga}</div>
                <div style="background: #fbbf24; color: #064e3b; font-weight: 800; padding: 1px 6px; border-radius: 100px; text-transform: uppercase; font-size: 6px;">Verified</div>
            `
            tempDiv.appendChild(bottomDiv)
            
            // Add to body temporarily for html2canvas
            document.body.appendChild(tempDiv)
            
            const html2canvas = (await import('html2canvas')).default
            const canvas = await html2canvas(tempDiv, {
                scale: 2,
                backgroundColor: null,
                logging: false,
                useCORS: true,
                allowTaint: true,
            })

            const imageData = canvas.toDataURL('image/png')
            console.log('Canvas created, image data length:', imageData.length)
            
            // Clean up temporary element
            document.body.removeChild(tempDiv)
            
            const response = await fetch('/api/save-id-card', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    memberId: memberData.memberId,
                    frontImage: imageData,     // Updated to match new API
                    backImage: imageData       // Using front as back for auto-save purposes
                }),
            })
            
            const result = await response.json()
            console.log('Save response:', { status: response.status, result })
            
            if (response.ok && result.success) {
                console.log('ID card automatically saved to blob:', result.url)
                setAutoSaveStatus('saved')
                // Reset status after 3 seconds
                setTimeout(() => setAutoSaveStatus('idle'), 3000)
            } else {
                console.error('Auto-save failed:', result.error)
                setAutoSaveStatus('error')
                // Reset status after 3 seconds
                setTimeout(() => setAutoSaveStatus('idle'), 3000)
            }
        } catch (error) {
            console.error('Error auto-saving ID card:', error)
            setAutoSaveStatus('error')
            // Reset status after 3 seconds
            setTimeout(() => setAutoSaveStatus('idle'), 3000)
        }
    }

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FBFFDD]">
                <div className="w-10 h-10 border-4 border-darkgreen border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    const user = session?.user as any

    if (!session || user?.role !== 'user') {
        return (
            <div className="min-h-screen bg-[#FBFFDD] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 bg-darkgreen/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <User className="w-7 h-7 text-darkgreen" />
                        </div>
                        <h1 className="text-2xl font-laybar text-darkgreen">Member Portal</h1>
                        <p className="text-darkgreen/60 text-sm mt-1">Sign in to access your dashboard</p>
                    </div>

                    {loginError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                            {loginError}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-darkgreen/60 uppercase tracking-wider">Email</label>
                            <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                                className="mt-1 w-full px-4 py-3 rounded-xl border border-darkgreen/20 bg-[#FBFFDD] focus:outline-none focus:ring-2 focus:ring-darkgreen/30 text-darkgreen text-sm"
                                placeholder="your@email.com" />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-darkgreen/60 uppercase tracking-wider">Password</label>
                            <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
                                className="mt-1 w-full px-4 py-3 rounded-xl border border-darkgreen/20 bg-[#FBFFDD] focus:outline-none focus:ring-2 focus:ring-darkgreen/30 text-darkgreen text-sm"
                                placeholder="••••••••" />
                        </div>
                        <button type="submit" disabled={loggingIn}
                            className="w-full bg-darkgreen text-white font-medium rounded-xl py-3 hover:bg-darkgreen/90 transition-all disabled:opacity-60 mt-2">
                            {loggingIn ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FBFFDD]">
            {/* Top Bar */}
            <header className="bg-white border-b border-darkgreen/10 sticky top-0 z-40 px-4 sm:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-darkgreen rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm font-laybar">R</span>
                    </div>
                    <span className="font-laybar text-darkgreen font-bold">RTFIN Portal</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Bell className="w-5 h-5 text-darkgreen/60" />
                        {messages.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold">
                                {messages.length}
                            </span>
                        )}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-darkgreen flex items-center justify-center text-white font-bold text-sm">
                        {user?.name?.[0] || 'U'}
                    </div>
                    <button onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center gap-1.5 text-sm text-darkgreen/60 hover:text-red-500 transition-all">
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:block">Sign Out</span>
                    </button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-6">

                {/* Welcome Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-darkgreen rounded-2xl p-6 sm:p-8 text-white"
                >
                    <p className="text-white/60 text-sm uppercase tracking-widest font-medium mb-1">Welcome back</p>
                    <h1 className="text-2xl sm:text-3xl font-laybar">{user?.name || 'Member'}</h1>
                    <p className="text-white/50 text-sm mt-2">You are a verified RTFIN member.</p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Active Member
                    </div>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-darkgreen/5"
                >
                    <h2 className="font-bold text-darkgreen mb-4 flex items-center gap-2">
                        <User className="w-4 h-4" /> Profile Details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-[#FBFFDD] rounded-xl">
                            <Mail className="w-4 h-4 text-darkgreen/50 shrink-0" />
                            <div>
                                <p className="text-xs text-darkgreen/40 uppercase tracking-wide">Email</p>
                                <p className="text-sm font-medium text-darkgreen truncate">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-[#FBFFDD] rounded-xl">
                            <CreditCard className="w-4 h-4 text-darkgreen/50 shrink-0" />
                            <div>
                                <p className="text-xs text-darkgreen/40 uppercase tracking-wide">Member ID</p>
                                <p className="text-sm font-medium text-darkgreen truncate">{(user?.id as string)?.slice(-10).toUpperCase()}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ID Card Generation */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-darkgreen/5"
                >
                    <h2 className="font-bold text-darkgreen mb-4 flex items-center gap-2">
                        <CreditCard className="w-4 h-4" /> Member ID Card
                    </h2>

                    {!memberData ? (
                        <div className="text-center py-8">
                            {loadingMemberData ? (
                                <div className="py-8">
                                    <div className="w-6 h-6 border-2 border-darkgreen border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                    <p className="text-darkgreen/60 text-sm">Generating your ID card...</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="w-16 h-16 bg-darkgreen/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Camera className="w-8 h-8 text-darkgreen" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-darkgreen">Generate Your ID Card</h3>
                                    <p className="text-darkgreen/60 text-sm max-w-sm mx-auto">
                                        Take a photo or upload one to generate your personalized RTFIN member ID card.
                                    </p>
                                    <button
                                        onClick={() => setShowPhotoCapture(true)}
                                        className="bg-darkgreen text-white px-6 py-3 rounded-xl hover:bg-darkgreen/90 transition-all font-medium flex items-center gap-2 mx-auto"
                                    >
                                        <Camera className="w-4 h-4" />
                                        Take Photo for ID Card
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-darkgreen">Your RTFIN ID Card</h3>
                                    <p className="text-darkgreen/60 text-sm">Your official membership identification</p>
                                </div>
                                <button
                                    onClick={() => setShowPhotoCapture(true)}
                                    className="text-sm text-darkgreen/60 hover:text-darkgreen transition-all flex items-center gap-1"
                                >
                                    <Camera className="w-4 h-4" />
                                    Update Photo
                                </button>
                            </div>
                            
                            {/* Auto-save Status Feedback */}
                            {autoSaveStatus !== 'idle' && (
                                <div className={`p-3 rounded-xl flex items-center gap-2 text-sm ${
                                    autoSaveStatus === 'saved' 
                                        ? 'bg-green-50 text-green-700 border border-green-200'
                                        : autoSaveStatus === 'saving'
                                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                        : 'bg-red-50 text-red-700 border border-red-200'
                                }`}>
                                    {autoSaveStatus === 'saved' && (
                                        <>
                                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs">â</span>
                                            </div>
                                            <span>ID Card automatically saved to cloud storage</span>
                                        </>
                                    )}
                                    {autoSaveStatus === 'saving' && (
                                        <>
                                            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                            <span>Saving ID Card to cloud storage...</span>
                                        </>
                                    )}
                                    {autoSaveStatus === 'error' && (
                                        <>
                                            <span className="text-red-500">â</span>
                                            <span>Failed to save ID Card to cloud storage</span>
                                        </>
                                    )}
                                </div>
                            )}
                            
                            <MemberIDCard memberData={memberData} />
                        </div>
                    )}
                </motion.div>

                {/* Messages / Broadcasts */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-darkgreen/5"
                >
                    <h2 className="font-bold text-darkgreen mb-4 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Announcements
                        {messages.length > 0 && (
                            <span className="ml-auto text-xs bg-darkgreen text-white rounded-full px-2.5 py-0.5">{messages.length}</span>
                        )}
                    </h2>

                    {loadingMessages ? (
                        <div className="py-8 flex justify-center">
                            <div className="w-6 h-6 border-2 border-darkgreen border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="text-center py-10 text-darkgreen/40">
                            <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-30" />
                            <p className="text-sm">No announcements yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {messages.map((msg) => (
                                <div key={msg._id} className="border border-darkgreen/10 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setExpandedMsg(expandedMsg === msg._id ? null : msg._id)}
                                        className="w-full flex items-center justify-between p-4 hover:bg-[#FBFFDD] transition-all text-left"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-2 h-2 bg-darkgreen rounded-full shrink-0" />
                                            <div className="min-w-0">
                                                <p className="font-semibold text-darkgreen text-sm truncate">{msg.subject}</p>
                                                <p className="text-xs text-darkgreen/40 flex items-center gap-1 mt-0.5">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(msg.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                        {expandedMsg === msg._id ? <ChevronUp className="w-4 h-4 text-darkgreen/40 shrink-0" /> : <ChevronDown className="w-4 h-4 text-darkgreen/40 shrink-0" />}
                                    </button>
                                    {expandedMsg === msg._id && (
                                        <div className="px-4 pb-4 text-sm text-darkgreen/70 leading-relaxed whitespace-pre-wrap border-t border-darkgreen/5 pt-3">
                                            {msg.body}
                                            <p className="mt-3 text-xs text-darkgreen/30">— {msg.sentBy}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

            </main>

            {/* Photo Capture Modal */}
            {showPhotoCapture && (
                <PhotoCapture
                    onPhotoCapture={handlePhotoCapture}
                    onClose={() => setShowPhotoCapture(false)}
                />
            )}
        </div>
    )
}
