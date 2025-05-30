import axios from 'axios';
import { LoginResponse } from './types';

const URL_BASE = 'http://127.0.0.1:5000';

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
