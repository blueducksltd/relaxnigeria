"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  UserPlus,
  X,
  Loader2,
  Shield,
  Mail,
  User as UserIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await fetch("/api/admins");
      const data = await res.json();
      if (!data.error) {
        setAdmins(data);
      }
    } catch (err) {
      console.error("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admins", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setShowAddModal(false);
        fetchAdmins();
        // Reset form
        setName("");
        setEmail("");
        setPassword("");
        setRole("admin");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create admin");
      }
    } catch (err) {
      console.error("Failed to create admin");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this admin?")) return;

    try {
      const res = await fetch("/api/admins", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        fetchAdmins();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete admin");
      }
    } catch (err) {
      console.error("Failed to delete admin");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-darkgreen font-laybar">Admin Management</h2>
          <p className="text-darkgreen/60 mt-1 text-sm sm:text-base">Manage users who have access to this portal.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto bg-darkgreen text-milk px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-darkgreen/90 transition-all shadow-lg shadow-darkgreen/10"
        >
          <UserPlus className="w-5 h-5" />
          Add Admin
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-darkgreen" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-darkgreen/10 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-milk text-darkgreen uppercase text-[10px] sm:text-xs font-bold tracking-wider">
                  <th className="px-6 sm:px-8 py-4 sm:py-5">Name</th>
                  <th className="px-6 sm:px-8 py-4 sm:py-5">Email</th>
                  <th className="px-6 sm:px-8 py-4 sm:py-5">Role</th>
                  <th className="px-6 sm:px-8 py-4 sm:py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-darkgreen/5">
                {admins.map((admin) => (
                  <tr key={admin._id} className="hover:bg-milk/30 transition-all group">
                    <td className="px-6 sm:px-8 py-4 sm:py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-darkgreen/10 flex items-center justify-center text-darkgreen shrink-0">
                          <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="font-bold text-darkgreen text-sm sm:text-base">{admin.name}</span>
                      </div>
                    </td>
                    <td className="px-6 sm:px-8 py-4 sm:py-5 text-darkgreen/70 text-sm">{admin.email}</td>
                    <td className="px-6 sm:px-8 py-4 sm:py-5">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${admin.role === 'super-admin'
                        ? 'bg-darkgreen text-lightgreen'
                        : 'bg-milk text-darkgreen'
                        }`}>
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-6 sm:px-8 py-4 sm:py-5 text-right">
                      <button
                        onClick={() => handleDelete(admin._id)}
                        className="p-2 text-darkgreen/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-darkgreen/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="bg-darkgreen p-5 sm:p-6 text-milk flex justify-between items-center shrink-0">
                <h3 className="text-lg sm:text-xl font-bold font-laybar flex items-center gap-2">
                  <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-lightgreen" />
                  Add New Admin
                </h3>
                <button onClick={() => setShowAddModal(false)} className="hover:bg-white/10 p-1 rounded-lg">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 sm:space-y-5 overflow-y-auto">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-darkgreen mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-milk/50 border border-darkgreen/10 rounded-xl focus:ring-2 focus:ring-darkgreen outline-none text-sm"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-darkgreen mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-milk/50 border border-darkgreen/10 rounded-xl focus:ring-2 focus:ring-darkgreen outline-none text-sm"
                    placeholder="assistant@relaxnigeria.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-darkgreen mb-1">Temporary Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-milk/50 border border-darkgreen/10 rounded-xl focus:ring-2 focus:ring-darkgreen outline-none text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-darkgreen mb-1">Access Level</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 bg-milk/50 border border-darkgreen/10 rounded-xl focus:ring-2 focus:ring-darkgreen outline-none appearance-none text-sm"
                  >
                    <option value="admin">Assistant Admin (Content Only)</option>
                    <option value="super-admin">Super Admin (Full Access)</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-6 border-t border-darkgreen/10 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="order-2 sm:order-1 px-6 py-3 text-darkgreen font-bold hover:bg-milk rounded-xl transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="order-1 sm:order-2 bg-darkgreen text-milk px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-darkgreen/90 transition-all disabled:opacity-50 text-sm"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Admin"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
