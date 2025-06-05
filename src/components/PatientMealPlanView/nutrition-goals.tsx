import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function NutritionGoals() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Objetivos nutricionais</CardTitle>
                <CardDescription>Progresso e objetivo nutricional diário</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4" />
                    <p>Objetivos nutricionais do plano alimentar em breve...</p>
                </div>
            </CardContent>
        </Card>
    )
}