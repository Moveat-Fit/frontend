export interface DecodedToken {
    id: string;
    fresh: boolean;
    iat: number;
    jti: string;
    type: string;
    sub: string;
    nbf: number;
    csrf: string;
    exp: number;
    full_name: string;
    birth_date: string;
    gender: "m" | "f" | string;
    email: string;
    phone: string;
    cpf: string;
    weight: number;
    height: number;
    role: "patient" | "professional" | string;
}
