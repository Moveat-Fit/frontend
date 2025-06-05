export interface PatientDetailsProps {
    full_name: string;
    birth_date: string;
    gender: 'm' | 'f' | string;
    email: string;
    mobile: string;
    cpf: string;
    weight: number;
    height: number;
    note: string;
}

export interface PatientResponse {
    patient: PatientDetailsProps[];
}

export interface RegisterResponse {
    message: string;
}

export interface UpdateResponse {
    message: string;
}

export interface PatientResponse {
    patient: PatientDetailsProps[];
}

export interface PatientDetailsProps {
    professional_id?: number
    full_name: string;
    birth_date: string;
    gender: 'm' | 'f' | string;
    email: string;
    mobile: string;
    cpf: string;
    weight: number;
    height: number;
    note: string;
}
