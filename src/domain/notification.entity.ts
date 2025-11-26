import { Types } from "mongoose";
import { NotificationType } from "../infrastructure/utils/constants";

export interface NotificationEntity {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
