import crypto from "crypto";
import { env } from "../../config/env";

type Payload = Record<string, unknown> & { exp?: number };

const base64Url = (input: Buffer | string) =>
  Buffer.from(input).toString("base64url");

const fromBase64Url = (input: string) =>
  Buffer.from(input, "base64url").toString();

export const signToken = (payload: Payload, ttlSeconds = env.tokenTtlSeconds) => {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const body = { ...payload, exp };

  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedBody = base64Url(JSON.stringify(body));
  const unsigned = `${encodedHeader}.${encodedBody}`;
  const signature = crypto
    .createHmac("sha256", env.jwtSecret)
    .update(unsigned)
    .digest("base64url");

  return `${unsigned}.${signature}`;
};

export const verifyToken = (token: string): Payload | null => {
  const [header, body, signature] = token.split(".");
  if (!header || !body || !signature) return null;

  const unsigned = `${header}.${body}`;
  const expected = crypto
    .createHmac("sha256", env.jwtSecret)
    .update(unsigned)
    .digest("base64url");

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }

  const parsed = JSON.parse(fromBase64Url(body)) as Payload;
  if (parsed.exp && parsed.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return parsed;
};
