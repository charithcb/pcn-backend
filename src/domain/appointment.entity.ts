import { Types } from "mongoose";
import { AppointmentStatus } from "../infrastructure/utils/constants";

export interface AppointmentEntity {
  _id?: Types.ObjectId;
  customer: Types.ObjectId;
  vehicle?: Types.ObjectId;
  scheduledAt: Date;
  status: AppointmentStatus;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
