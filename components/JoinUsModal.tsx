'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Eye, EyeOff, CheckCircle, Loader2, ShieldCheck, ShieldX, BadgeCheck, LogIn } from 'lucide-react';
import { getLGAsForState } from '../data/nigeria-lgas';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface JoinUsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type VinStatus = 'idle' | 'verifying' | 'verified' | 'failed';

const JoinUsModal: React.FC<JoinUsModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [step, setStep] = useState<'form' | 'success' | 'login'>('form');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Login state
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    // VIN verification state
    const [vinStatus, setVinStatus] = useState<VinStatus>('idle');
    const [vinError, setVinError] = useState('');
    const [, setVinDetail] = useState<Record<string, unknown> | null>(null);

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', phone: '', email: '',
        password: '', votersCard: '', state: '', lga: '', ward: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');

        // Reset VIN verification if user edits the VIN field
        if (name === 'votersCard') {
            setVinStatus('idle');
            setVinError('');
            setVinDetail(null);
        }

        // Clear LGA when state changes
        if (name === 'state') {
            setFormData(prev => ({ ...prev, [name]: value, lga: '' }));
        }
    };

    const handleVerifyVin = async () => {
        if (!formData.votersCard.trim()) {
            setVinError('Please enter your Voter&apos;s Card Number first.');
            return;
        }
        setVinStatus('verifying');
        setVinError('');
        setVinDetail(null);

        try {
            const res = await fetch('/api/verify-vin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vin: formData.votersCard }),
            });
            const data = await res.json();

            if (!res.ok || !data.verified) {
                setVinStatus('failed');
                setVinError(data.error || 'Could not verify this VIN. Please check and try again.');
            } else {
                setVinStatus('verified');
                const verificationData = data.detail || data.data || {};
                setVinDetail(verificationData);

                // Autofill fields based on returned data
                const states = ["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "Abuja (FCT)"];
                let matchedState = '';
                if (verificationData?.state) {
                    matchedState = states.find(s => s.toLowerCase() === verificationData.state.toLowerCase() || (s === "Abuja (FCT)" && verificationData.state.toLowerCase() === "abuja")) || verificationData.state;
                }

                setFormData(prev => ({
                    ...prev,
                    state: matchedState || prev.state,
                    lga: verificationData?.lga || prev.lga,
                    ward: verificationData?.registrationAreaWard || prev.ward,
                    firstName: verificationData?.fullName ? verificationData.fullName.trim().split(' ')[0] : prev.firstName,
                    lastName: verificationData?.fullName ? verificationData.fullName.trim().split(' ').slice(1).join(' ') : prev.lastName,
                }));
            }
        } catch {
            setVinStatus('failed');
            setVinError('Verification service unavailable. Please try again.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (vinStatus !== 'verified') {
            setError('Please verify your Voter&apos;s Card Number before submitting.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Something went wrong. Please try again.');
                setLoading(false);
                return;
            }

            // Generate Member ID for the new member
            try {
                const idRes = await fetch('/api/generate-member-id', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ memberData: formData }),
                });
                const idData = await idRes.json();

                if (idRes.ok && idData.success) {
                    // Store the member ID for later use in dashboard
                    console.log('Member ID generated:', idData.memberData.memberId);
                }
            } catch (error) {
                console.error('Error generating member ID:', error);
            }

            setStep('success');
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await signIn('user-login', {
            email: loginEmail,
            password: loginPassword,
            redirect: false,
        });

        setLoading(false);

        if (res?.error) {
            setError('Invalid email or password. Please try again.');
        } else {
            router.push('/dashboard');
            onClose();
        }
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setStep('form');
            setError('');
            setVinStatus('idle');
            setVinError('');
            setVinDetail(null);
            setFormData({ firstName: '', lastName: '', phone: '', email: '', password: '', votersCard: '', state: '', lga: '', ward: '' });
            setLoginEmail('');
            setLoginPassword('');
        }, 300);
    };

    const inputClass = 'w-full px-4 py-3 rounded-xl border border-darkgreen/20 bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-darkgreen/40 transition-all text-darkgreen placeholder:text-darkgreen/30 text-sm';
    const labelClass = 'text-xs font-semibold text-darkgreen/70 uppercase tracking-wider';

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-darkgreen/60 backdrop-blur-sm z-200"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 24 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] md:w-full max-w-2xl bg-[#FBFFDD] rounded-2xl md:rounded-3xl shadow-2xl z-201 max-h-[90vh] overflow-y-auto"
                    >
                        {step === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-20 px-8 text-center gap-5">
                                <div className="w-20 h-20 bg-darkgreen/10 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-10 h-10 text-darkgreen" />
                                </div>
                                <h2 className="text-3xl font-laybar text-darkgreen">Welcome to RTFIN!</h2>
                                <p className="text-darkgreen/70 max-w-sm">Your registration was successful. You can now log in to your member dashboard using your email and password.</p>
                                <button onClick={handleClose} className="mt-4 bg-darkgreen text-white font-medium rounded-xl px-8 py-3 hover:bg-darkgreen/90 transition-all">
                                    Done
                                </button>
                            </div>
                        ) : step === 'login' ? (
                            <div className="p-6 md:p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-3xl font-laybar text-darkgreen">Member Login</h2>
                                        <p className="text-sm text-darkgreen/60 mt-1">Sign in to access your RTFIN dashboard.</p>
                                    </div>
                                    <button onClick={handleClose} className="p-2 hover:bg-darkgreen/10 rounded-full transition-all text-darkgreen mt-1">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {error && (
                                    <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleLogin} className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className={labelClass}>Email Address</label>
                                        <input
                                            required type="email" value={loginEmail}
                                            onChange={e => setLoginEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className={inputClass}
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className={labelClass}>Password</label>
                                        <div className="relative">
                                            <input
                                                required type={showLoginPassword ? 'text' : 'password'} value={loginPassword}
                                                onChange={e => setLoginPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className={`${inputClass} pr-12`}
                                            />
                                            <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-darkgreen/40 hover:text-darkgreen transition-all">
                                                {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <button type="submit" disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 bg-darkgreen text-white font-medium rounded-xl py-4 hover:bg-darkgreen/90 transition-all disabled:opacity-60 mt-2"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                                        {loading ? 'Signing in...' : 'Sign In'}
                                    </button>
                                </form>

                                <p className="text-center text-sm text-darkgreen/50 mt-8">
                                    Don&apos;t have an account yet?{' '}
                                    <button onClick={() => { setStep('form'); setError(''); }} className="text-darkgreen font-semibold hover:underline">
                                        Join Us
                                    </button>
                                </p>
                            </div>
                        ) : (
                            <div className="p-6 md:p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-3xl font-laybar text-darkgreen">Join the Movement</h2>
                                        <p className="text-sm text-darkgreen/60 mt-1">Fill out the form to become a member of RTFIN.</p>
                                    </div>
                                    <button onClick={handleClose} className="p-2 hover:bg-darkgreen/10 rounded-full transition-all text-darkgreen mt-1">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {error && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* VIN with verify button */}
                                    <div className="space-y-1.5">
                                        <label className={labelClass}>Voter&apos;s Card Number (VIN)</label>
                                        <div className="flex gap-2">
                                            <input
                                                required
                                                name="votersCard"
                                                value={formData.votersCard}
                                                onChange={handleChange}
                                                type="text"
                                                className={`${inputClass} ${vinStatus === 'verified' ? 'border-green-400 bg-green-50 focus:ring-green-300' : vinStatus === 'failed' ? 'border-red-300' : ''}`}
                                                placeholder="Enter your Voter Identification Number"
                                                readOnly={vinStatus === 'verified'}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleVerifyVin}
                                                disabled={vinStatus === 'verifying' || vinStatus === 'verified' || !formData.votersCard.trim()}
                                                className={`shrink-0 px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap
                                                    ${vinStatus === 'verified'
                                                        ? 'bg-green-100 text-green-700 cursor-default'
                                                        : vinStatus === 'verifying'
                                                            ? 'bg-darkgreen/20 text-darkgreen/50 cursor-wait'
                                                            : 'bg-darkgreen text-white hover:bg-darkgreen/90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed'
                                                    }`}
                                            >
                                                {vinStatus === 'verifying' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                                {vinStatus === 'verified' && <BadgeCheck className="w-3.5 h-3.5" />}
                                                {vinStatus === 'verified' ? 'Verified' : vinStatus === 'verifying' ? 'Verifying...' : 'Verify VIN'}
                                            </button>
                                        </div>

                                        {/* VIN status feedback */}
                                        {vinStatus === 'verified' && (
                                            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl mt-1">
                                                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                                <div className="text-xs text-green-700">
                                                    <p className="font-semibold">VIN Verified Successfully</p>
                                                </div>
                                            </div>
                                        )}
                                        {vinStatus === 'failed' && (
                                            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mt-1">
                                                <ShieldX className="w-4 h-4 text-red-500 shrink-0" />
                                                <p className="text-xs text-red-600">{vinError}</p>
                                            </div>
                                        )}
                                        {vinStatus === 'idle' && vinError && (
                                            <p className="text-xs text-red-500 mt-1">{vinError}</p>
                                        )}
                                    </div>

                                    {/* Name row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className={labelClass}>First Name</label>
                                            <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className={inputClass} placeholder="John" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={labelClass}>Last Name</label>
                                            <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className={inputClass} placeholder="Doe" />
                                        </div>
                                    </div>

                                    {/* Contact row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className={labelClass}>Phone Number</label>
                                            <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className={inputClass} placeholder="08012345678" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={labelClass}>Email Address</label>
                                            <input required name="email" value={formData.email} onChange={handleChange} type="email" className={inputClass} placeholder="john@example.com" />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-1.5">
                                        <label className={labelClass}>Password</label>
                                        <div className="relative">
                                            <input required name="password" value={formData.password} onChange={handleChange} type={showPassword ? 'text' : 'password'} className={`${inputClass} pr-12`} placeholder="Create a password (min. 6 characters)" minLength={6} />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-darkgreen/40 hover:text-darkgreen transition-all">
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Location row */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-1.5">
                                            <label className={labelClass}>State</label>
                                            <select required name="state" value={formData.state} onChange={handleChange} className={`${inputClass} appearance-none`}>
                                                <option value="" disabled>Select State</option>
                                                {["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "Abuja (FCT)"].map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={labelClass}>LGA</label>
                                            <select required name="lga" value={formData.lga} onChange={handleChange} className={`${inputClass} appearance-none`} disabled={!formData.state}>
                                                <option value="" disabled>{formData.state ? 'Select LGA' : 'Select State first'}</option>
                                                {getLGAsForState(formData.state).map(lga => (
                                                    <option key={lga} value={lga}>{lga}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={labelClass}>Ward</label>
                                            <input required name="ward" value={formData.ward} onChange={handleChange} type="text" className={inputClass} placeholder="Your ward" />
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={loading || vinStatus !== 'verified'}
                                            className="w-full bg-darkgreen text-white font-medium rounded-xl px-7 py-4 hover:bg-darkgreen/90 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                            {loading ? 'Submitting...' : vinStatus !== 'verified' ? 'Verify VIN to Continue' : 'Complete Registration'}
                                        </button>
                                        {vinStatus !== 'verified' && (
                                            <p className="text-center text-xs text-darkgreen/40 mt-2">You must verify your Voter&apos;s Card Number to proceed.</p>
                                        )}

                                        <p className="text-center text-sm text-darkgreen/50 mt-6">
                                            Already registered?{' '}
                                            <button type="button" onClick={() => { setStep('login'); setError(''); }} className="text-darkgreen font-semibold hover:underline">
                                                Login here
                                            </button>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default JoinUsModal;
