import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type Props = {
    mealIndex: number;
    foodIndex: number;
};

export function FoodReactiveCalories({ mealIndex, foodIndex }: Props) {
    const { setValue, control } = useFormContext();

    const portion = useWatch({ control, name: `meals.${mealIndex}.foods.${foodIndex}.portion` });
    const basePortion = useWatch({ control, name: `meals.${mealIndex}.foods.${foodIndex}.base_portion` });
    const baseCalories = useWatch({ control, name: `meals.${mealIndex}.foods.${foodIndex}.base_calories` });

    useEffect(() => {
        const numericPortion = parseFloat(portion);
        const numericBasePortion = parseFloat(basePortion);
        const numericBaseCalories = parseFloat(baseCalories);

        if (
            !isNaN(numericPortion) &&
            !isNaN(numericBasePortion) &&
            !isNaN(numericBaseCalories) &&
            numericBasePortion !== 0
        ) {
            const result = (numericPortion * numericBaseCalories) / numericBasePortion;
            setValue(`meals.${mealIndex}.foods.${foodIndex}.calories`, Math.round(result));
        }
    }, [portion, basePortion, baseCalories, setValue, mealIndex, foodIndex]);

    return null;
}
