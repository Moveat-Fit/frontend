import axios from 'axios';
import { PatientResponse } from './types';

const URL_BASE = 'http://127.0.0.1:5000';

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




