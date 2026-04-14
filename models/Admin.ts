import mongoose, { Schema, model, models } from "mongoose";

const AdminSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["super-admin", "admin"],
      default: "admin",
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const Admin = models.Admin || model("Admin", AdminSchema);

export default Admin;
