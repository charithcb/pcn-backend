import crypto from "crypto";

const ITERATIONS = 120000;
const KEY_LENGTH = 64;

export const hashPassword = (password: string): string => {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, "sha512")
    .toString("hex");
  return `${salt}:${derived}`;
};

export const verifyPassword = (password: string, stored: string): boolean => {
  const [salt, hashed] = stored.split(":");
  if (!salt || !hashed) return false;
  const derived = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, "sha512")
    .toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hashed), Buffer.from(derived));
};
