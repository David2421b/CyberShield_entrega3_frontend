import { http } from "../../common/http";
import type { AuthResponse, LoginRequest, RegisterRequest, User } from "../domain/user";

export async function login(input: LoginRequest) {
  const response = await http<{ data: AuthResponse }>("/api/auth/login", { method: "POST", body: JSON.stringify(input) });
  return response.data;
}

export async function register(input: RegisterRequest) {
  const response = await http<{ data: User }>("/api/auth/register", { method: "POST", body: JSON.stringify(input) });
  return response.data;
}
