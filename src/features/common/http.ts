import { API_BASE_URL } from "./config";

const TOKEN_KEY = "cybershield_token";

export class HttpError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "HttpError";
  }
}

export async function http<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers, cache: "no-store" });
  if (response.status === 401 && typeof window !== "undefined") {
    window.localStorage.removeItem(TOKEN_KEY);
    if (!window.location.pathname.startsWith("/login") && !window.location.pathname.startsWith("/registro")) {
      window.location.assign("/login");
    }
  }

  const payload = await response.json().catch(() => null) as { error?: string } | null;
  if (!response.ok) throw new HttpError(payload?.error || "No se pudo completar la solicitud.", response.status);
  return payload as T;
}
