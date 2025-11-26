import { Types } from "mongoose";
import { PreorderStatus } from "../infrastructure/utils/constants";

export interface PreorderEntity {
  _id?: Types.ObjectId;
  customer: Types.ObjectId;
  desiredMake?: string;
  desiredModel?: string;
  budget?: number;
  notes?: string;
  status: PreorderStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
