export interface RegisterProfessionalProps {
    full_name: string,
    email: string,
    password: string,
    cpf: string,
    phone: string,
    regional_council_type: string
    regional_council: string
}

export interface RegisterPatientProps {
    full_name: string,
    birth_date: string,
    gender: string,
    email: string,
    password: string,
    phone: string,
    cpf: string,
    weight: string,
    height: string,
    note?: string,
}

export interface UpdatePatientProps {
    full_name: string,
    birth_date: string,
    gender: string,
    email: string,
    mobile: string,
    cpf: string,
    weight: number,
    height: number,
    note?: string,
}

export interface RegisterResponse {
    message: string;
}

export interface UpdateResponse {
    message: string;
}

export interface UpdatePatientProps {
    full_name: string,
    birth_date: string,
    gender: string,
    email: string,
    mobile: string,
    cpf: string,
    weight: number,
    height: number,
    note?: string,
}

export interface RegisterProfessionalProps {
    full_name: string,
    email: string,
    password: string,
    cpf: string,
    phone: string,
    regional_council_type: string
    regional_council: string
}

export interface RegisterProfessionalProps {
    full_name: string,
    email: string,
    password: string,
    cpf: string,
    phone: string,
    regional_council_type: string
    regional_council: string
}