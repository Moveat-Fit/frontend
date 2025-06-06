import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PatientDetailsProps } from "@/services/patient/types";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, User } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import { Card, CardContent } from "../ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type PatientDetails = {
    patientData?: PatientDetailsProps;
}

export default function MealPlanDetails({ patientData }: PatientDetails) {
    const { control, reset } = useFormContext();

    const defaultValues = useMemo(() => ({
        patientName: patientData?.full_name ?? "Nome não informado",
        weight: patientData?.weight?.toString() ?? "Peso não informado",
        height: patientData?.height?.toString() ?? "Altura não informada",
        planName: "",
        startDate: undefined,
        endDate: undefined,
        goals: ""
    }), [patientData]);

    useEffect(() => {
        if (patientData) {
            console.log("Resetando com:", defaultValues);
            reset(defaultValues);
        }
    }, [patientData, reset, defaultValues]);

    return (
        <Card className="mb-6 ">
            <CardContent>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-3">
                                <User className="h-5 w-5 text-primary-custom" />
                                <h3 className="text-lg font-semibold text-gray-800">Informações do paciente</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <FormField
                                        control={control}
                                        name="patientName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Nome completo do Paciente</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        data-testid="input-patientName"
                                                        id="patientName"
                                                        placeholder="Digite o nome completo"
                                                        disabled
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <FormField
                                        control={control}
                                        name="weight"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Peso (kg)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        data-testid="input-patientWeight"
                                                        id="weight"
                                                        type="text"
                                                        placeholder="Ex: 70"
                                                        disabled
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <FormField
                                        control={control}
                                        name="height"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Altura</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        data-testid="input-patientHeight"
                                                        id="height"
                                                        type="text"
                                                        placeholder="Ex: 1.75"
                                                        disabled
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-3">
                                <CalendarDays className="h-5 w-5 text-primary-custom" />
                                <h3 className="text-lg font-semibold text-gray-800">Detalhes do plano alimentar</h3>
                            </div>

                            <div className="space-y-2">
                                <div className="space-y-2">
                                    <FormField
                                        control={control}
                                        name="planName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Título do plano alimentar *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        data-testid="input-planName"
                                                        id="planName"
                                                        placeholder="Ex: Dieta para perda de peso"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <div className="text-blue-500">
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <FormField
                                            name="startDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="text-xs">Início do plano*</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                    data-testid="input-startDatePlan"
                                                                >
                                                                    {field.value
                                                                        ? format(field.value, "PPP", { locale: ptBR })
                                                                        : <span >Selecione a data </span>}
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0 bg-white border rounded-md" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                captionLayout="dropdown"
                                                                fromYear={new Date().getFullYear()}
                                                                toYear={new Date().getFullYear()}
                                                                locale={ptBR}
                                                                disabled={(date) => {
                                                                    const yesterday = new Date();
                                                                    yesterday.setDate(yesterday.getDate());
                                                                    yesterday.setHours(0, 0, 0, 0);

                                                                    return date < yesterday;
                                                                }}

                                                                initialFocus
                                                                data-testid="calendar-startDate"
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2 mb-2">
                                        <FormField
                                            name="endDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="text-xs">Término do plano*</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                    data-testid="input-endDatePlan"
                                                                >
                                                                    {field.value
                                                                        ? format(field.value, "PPP", { locale: ptBR })
                                                                        : <span>Selecione a data</span>}
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0 bg-white border rounded-md" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                captionLayout="dropdown"
                                                                fromYear={new Date().getFullYear()}
                                                                toYear={new Date().getFullYear() + 1}
                                                                locale={ptBR}
                                                                disabled={(date) =>
                                                                    date < new Date()
                                                                }
                                                                initialFocus
                                                                data-testid="calendar-endDatePlan"
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <FormField
                                        control={control}
                                        name="goals"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Instruções ou observações adicionais</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        data-testid="input-goalsPlan"

                                                        id="specialInstructions"
                                                        placeholder="Inclua restrições, preferências ou instruções especiais"
                                                        rows={3}
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 