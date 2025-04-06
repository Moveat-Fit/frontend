import axios from 'axios';
import { getProfessionalId } from '@/utils/tokenUtil';



const URL_BASE = 'http://127.0.0.1:5000';

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

export interface LoginResponse {
    access_token: string;
}

export interface RegisterResponse {
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






