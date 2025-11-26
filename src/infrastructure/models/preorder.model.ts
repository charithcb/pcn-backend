import mongoose, { Document, Schema } from "mongoose";

export interface PreorderDocument extends Document {
  customer: mongoose.Types.ObjectId;
  desiredMake?: string;
  desiredModel?: string;
  budget?: number;
  notes?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const PreorderSchema = new Schema<PreorderDocument>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    desiredMake: { type: String },
    desiredModel: { type: String },
    budget: { type: Number },
    notes: { type: String },
    status: { type: String, default: "new" },
  },
  { timestamps: true }
);

export const PreorderModel = mongoose.model<PreorderDocument>("Preorder", PreorderSchema);
