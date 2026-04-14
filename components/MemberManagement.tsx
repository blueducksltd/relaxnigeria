'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'motion/react'
import { Trash2, Search, Users, Shield, Mail, Calendar } from 'lucide-react'

interface Member {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
  createdAt: string
}

export default function MemberManagement() {
  const { data: session } = useSession()
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const userRole = (session?.user as any)?.role
  const isSuperAdmin = userRole === 'super-admin'

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      setError('')
      console.log('Fetching members from API...')
      const response = await fetch('/api/members')
      console.log('Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('API response data:', data)
        setMembers(data.members || [])
      } else {
        console.log('API response not ok:', response.statusText)
        setError('Failed to fetch members')
      }
    } catch (error) {
      console.error('Error fetching members:', error)
      setError('Error fetching members')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMember = async (memberId: string, memberName: string) => {
    if (!confirm(`Are you sure you want to delete ${memberName}? This action cannot be undone.`)) {
      return
    }

    try {
      setDeleting(memberId)
      const response = await fetch(`/api/admin/delete-member?memberId=${memberId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        const data = await response.json()
        setSuccess(data.message)
        setMembers(members.filter(m => m._id !== memberId))
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Failed to delete member')
        setTimeout(() => setError(''), 3000)
      }
    } catch (error) {
      setError('Error deleting member')
      setTimeout(() => setError(''), 3000)
    } finally {
      setDeleting(null)
    }
  }

  const filteredMembers = members.filter(member => 
    `${member.firstName} ${member.lastName} ${member.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isSuperAdmin) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
        <Shield className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-yellow-800">Super Admin Access Required</h3>
        <p className="text-yellow-700">Only super administrators can manage members.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-darkgreen flex items-center gap-2">
          <Users className="w-6 h-6" />
          Member Management
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-darkgreen/40 w-4 h-4" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-darkgreen/20 rounded-lg focus:ring-2 focus:ring-darkgreen/30 outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm border border-green-100">
          {success}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-darkgreen"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-darkgreen text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Joined</th>
                  {isSuperAdmin && <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <motion.tr
                    key={member._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {member.firstName} {member.lastName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="w-4 h-4 mr-2" />
                        {member.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.role === 'super-admin' 
                          ? 'bg-red-100 text-red-800' 
                          : member.role === 'admin' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(member.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    {isSuperAdmin && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteMember(member._id, `${member.firstName} ${member.lastName}`)}
                          disabled={deleting === member._id}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deleting === member._id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
