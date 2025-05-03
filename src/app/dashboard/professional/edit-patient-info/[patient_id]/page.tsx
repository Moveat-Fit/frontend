/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";
import { findPatientDataById, PatientDetailsProps, professionalUpdateDataPatientService } from "@/services/authService";
import { mask, unmask } from "remask";
import { showToastError, showToastSuccess } from "@/utils/toast";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "Nome deve ter pelo menos 2 caracteres.",
    }),
    lastName: z.string().min(2, {
        message: "Sobrenome deve ter pelo menos 2 caracteres.",
    }),
    dateOfBirth: z.date({
        required_error: "Data de nascimento é obrigatória.",
    }),
    gender: z.string({
        required_error: "Gênero é obrigatório.",
    }),
    email: z.string().email({
        message: "Email inválido.",
    }),
    phone: z.string().length(11, {
        message: "Telefone deve ter 11 dígitos.",
    }),
    cpf: z.string().length(11, {
        message: "CPF deve ter 11 dígitos.",
    }),
    weight: z.string().refine(val => /^\d{1,3}(\.\d)?$/.test(val), {
        message: "Peso inválido. Ex: 80.5"
    }),
    height: z.string().refine(val => /^\d\.\d{2}$/.test(val), {
        message: "Altura inválida. Ex: 1.75"
    }),

    observations: z.string().optional(),
})

const genders = [
    { label: "Masculino", value: "M" },
    { label: "Feminino", value: "F" },
    { label: "Outro", value: "O" },
]



export default function EditPatientInfoPage() {
    const { patient_id } = useParams();

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false)




    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            cpf: "",
            weight: "",
            height: "",
            observations: "",
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        console.log("Formulário enviado com os seguintes dados: " + JSON.stringify(values));

        const patientData: PatientDetailsProps = {
            full_name: `${values.firstName} ${values.lastName}`,
            birth_date: values.dateOfBirth instanceof Date ? values.dateOfBirth.toISOString().split('T')[0] : "",
            gender: values.gender.toUpperCase(),
            email: values.email,
            mobile: values.phone,
            cpf: values.cpf,
            weight: values.weight,
            height: values.height,
            note: values?.observations || "",
        };

        try {
            const response = await professionalUpdateDataPatientService(patientData, patient_id as string);
            console.log("Resposta da API:", response);
            showToastSuccess("Paciente atualizado com sucesso!");
            router.push("/dashboard/professional/all-patients");
        } catch (error: any) {
            console.error("Erro ao atualizar o paciente:", error);

            const apiMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Erro ao atualizar o paciente.";

            showToastError(apiMessage);
        }
        finally {
            setIsSubmitting(false);
        }
    };





    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await findPatientDataById(patient_id as string);
                const patient = response.patient?.[0];

                if (!patient) return;

                const [firstName, ...rest] = patient.full_name?.split(" ") || [];
                const lastName = rest.join(" ");

                form.reset({
                    firstName: firstName || "",
                    lastName: lastName || "",
                    phone: patient.mobile || "",
                    email: patient.email || "",
                    observations: patient.note || "",
                    dateOfBirth: patient.birth_date ? new Date(patient.birth_date) : undefined,
                    gender: patient.gender.toUpperCase() || "",
                    cpf: patient.cpf || "",
                    weight: patient.weight || "",
                    height: patient.height || "",
                });

                console.log("Dados do paciente:", response);
            } catch (error) {
                console.error("Erro ao buscar dados do paciente:", error);
            }
        };

        if (patient_id) {
            fetchPatientData();
        }
    }, [patient_id, form]);



    return (
        <div className="w-full max-w-4xl">
            <div className="mb-6">
                <h1 className="text-3xl font-semibold text-primary-custom">Alteração de dados do paciente</h1>
                <p className="text-muted-foreground">Por favor preencha o formulário abaixo para atualizar os dados de um paciente</p>
            </div>
            <div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="João" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Sobrenome *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Pedro" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="dateOfBirth"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Data de nascimento *</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? format(field.value, "PPP", { locale: ptBR })
                                                                : <span>Escolha uma data</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        captionLayout="dropdown"
                                                        fromYear={1950}
                                                        toYear={new Date().getFullYear()}
                                                        locale={ptBR}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />

                                                </PopoverContent>
                                            </Popover>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Número de Telefone *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    maxLength={15}
                                                    placeholder="(11) 98765-4321"
                                                    value={mask(field.value, ["(99) 99999-9999"])}
                                                    onChange={(e) => {
                                                        const raw = unmask(e.target.value);
                                                        field.onChange(raw);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="cpf"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>CPF *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    maxLength={14}
                                                    placeholder="000.000.000-00"
                                                    value={mask(field.value, ["999.999.999-99"])}
                                                    onChange={(e) => {
                                                        const rawValue = unmask(e.target.value);
                                                        field.onChange(rawValue);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Gênero *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Selecione o gênero" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {genders.map((gender) => (
                                                        <SelectItem key={gender.value} value={gender.value}>
                                                            {gender.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />



                            </div>
                            <div className="space-y-6">

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email *</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="joaopedro@exemplo.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="weight"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Peso (kg) *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="80.5"
                                                    inputMode="decimal"
                                                    pattern="^\d{1,3}(\.\d)?$"
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (/^\d{0,3}(\.\d{0,1})?$/.test(value)) {
                                                            field.onChange(value);
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />




                                <FormField
                                    control={form.control}
                                    name="height"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Altura *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="1.75"
                                                    value={mask(field.value, ["9.99"])}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="observations"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Observações</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="" className="resize-none h-30" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between gap-4">
                            <Link href="/dashboard">
                                <Button type="button" variant={"cancel"} className="w-50 cursor-pointer" disabled={isSubmitting}>
                                    {isSubmitting ? "Cancelando..." : "Cancelar"}
                                </Button>
                            </Link>
                            <Button variant={"primary"} type="submit" className="w-50">
                                Cadastrar
                            </Button>
                        </div>

                    </form>
                </Form>
            </div>
            <footer className="mt-5 text-sm text-muted-foreground">
                <p>Fique tranquilo(a). Todas as informações são confidenciais e gerido por nós da equipe Moveat.</p>
            </footer>

        </div>
    )
}
