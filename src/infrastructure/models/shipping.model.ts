import mongoose, { Document, Schema } from "mongoose";

export interface ShippingDocument extends Document {
  order: mongoose.Types.ObjectId;
  address: string;
  city?: string;
  country?: string;
  trackingNumber?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const ShippingSchema = new Schema<ShippingDocument>(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    address: { type: String, required: true },
    city: { type: String },
    country: { type: String },
    trackingNumber: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const ShippingModel = mongoose.model<ShippingDocument>("Shipping", ShippingSchema);
