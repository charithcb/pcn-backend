export interface Environment {
  port: number;
  mongoUri: string;
  jwtSecret: string;
  tokenTtlSeconds: number;
}

const numeric = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env: Environment = {
  port: numeric(process.env.PORT, 5000),
  mongoUri: process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/pcn",
  jwtSecret: process.env.JWT_SECRET ?? "replace-me",
  tokenTtlSeconds: numeric(process.env.TOKEN_TTL_SECONDS, 60 * 60 * 24 * 7),
};
