/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { getProfessionalId } from '@/utils/tokenUtil';
import { RegisterPatientProps, RegisterProfessionalProps, RegisterResponse, UpdatePatientProps } from './types';

const URL_BASE = 'http://127.0.0.1:5000';



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
        console.error("unknowno ao atualizar o paciente:", error);

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
