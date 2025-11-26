import { UserEntity } from "./user.entity";

export interface AuthResponse {
  user: Omit<UserEntity, "password">;
  token: string;
}
