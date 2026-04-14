import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    votersCard: { type: String, required: true, trim: true },
    state: { type: String, required: true },
    lga: { type: String, required: true },
    ward: { type: String, required: true },
    role: { type: String, default: "user" },
    idCardFrontUrl: { type: String },
    idCardBackUrl: { type: String },
    idCardUpdatedAt: { type: Date },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
