"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Upload,
  X,
  Loader2,
  Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GalleryItem {
  _id: string;
  title: string;
  image: string;
  date: string;
}

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch gallery");
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
    formData.append("image", imageFile);

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setShowAddModal(false);
        fetchGallery();
        // Reset form
        setTitle("");
        setImageFile(null);
        setImagePreview(null);
      }
    } catch (err) {
      console.error("Failed to upload to gallery");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;

    try {
      const res = await fetch("/api/gallery", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        fetchGallery();
      }
    } catch (err) {
      console.error("Failed to delete item");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-darkgreen font-laybar">Gallery Management</h2>
          <p className="text-darkgreen/60 mt-1 text-sm sm:text-base">Upload and manage campaign photos.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto bg-darkgreen text-milk px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-darkgreen/90 transition-all shadow-lg shadow-darkgreen/10"
        >
          <Plus className="w-5 h-5" />
          Upload Photo
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-darkgreen" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <motion.div
              layout
              key={item._id}
              className="group aspect-square relative rounded-2xl overflow-hidden shadow-sm border border-darkgreen/5 bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent sm:opacity-0 group-hover:opacity-100 transition-all p-3 sm:p-4 flex flex-col justify-end">
                <p className="text-white font-bold text-xs sm:text-sm line-clamp-1 mb-2">{item.title}</p>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-full py-1.5 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center gap-2 text-[10px] sm:text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
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
              className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="bg-darkgreen p-5 sm:p-6 text-milk flex justify-between items-center shrink-0">
                <h3 className="text-lg sm:text-xl font-bold font-laybar text-lightgreen">Upload to Gallery</h3>
                <button onClick={() => setShowAddModal(false)} className="hover:bg-white/10 p-1 rounded-lg">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-darkgreen mb-2 sm:mb-3">Photo Title / Caption</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-milk/50 border border-darkgreen/10 rounded-xl focus:ring-2 focus:ring-darkgreen outline-none text-sm"
                    placeholder="Mega Rally Highlight..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-darkgreen mb-2 sm:mb-3">Photo</label>
                  <div className="relative aspect-square sm:aspect-video w-full max-w-[320px] mx-auto bg-milk rounded-2xl sm:rounded-3xl border-2 border-dashed border-darkgreen/20 flex flex-col items-center justify-center overflow-hidden hover:border-darkgreen/40 transition-all cursor-pointer">
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
                      <div className="text-center p-6">
                        <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-darkgreen/30 mx-auto mb-3" />
                        <p className="text-xs sm:text-sm text-darkgreen/50 font-medium">Click to upload photo</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-6 border-t border-darkgreen/10 shrink-0">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-darkgreen text-milk py-3.5 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-darkgreen/90 transition-all disabled:opacity-50 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        Upload Now
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-full py-3 sm:py-4 text-darkgreen/50 font-bold hover:bg-milk rounded-xl transition-all text-sm sm:text-base"
                  >
                    Cancel
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
