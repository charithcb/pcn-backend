import mongoose, { Document, Schema } from "mongoose";

export interface NotificationDocument extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<NotificationDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, default: "system" },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const NotificationModel = mongoose.model<NotificationDocument>(
  "Notification",
  NotificationSchema
);
