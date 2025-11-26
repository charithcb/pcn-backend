import { Types } from "mongoose";
import { UserEntity } from "../user.entity";

export interface IUserRepository {
  create(user: Partial<UserEntity>): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string | Types.ObjectId): Promise<UserEntity | null>;
  list(): Promise<UserEntity[]>;
  update(id: string, updates: Partial<UserEntity>): Promise<UserEntity | null>;
}
