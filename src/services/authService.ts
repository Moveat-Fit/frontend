/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { getProfessionalId } from '@/utils/tokenUtil';
import { showToastError } from '@/utils/toast';



const URL_BASE = 'http://127.0.0.1:5000';

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
    mobile: string,
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


export interface LoginResponse {
    access_token: string;
}

export interface RegisterResponse {
    message: string;
}

export interface UpdateResponse {
    message: string;
}

export const professionalLoginService = async (credentials: { login: string; password: string }): Promise<LoginResponse> => {
    try {
        const response = await axios.post(URL_BASE + "/professional", {
            login: credentials.login,
            password: credentials.password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || 'Erro desconhecido');
        } else {
            console.error('Erro desconhecido', error);
            throw new Error('Erro desconhecido');
        }
    }
};

export const patientlLoginService = async (credentials: { login: string; password: string }): Promise<LoginResponse> => {
    try {
        const response = await axios.post(URL_BASE + "/patient", {
            login: credentials.login,
            password: credentials.password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || 'Erro desconhecido');
        } else {
            console.error('Erro desconhecido', error);
            throw new Error('Erro desconhecido');
        }
    }
};


export const professionalRegisterService = async (userData: RegisterProfessionalProps): Promise<RegisterResponse> => {
    try {
        const response = await axios.post(URL_BASE + "/register", {
            full_name: userData.full_name,
            email: userData.email,
            password: userData.password,
            cpf: userData.cpf,
            phone: userData.phone,
            regional_council_type: userData.regional_council_type,
            regional_council: userData.regional_council
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || 'Erro desconhecido');
        } else {
            console.error('Erro desconhecido', error);
            throw new Error('Erro desconhecido');
        }
    }
};


export const professionalRegisterNewPatientService = async (userData: RegisterPatientProps): Promise<RegisterResponse> => {
    try {
        const response = await axios.post(URL_BASE + "/register/patient", {
            full_name: userData.full_name,
            birth_date: userData.birth_date,
            gender: userData.gender,
            email: userData.email,
            password: userData.password,
            mobile: userData.mobile,
            cpf: userData.cpf,
            weight: userData.weight,
            height: userData.height,
            note: userData.note,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || 'Erro desconhecido');
        } else {
            console.error('Erro desconhecido', error);
            throw new Error('Erro desconhecido');
        }
    }
};

export const findPatientDataById = async (patientId: string): Promise<PatientResponse> => {
    try {
        const response = await axios.get(`${URL_BASE}/patient/${patientId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || 'Erro desconhecido');
        } else {
            console.error('Erro desconhecido', error);
            throw new Error('Erro desconhecido');
        }
    }
};

export const professionalUpdateDataPatientService = async (
    userData: UpdatePatientProps,
    patient_id: string
): Promise<UpdatePatientProps> => {
    try {
        const response = await axios.put(URL_BASE + `/register/patient/${patient_id}`, {
            full_name: userData.full_name,
            birth_date: userData.birth_date,
            gender: userData.gender,
            email: userData.email,
            mobile: userData.mobile,
            cpf: userData.cpf,
            weight: userData.weight,
            height: userData.height,
            note: userData.note,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Erro ao atualizar o paciente:", error);

        const apiMessage =
            error?.response?.data?.message ||
            error?.data?.message ||
            error?.message ||
            "Erro ao atualizar o paciente.";

        // Remova o toast daqui (deixe para o onSubmit exibir)
        // showToastError(apiMessage);

        // Rejoga o erro para o onSubmit lidar
        throw new Error(apiMessage);
    }
};


export const professionalReadAllPatientService = async () => {
    const professionalID = getProfessionalId();
    try {
        const response = await axios.get(URL_BASE + `/patients/${professionalID}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || 'Erro desconhecido');
        } else {
            console.error('Erro desconhecido', error);
            throw new Error('Erro desconhecido');
        }
    }
};

export const deletePatientService = async (patientId: string) => {
    try {
        const response = await axios.delete(`${URL_BASE}/deletePatient/${patientId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverMessage = error.response?.data?.message;
            const statusCode = error.response?.status;

            console.error('Erro do servidor:', {
                status: statusCode,
                data: error.response?.data,
            });

            throw new Error(serverMessage || `Erro ${statusCode || ''} ao deletar paciente`);
        } else {
            console.error('Erro inesperado:', error);
            throw new Error('Erro inesperado ao deletar paciente');
        }
    }
};




