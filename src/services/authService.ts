import axios from 'axios';

const URL_BASE = 'http://127.0.0.1:5000';

export interface RegisterProps {
    full_name: string,
    email: string,
    password: string,
    cpf: string,
    phone: string,
    regional_council_type: string
    regional_council: string
}

export interface LoginResponse {
    token: string; // Defina conforme a estrutura de sua resposta
}

export interface RegisterResponse {
    message: string; // Mensagem de sucesso ou erro (ajuste conforme a resposta da sua API)
}

export const professionalLoginService = async (credentials: { login: string; password: string }): Promise<LoginResponse> => {
    console.log(credentials)
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
            console.error('Erro na requisição:', error.response?.data || error.message);
            throw new Error(error.response?.data.message || 'Erro desconhecido');
        } else {
            console.error('Erro desconhecido', error);
            throw new Error('Erro desconhecido');
        }
    }
};


export const professionalRegisterService = async (userData: RegisterProps): Promise<RegisterResponse> => {
    console.log(userData)
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
            console.error('Erro na requisição:', error.response?.data || error.message);
            throw new Error(error.response?.data.message || 'Erro desconhecido');
        } else {
            console.error('Erro desconhecido', error);
            throw new Error('Erro desconhecido');
        }
    }
};
