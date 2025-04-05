import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { User, UserPlus } from "lucide-react";
import Link from "next/link";
export default function DashboardPage() {
    return (
        <>
            <div className="pb-3">
                <h1 className="text-3xl font-bold text-primary-custom">Olá, Carol</h1>
                <h2 className="text-muted-foreground">Gerencie seus pacientes e registros de forma eficiente.</h2>
            </div>

            <div className="flex flex-1 flex-col gap-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3 max-w-300">
                    <div className="aspect-video rounded-xl bg-muted/50">
                        <Card>
                            <CardContent>
                                <div className="flex flex-col items-center text-center space-y-3">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <UserPlus className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">
                                            Crie um novo registro de paciente com informações médicas e de contato
                                        </h3>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-center pb-6">
                                <Link href="/dashboard/professional/new-patient" className="text-primary">
                                    <Button variant={"primary"} className="w-full cursor-pointer">
                                        Cadastrar novo paciente
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="aspect-video rounded-xl bg-muted/50">
                        <Card>
                            <CardContent>
                                <div className="flex flex-col items-center text-center space-y-3">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <User className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">
                                            Veja todas as informações médicas e de contato de seus pacientes
                                        </h3>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-center pb-6">
                                <Link href="/dashboard/professional/all-patients">
                                    <Button variant={"primary"} className="w-full cursor-pointer">
                                        Ver todos os pacientes
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div >
        </>
    );
}
