import { Types } from "mongoose";
import { InquiryStatus } from "../infrastructure/utils/constants";

export interface InquiryEntity {
  _id?: Types.ObjectId;
  customer: Types.ObjectId;
  vehicle?: Types.ObjectId;
  message: string;
  status: InquiryStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
