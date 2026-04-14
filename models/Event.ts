import mongoose, { Schema, model, models } from "mongoose";

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    image: {
      type: String, // URL from Vercel Blob
      required: [true, "Image URL is required"],
    },
    category: {
      type: String,
      default: "General",
    },
  },
  { timestamps: true }
);

const Event = models.Event || model("Event", EventSchema);

export default Event;
