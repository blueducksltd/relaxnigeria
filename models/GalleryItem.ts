import mongoose, { Schema, model, models } from "mongoose";

const GallerySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    image: {
      type: String, // URL from Vercel Blob
      required: [true, "Image URL is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const GalleryItem = models.GalleryItem || model("GalleryItem", GallerySchema);

export default GalleryItem;
