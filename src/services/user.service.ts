import { UserRepository } from "../infrastructure/repositories/user.repository";
import { UserEntity } from "../domain/user.entity";
import { ServiceError } from "./errors";

const stripPassword = (user: UserEntity) => {
  const { password, ...rest } = (user as any).toObject ? (user as any).toObject() : user;
  return rest as Omit<UserEntity, "password">;
};

export class UserService {
  constructor(private readonly repository = new UserRepository()) {}

  async list() {
    const users = await this.repository.list();
    return users.map(stripPassword);
  }

  async get(id: string) {
    const user = await this.repository.findById(id);
    if (!user) throw new ServiceError(404, "User not found");
    return stripPassword(user as any);
  }

  async update(id: string, updates: Partial<UserEntity>) {
    const updated = await this.repository.update(id, updates);
    if (!updated) throw new ServiceError(404, "User not found");
    return stripPassword(updated as any);
  }
}
