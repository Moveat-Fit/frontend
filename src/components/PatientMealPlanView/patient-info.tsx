import { User, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function PatientInfo() {
    const { user } = useAuth();

    const patientAge = user?.birth_date
        ? new Date().getFullYear() - Number(user.birth_date.split("-")[0])
        : undefined;

    const targetWeight = user?.weight
        ? Number(user.weight) - 3
        : "Não definido";

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage alt={""}>
                                    <User2 />
                                </AvatarImage>
                                <AvatarFallback>
                                    <User className="h-8 w-8" />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-2xl">{user?.full_name}</CardTitle>
                                <CardDescription className="text-base">
                                    Idade: {patientAge}
                                </CardDescription>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-muted-foreground">Peso atual</div>
                            <div className="text-2xl font-bold">{user?.weight}</div>
                            <div className="text-sm text-muted-foreground">
                                Objetivo: {targetWeight}
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}
