import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomPayload extends JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  id?: string;
  role?: string;
  email?: string;
  full_name?: string;
  phone?: string;
  cpf?: string;
  regional_council_type?: string;
  regional_council?: string;
  type?: string;
}


export function getDecodedToken(): CustomPayload | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    return jwtDecode<CustomPayload>(token);
  } catch (err) {
    console.error("Erro ao decodificar token:", err);
    return null;
  }
}

export function getProfessionalId(): string | null {
  const decoded = getDecodedToken();
  return decoded?.id ?? null;
}

export function getProfessionalName(): string | null {
  const decoded = getDecodedToken();
  return decoded?.full_name ?? null;
}

export function getProfessionalEmail(): string | null {
  const decoded = getDecodedToken();
  return decoded?.email ?? null;
}

export function getUserId(): string | null {
  const decoded = getDecodedToken();
  return decoded?.id ?? null;
}
