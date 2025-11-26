import { Types } from "mongoose";
import { InvoiceStatus } from "../infrastructure/utils/constants";

export interface InvoiceEntity {
  _id?: Types.ObjectId;
  order: Types.ObjectId;
  amount: number;
  dueDate: Date;
  status: InvoiceStatus;
  issuedTo: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
