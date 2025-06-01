/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const URL_BASE = 'http://127.0.0.1:5000';

export const fetchFoodList = async () => {
    try {
        const response = await axios.get(URL_BASE + `/api/foods`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });

        return response.data;
    } catch (error: any ) {
        console.error("Erro ao listar alimentos:", error);

        const apiMessage =
            error?.response?.data?.message ||
            error?.data?.message ||
            error?.message ||
            "Erro ao atualizar o paciente.";

        throw new Error(apiMessage);
    }
};
