// src/services/authService.ts
const API_URL = "https://TU_API_URL_AQUI.com/api"; // Cambia esto por tu endpoint real

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error("Credenciales inválidas");
  }
  return res.json(); // { token, email }
}

export async function register(email: string, password: string) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error("Error al registrar usuario");
  }
  return res.json(); // { token, email }
}