import {db} from "@/db";

import {sessionsTable} from "@/db/schema";
import {encodeBase32LowerCaseNoPadding, encodeHexLowerCase} from "@oslojs/encoding";
import {sha256} from "@oslojs/crypto/sha2";
import {eq} from "drizzle-orm";

import {Session} from "@/src/modules/auth/models/session";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}


