import mongoose, { Document, Schema } from "mongoose";

export interface InvoiceDocument extends Document {
  order: mongoose.Types.ObjectId;
  amount: number;
  dueDate: Date;
  status: string;
  issuedTo: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceSchema = new Schema<InvoiceDocument>(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, default: "draft" },
    issuedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const InvoiceModel = mongoose.model<InvoiceDocument>("Invoice", InvoiceSchema);
