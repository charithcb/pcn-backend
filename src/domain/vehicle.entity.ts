import { Types } from "mongoose";

export interface VehicleEntity {
  _id?: Types.ObjectId;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  condition?: string;
  status: "available" | "reserved" | "sold";
  description?: string;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
