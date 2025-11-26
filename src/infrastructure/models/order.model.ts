import mongoose, { Document, Schema } from "mongoose";
import { OrderStatus, ORDER_STATUSES } from "../utils/constants";

export interface OrderDocument extends Document {
  customer: mongoose.Types.ObjectId;
  vehicle: mongoose.Types.ObjectId;
  price: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<OrderDocument>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ORDER_STATUSES, default: "pending" },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<OrderDocument>("Order", OrderSchema);
