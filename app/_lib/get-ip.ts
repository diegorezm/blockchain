import {headers} from "next/headers";

export async function getIp() {
  const headersStore = await headers()
  const forwardedFor = headersStore.get("x-forwarded-for");
  const realIp = headersStore.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  return null;
}
