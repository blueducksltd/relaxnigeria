'use client'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Users, Search, MapPin, Phone, Mail, CreditCard, Calendar, Trash2, Loader2, AlertTriangle } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface Member {
    _id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    state: string
    lga: string
    ward: string
    votersCard: string
    createdAt: string
}

export default function AdminMembersPage() {
    const { data: session } = useSession()
    const [members, setMembers] = useState<Member[]>([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [search, setSearch] = useState('')
    const [stateFilter, setStateFilter] = useState('all')

    const userRole = (session?.user as any)?.role
    const isSuperAdmin = userRole === 'super-admin'

    const fetchMembers = () => {
        setLoading(true)
        fetch('/api/members')
            .then(r => r.json())
            .then(data => {
                const membersList = data.members || [];
                setMembers(Array.isArray(membersList) ? membersList : []);
                setLoading(false);
            })
            .catch(() => setLoading(false))
    }

    useEffect(() => {
        fetchMembers()
    }, [])

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) return

        setDeletingId(id)
        try {
            const res = await fetch(`/api/admin/delete-member?memberId=${id}`, {
                method: 'DELETE'
            })
            const data = await res.json()

            if (res.ok) {
                setMembers(prev => prev.filter(m => m._id !== id))
            } else {
                alert(data.error || 'Failed to delete member')
            }
        } catch (err) {
            alert('An unexpected error occurred')
        } finally {
            setDeletingId(null)
        }
    }

    const filtered = members.filter(m => {
        const q = search.toLowerCase()
        const matchSearch = !q || `${m.firstName} ${m.lastName} ${m.email} ${m.phone}`.toLowerCase().includes(q)
        const matchState = stateFilter === 'all' || m.state === stateFilter
        return matchSearch && matchState
    })

    const states = [...new Set(members.map(m => m.state))].sort()

    if (loading) return (
        <div className="flex items-center justify-center py-32">
            <div className="w-10 h-10 border-4 border-darkgreen border-t-transparent rounded-full animate-spin" />
        </div>
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-darkgreen">Members</h1>
                    <p className="text-darkgreen/50 text-sm mt-1">{members.length} registered member{members.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-darkgreen/10 shadow-sm">
                        <Search className="w-4 h-4 text-darkgreen/40" />
                        <input value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search members..." className="outline-none text-sm text-darkgreen bg-transparent w-48" />
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-darkgreen/10 shadow-sm">
                        <MapPin className="w-4 h-4 text-darkgreen/40" />
                        <select value={stateFilter} onChange={e => setStateFilter(e.target.value)} className="outline-none text-sm text-darkgreen bg-transparent">
                            <option value="all">All States</option>
                            {states.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="bg-white rounded-2xl p-16 text-center border border-darkgreen/5">
                    <Users className="w-12 h-12 text-darkgreen/20 mx-auto mb-3" />
                    <p className="text-darkgreen/40">{members.length === 0 ? 'No members registered yet.' : 'No members match your search.'}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((member, i) => (
                        <motion.div key={member._id}
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                            className="bg-white rounded-2xl p-5 border border-darkgreen/5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                        >
                            {/* Actions Overlay */}
                            {isSuperAdmin && (
                                <button
                                    onClick={() => handleDelete(member._id, `${member.firstName} ${member.lastName}`)}
                                    disabled={deletingId === member._id}
                                    className="absolute top-4 right-4 p-2 rounded-lg bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white disabled:opacity-50"
                                    title="Delete Member"
                                >
                                    {deletingId === member._id ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                </button>
                            )}

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-darkgreen flex items-center justify-center text-white font-bold text-sm shrink-0">
                                    {member.firstName[0]}{member.lastName[0]}
                                </div>
                                <div className="min-w-0 pr-8">
                                    <p className="font-bold text-darkgreen text-sm truncate">{member.firstName} {member.lastName}</p>
                                    <p className="text-xs text-darkgreen/40 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />{member.state} · {member.lga}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2 text-xs text-darkgreen/60">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5 shrink-0" />
                                    <span className="truncate">{member.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5 shrink-0" />
                                    <span>{member.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CreditCard className="w-3.5 h-3.5 shrink-0" />
                                    <span className="truncate">VIN: {member.votersCard}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                                    <span>Joined {new Date(member.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-darkgreen/5 flex items-center justify-between">
                                <span className="text-[10px] uppercase tracking-wider text-darkgreen/30 font-medium">Ward: {member.ward}</span>
                                <span className="text-[10px] bg-lightgreen text-darkgreen font-bold px-2 py-0.5 rounded-full">Member</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
