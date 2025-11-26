import mongoose, { Document, Schema } from "mongoose";
import { VehicleEntity } from "../../domain/vehicle.entity";

export type VehicleDocument = Omit<Document, "model"> & VehicleEntity;

const VehicleSchema = new Schema<VehicleDocument>(
  {
    title: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number },
    condition: { type: String },
    status: { type: String, enum: ["available", "reserved", "sold"], default: "available" },
    description: { type: String },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const VehicleModel = mongoose.model<VehicleDocument>("Vehicle", VehicleSchema);
