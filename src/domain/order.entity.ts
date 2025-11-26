import { Types } from "mongoose";
import { OrderStatus } from "../infrastructure/utils/constants";

export interface OrderEntity {
  _id?: Types.ObjectId;
  customer: Types.ObjectId;
  vehicle: Types.ObjectId;
  price: number;
  status: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
