import { UserModel } from "../models/user.model";
import { UserEntity } from "../../domain/user.entity";
import { Types } from "mongoose";
import { IUserRepository } from "../../domain/interfaces/user.repository.interface";

export class UserRepository implements IUserRepository {
  async create(user: Partial<UserEntity>) {
    const instance = new UserModel(user);
    return instance.save();
  }

  async findByEmail(email: string) {
    return UserModel.findOne({ email }).exec();
  }

  async findById(id: string | Types.ObjectId) {
    return UserModel.findById(id).exec();
  }

  async list() {
    return UserModel.find().sort({ createdAt: -1 }).exec();
  }

  async update(id: string, updates: Partial<UserEntity>) {
    return UserModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }
}
