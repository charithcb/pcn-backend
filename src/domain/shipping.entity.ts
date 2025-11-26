import { Types } from "mongoose";
import { ShippingStatus } from "../infrastructure/utils/constants";

export interface ShippingEntity {
  _id?: Types.ObjectId;
  order: Types.ObjectId;
  address: string;
  city?: string;
  country?: string;
  trackingNumber?: string;
  status: ShippingStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
