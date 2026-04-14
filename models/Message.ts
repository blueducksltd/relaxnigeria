import mongoose, { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    subject: { type: String, required: true },
    body: { type: String, required: true },
    sentBy: { type: String, required: true }, // admin name
    readBy: [{ type: String }], // array of user IDs who read it
  },
  { timestamps: true }
);

const Message = models.Message || model("Message", MessageSchema);
export default Message;
