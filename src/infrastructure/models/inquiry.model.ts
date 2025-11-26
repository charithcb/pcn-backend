import mongoose, { Document, Schema } from "mongoose";

export interface InquiryDocument extends Document {
  customer: mongoose.Types.ObjectId;
  vehicle?: mongoose.Types.ObjectId;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<InquiryDocument>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle" },
    message: { type: String, required: true },
    status: { type: String, default: "new" },
  },
  { timestamps: true }
);

export const InquiryModel = mongoose.model<InquiryDocument>("Inquiry", InquirySchema);
