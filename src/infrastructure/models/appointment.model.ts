import mongoose, { Document, Schema } from "mongoose";

export interface AppointmentDocument extends Document {
  customer: mongoose.Types.ObjectId;
  vehicle?: mongoose.Types.ObjectId;
  scheduledAt: Date;
  status: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<AppointmentDocument>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle" },
    scheduledAt: { type: Date, required: true },
    status: { type: String, default: "scheduled" },
    notes: { type: String },
  },
  { timestamps: true }
);

export const AppointmentModel = mongoose.model<AppointmentDocument>("Appointment", AppointmentSchema);
