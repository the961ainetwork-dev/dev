import { cookies } from "next/headers";

export const ADMIN_COOKIE = "admin_session";
const ADMIN_PASSWORD = "Maan70939779";
const SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.SUPABASE_JWT_SECRET ||
  "ci-admin-fallback-secret-2026";

const enc = new TextEncoder();

async function getKey() {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function bufToHex(buf: ArrayBuffer): string {
  const view = new Uint8Array(buf);
  let out = "";
  for (let i = 0; i < view.length; i++) {
    out += view[i].toString(16).padStart(2, "0");
  }
  return out;
}

function hexToBuf(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) return new Uint8Array(0);
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return out;
}

async function sign(value: string): Promise<string> {
  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return bufToHex(sig);
}

export async function buildSessionToken(): Promise<string> {
  const issued = Date.now().toString();
  const sig = await sign(issued);
  return `${issued}.${sig}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [issued, sig] = token.split(".");
  if (!issued || !sig) return false;
  const issuedAt = Number(issued);
  if (!Number.isFinite(issuedAt)) return false;
  const ageMs = Date.now() - issuedAt;
  if (ageMs < 0 || ageMs > 30 * 24 * 60 * 60 * 1000) return false;
  try {
    const key = await getKey();
    const sigBuf = hexToBuf(sig);
    return await crypto.subtle.verify("HMAC", key, sigBuf, enc.encode(issued));
  } catch {
    return false;
  }
}

// Constant-time string compare without Node crypto
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export function checkAdminPassword(input: string): boolean {
  if (typeof input !== "string") return false;
  return constantTimeEqual(input, ADMIN_PASSWORD);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  return verifySessionToken(token);
}
