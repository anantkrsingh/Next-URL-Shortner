// Small fetch wrapper shared by every TanStack Query hook: parses JSON and
// turns a non-OK response into a thrown Error carrying the server's message.

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: init?.body ? { "Content-Type": "application/json", ...init.headers } : init?.headers,
    ...init,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    throw new ApiError(
      (data && typeof data.error === "string" && data.error) || "Something went wrong",
      res.status
    );
  }

  return data as T;
}
