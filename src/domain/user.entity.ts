import { Types } from "mongoose";
import { UserRole } from "../infrastructure/utils/constants";

export interface UserEntity {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
