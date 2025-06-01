import { z } from "zod";

export const mealPlanSchema = z.object({
    planName: z.string().min(1, "Nome do plano é obrigatório."),
    startDate: z.date({ message: "Data de início é obrigatória." }),
    endDate: z.date({ message: "Data de início é obrigatória." }),
    goals: z.string().optional(),
    meals: z.array(
        z.object({
            name: z.string().min(1, "Título da refeição é obrigatório."),
            time: z.string().min(1, "Horário é obrigatório."),
            notes: z.string().optional(),
            foods: z.array(
                z.object({
                    name: z.string().min(1, "Selecionar um alimento é obrigatório."),
                    portion: z.preprocess((val) => {
                        if (val === "") return undefined;
                        return Number(val);
                    }, z.number({
                        required_error: "Porção é obrigatória.",
                        invalid_type_error: "Porção deve ser um número válido.",
                    }).min(1, { message: "Porção deve ser maior que 0." })),


                    unit_measure: z.string(),
                    notes: z.string().optional()
                })
            ).min(1, "Pelo menos um alimento é obrigatório.")
        })
    ).min(1, "Pelo menos uma refeição é obrigatória.")
});

export type MealPlanFormData = z.infer<typeof mealPlanSchema>;
