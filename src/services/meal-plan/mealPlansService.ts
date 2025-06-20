/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { MealPlanApiPayload } from "./types";

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
    } catch (error: any) {
        console.error("Erro ao listar alimentos:", error);

        const apiMessage =
            error?.response?.data?.message ||
            error?.data?.message ||
            error?.message ||
            "Erro ao atualizar o paciente.";

        throw new Error(apiMessage);
    }
};


export const createMealPlan = async (data: any) => {
    try {
        const response = await axios.post(URL_BASE + `/api/meal-plans`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Erro ao criar plano alimentar:", error);

        const apiMessage =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Erro ao criar o plano alimentar.";

        throw new Error(apiMessage);
    }
};

export const mealPlanDetails = async (patientId: string) => {
    try {
        const response = await axios.get(URL_BASE + `/api/meal-plans/${patientId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Erro ao listar os detalhes do plano do paciente:", error);

        const apiMessage =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Erro ao listar os detalhes do plano do paciente";

        throw new Error(apiMessage);
    }
}


export const updateMealPlan = async (patientId: string, payload: MealPlanApiPayload) => {
    try {
        const response = await axios.put(URL_BASE + `/api/meal-plans/${patientId}`, payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Erro ao atualizar plano alimentar", error);

        const apiMessage =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Erro ao atualizar plano alimentar";

        throw new Error(apiMessage);
    }
}

export const deleteMealPlan = async (patientId: string) => {
    try {
        const response = await axios.delete(URL_BASE + `/api/meal-plans/${patientId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Erro ao apagar plano alimentar:", error);

        const apiMessage =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Erro ao apagar plano alimentar";

        throw new Error(apiMessage);
    }
}