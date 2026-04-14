'use client'
import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'motion/react'
import { Eye, EyeOff, LogIn, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

function LoginForm() {
    const router = useRouter()
    const params = useSearchParams()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const res = await signIn('user-login', {
            email,
            password,
            redirect: false,
        })

        setLoading(false)

        if (res?.error) {
            setError('Invalid email or password. Please try again.')
        } else {
            const callbackUrl = params.get('callbackUrl') || '/dashboard'
            router.push(callbackUrl)
        }
    }

    return (
        <div className="min-h-screen bg-[#FBFFDD] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/">
                        <Image src="/logo.png" alt="RTFIN" width={140} height={40} className="h-auto mx-auto" />
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl border border-darkgreen/5 p-8"
                >
                    <div className="mb-7">
                        <h1 className="text-2xl font-laybar text-darkgreen">Member Login</h1>
                        <p className="text-darkgreen/50 text-sm mt-1">Sign in to access your RTFIN dashboard.</p>
                    </div>

                    {error && (
                        <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-darkgreen/60 uppercase tracking-wider">Email Address</label>
                            <input
                                required type="email" value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full px-4 py-3 rounded-xl border border-darkgreen/20 bg-[#FBFFDD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-darkgreen/30 text-darkgreen text-sm transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-darkgreen/60 uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <input
                                    required type={showPass ? 'text' : 'password'} value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 pr-12 rounded-xl border border-darkgreen/20 bg-[#FBFFDD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-darkgreen/30 text-darkgreen text-sm transition-all"
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-darkgreen/40 hover:text-darkgreen transition-all">
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-darkgreen text-white font-medium rounded-xl py-3.5 hover:bg-darkgreen/90 transition-all disabled:opacity-60 mt-2"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-darkgreen/50 mt-6">
                        Not a member yet?{' '}
                        <Link href="/" className="text-darkgreen font-semibold hover:underline">
                            Join Us
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    )
}
