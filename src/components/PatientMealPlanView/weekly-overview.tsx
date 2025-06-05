import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function WeeklyOverview() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Visão semanal</CardTitle>
                <CardDescription>Seu plano alimentar essa semana</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4" />
                    <p>Visão semanal do plano alimentar em breve...</p>
                </div>
            </CardContent>
        </Card>
    )
}