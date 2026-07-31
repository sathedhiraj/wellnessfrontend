/**
 * Centralized API helper for the Frontend.
 * Uses NEXT_PUBLIC_API_URL from .env.local so you never hardcode localhost:5000.
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function apiFetch<T = unknown>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API ${res.status}: ${body}`);
  }

  return res.json() as Promise<T>;
}

// Convenience wrappers
export const apiGet = <T = unknown>(path: string) =>
  apiFetch<T>(path, { method: "GET" });

export const apiPost = <T = unknown>(path: string, body: unknown) =>
  apiFetch<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
  });

export const apiPut = <T = unknown>(path: string, body: unknown) =>
  apiFetch<T>(path, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const apiDelete = <T = unknown>(path: string) =>
  apiFetch<T>(path, { method: "DELETE" });
