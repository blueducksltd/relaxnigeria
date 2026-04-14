'use client'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Send, Loader2, CheckCircle, MessageSquare, Calendar, ChevronDown, ChevronUp } from 'lucide-react'

interface SentMessage {
    _id: string
    subject: string
    body: string
    sentBy: string
    createdAt: string
}

export default function AdminBroadcastPage() {
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    const [sending, setSending] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [history, setHistory] = useState<SentMessage[]>([])
    const [loadingHistory, setLoadingHistory] = useState(true)
    const [expanded, setExpanded] = useState<string | null>(null)

    const fetchHistory = () => {
        fetch('/api/broadcast')
            .then(r => r.json())
            .then(data => { setHistory(Array.isArray(data) ? data : []); setLoadingHistory(false) })
            .catch(() => setLoadingHistory(false))
    }

    useEffect(() => { fetchHistory() }, [])

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        setSending(true)
        setSuccess('')
        setError('')

        try {
            const res = await fetch('/api/broadcast', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, body }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Failed to send.')
            setSuccess(data.message)
            setSubject('')
            setBody('')
            fetchHistory()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setSending(false)
        }
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold text-darkgreen">Broadcast Message</h1>
                <p className="text-darkgreen/50 text-sm mt-1">Send an announcement to all registered members via in-app and email.</p>
            </div>

            {/* Compose Box */}
            <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 border border-darkgreen/5 shadow-sm"
            >
                <h2 className="font-bold text-darkgreen mb-5 flex items-center gap-2">
                    <Send className="w-4 h-4" /> Compose Broadcast
                </h2>

                {success && (
                    <div className="mb-4 flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                        <CheckCircle className="w-4 h-4 shrink-0" />
                        {success}
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSend} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-darkgreen/60 uppercase tracking-wider">Subject</label>
                        <input
                            required value={subject} onChange={e => setSubject(e.target.value)}
                            placeholder="Announcement subject..."
                            className="w-full px-4 py-3 rounded-xl border border-darkgreen/15 bg-[#FBFFDD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-darkgreen/30 text-darkgreen text-sm transition-all"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-darkgreen/60 uppercase tracking-wider">Message Body</label>
                        <textarea
                            required value={body} onChange={e => setBody(e.target.value)}
                            rows={6} placeholder="Write your message here..."
                            className="w-full px-4 py-3 rounded-xl border border-darkgreen/15 bg-[#FBFFDD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-darkgreen/30 text-darkgreen text-sm transition-all resize-none"
                        />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <p className="text-xs text-darkgreen/40">This message will be sent to all registered members in-app and by email.</p>
                        <button type="submit" disabled={sending}
                            className="flex items-center gap-2 bg-darkgreen text-white text-sm font-medium rounded-xl px-6 py-3 hover:bg-darkgreen/90 transition-all disabled:opacity-60 shrink-0"
                        >
                            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            {sending ? 'Sending...' : 'Send Broadcast'}
                        </button>
                    </div>
                </form>
            </motion.div>

            {/* History */}
            <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 border border-darkgreen/5 shadow-sm"
            >
                <h2 className="font-bold text-darkgreen mb-5 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Sent Broadcasts
                    {history.length > 0 && (
                        <span className="ml-auto text-xs bg-darkgreen/10 text-darkgreen rounded-full px-2.5 py-0.5 font-medium">{history.length}</span>
                    )}
                </h2>

                {loadingHistory ? (
                    <div className="flex justify-center py-8">
                        <div className="w-6 h-6 border-2 border-darkgreen border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : history.length === 0 ? (
                    <div className="text-center py-10 text-darkgreen/30">
                        <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-40" />
                        <p className="text-sm">No broadcasts sent yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {history.map(msg => (
                            <div key={msg._id} className="border border-darkgreen/10 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setExpanded(expanded === msg._id ? null : msg._id)}
                                    className="w-full flex items-center justify-between p-4 hover:bg-[#FBFFDD] transition-all text-left"
                                >
                                    <div className="min-w-0">
                                        <p className="font-semibold text-darkgreen text-sm truncate">{msg.subject}</p>
                                        <p className="text-xs text-darkgreen/40 flex items-center gap-1 mt-0.5">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(msg.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            <span className="mx-1">·</span>
                                            by {msg.sentBy}
                                        </p>
                                    </div>
                                    {expanded === msg._id ? <ChevronUp className="w-4 h-4 text-darkgreen/40 shrink-0 ml-3" /> : <ChevronDown className="w-4 h-4 text-darkgreen/40 shrink-0 ml-3" />}
                                </button>
                                {expanded === msg._id && (
                                    <div className="px-4 pb-4 text-sm text-darkgreen/70 leading-relaxed whitespace-pre-wrap border-t border-darkgreen/5 pt-3">
                                        {msg.body}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    )
}
