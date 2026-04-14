"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Calendar as CalendarIcon,
  Upload,
  X,
  Loader2,
  Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("image", imageFile);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setShowAddModal(false);
        fetchEvents();
        // Reset form
        setTitle("");
        setDescription("");
        setDate("");
        setImageFile(null);
        setImagePreview(null);
      }
    } catch (err) {
      console.error("Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch("/api/events", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        fetchEvents();
      }
    } catch (err) {
      console.error("Failed to delete event");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-darkgreen font-laybar">Events Management</h2>
          <p className="text-darkgreen/60 mt-1 text-sm sm:text-base">Add, edit, or remove campaign events.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto bg-darkgreen text-milk px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-darkgreen/90 transition-all shadow-lg shadow-darktext-darkgreen/10"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-darkgreen" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <motion.div
              layout
              key={event._id}
              className="bg-white rounded-2xl overflow-hidden border border-darktext-darkgreen/5 shadow-sm group"
            >
              <div className="relative h-48 bg-milk">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleDelete(event._id)}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg sm:opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 text-darkgreen/50 text-[10px] sm:text-xs mb-2">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-darkgreen mb-2 line-clamp-1">{event.title}</h3>
                <p className="text-darkgreen/70 text-xs sm:text-sm line-clamp-2">{event.description}</p>
              </div>
            </motion.div>
          ))}
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
              className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="bg-darkgreen p-5 sm:p-6 text-milk flex justify-between items-center shrink-0">
                <h3 className="text-lg sm:text-xl font-bold font-laybar text-lightgreen">Add New Event</h3>
                <button onClick={() => setShowAddModal(false)} className="hover:bg-white/10 p-1 rounded-lg">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-darkgreen mb-1">Event Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-milk/50 border border-darktext-darkgreen/10 rounded-xl focus:ring-2 focus:ring-darktext-darkgreen outline-none text-sm"
                        placeholder="Project Launch..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-darkgreen mb-1">Event Date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 bg-milk/50 border border-darktext-darkgreen/10 rounded-xl focus:ring-2 focus:ring-darktext-darkgreen outline-none text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-darkgreen mb-1">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 bg-milk/50 border border-darktext-darkgreen/10 rounded-xl focus:ring-2 focus:ring-darktext-darkgreen outline-none h-24 sm:h-32 resize-none text-sm"
                        placeholder="Describe the event..."
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-darkgreen mb-1 text-center lg:text-left">Event Image</label>
                    <div className="relative aspect-video bg-milk rounded-xl sm:rounded-2xl border-2 border-dashed border-darktext-darkgreen/20 flex flex-col items-center justify-center overflow-hidden hover:border-darktext-darkgreen/40 transition-all cursor-pointer">
                      <input
                        type="file"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        accept="image/*"
                        required
                      />
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-4">
                          <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-darkgreen/30 mx-auto mb-2" />
                          <p className="text-xs sm:text-sm text-darkgreen/50">Click to upload image</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-8 pt-6 border-t border-darktext-darkgreen/10 shrink-0">
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
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Event"}
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
