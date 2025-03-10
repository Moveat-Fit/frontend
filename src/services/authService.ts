import axios from 'axios';

const URL_BASE = 'http://127.0.0.1:5000';

// Definir o tipo de dados que a API retorna (supondo que seja algo como um token)
export interface RegisterProps {
    name: string,
    email: string,
    password: string,
    //confirmPassword: string,
    //occupationDocument: string,
    cpf: string,
    cellphone: string,
    user_type: string
}

export interface LoginResponse {
    token: string; // Defina conforme a estrutura de sua resposta
}

export interface RegisterResponse {
    message: string; // Mensagem de sucesso ou erro (ajuste conforme a resposta da sua API)
}

export const loginService = async (credentials: { login: string; password: string }): Promise<LoginResponse> => {
    console.log(credentials)
    try {
        const response = await axios.post(URL_BASE + "/login", {
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
            throw new Error('Erro ao fazer login: ' + error.response?.data.message || 'Erro desconhecido');
        } else {
            console.error('Erro desconhecido', error);
            throw new Error('Erro desconhecido');
        }
    }
};


export const registerService = async (userData: RegisterProps): Promise<RegisterResponse> => {
    console.log(userData)
    try {
        const response = await axios.post(URL_BASE + "/register", {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            cpf: userData.cpf,
            cellphone: userData.cellphone,
            user_type: userData.user_type
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Erro na requisição:', error.response?.data || error.message);
            throw new Error('Erro ao cadastrar usuário: ' + error.response?.data.message || 'Erro desconhecido');
        } else {
            console.error('Erro desconhecido', error);
            throw new Error('Erro desconhecido');
        }
    }
};
