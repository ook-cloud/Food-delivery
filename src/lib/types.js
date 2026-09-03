export interface User {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}
