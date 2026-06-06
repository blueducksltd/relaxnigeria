import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    votersCard: { type: String, trim: true },
    nin: { type: String, trim: true },
    state: { type: String, required: true },
    lga: { type: String },
    ward: { type: String, required: true },
    dob: { type: String, required: true },
    role: { type: String, default: "user" },
    idCardFrontUrl: { type: String },
    idCardBackUrl: { type: String },
    idCardUpdatedAt: { type: Date },
  },
  { timestamps: true }
);

// Clear cached model to ensure schema updates are loaded on Next.js hot-reloads
if (models.User) {
  delete (models as any).User;
}

const User = model("User", UserSchema);
export default User;
