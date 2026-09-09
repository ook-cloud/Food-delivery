const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetcher(endpoint: string, options?: RequestInit) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Хүсэлт амжилтгүй боллоо");
  }

  return res.json();
}