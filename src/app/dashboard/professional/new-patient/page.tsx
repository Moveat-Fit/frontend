/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Eye, EyeOff, WandSparkles } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";
import { professionalRegisterNewPatientService, RegisterPatientProps } from "@/services/authService";
import { mask, unmask } from "remask";
import { showToastError, showToastSuccess } from "@/utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    password: z.string().min(8, {
        message: "Senha deve ter pelo menos 8 caracteres, incluindo letras, números e acentos.",
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

export default function NewPatient() {

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    function generatePassword(length = 10) {
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const special = "@#$&*!";

        const all = lowercase + uppercase + numbers + special;

        const getRandom = (str: string) =>
            str[Math.floor(Math.random() * str.length)];

        const password = [
            getRandom(lowercase),
            getRandom(uppercase),
            getRandom(numbers),
            getRandom(special),
        ];

        for (let i = password.length; i < length; i++) {
            password.push(getRandom(all));
        }

        return password
            .sort(() => 0.5 - Math.random())
            .join("");
    }


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
            cpf: "",
            weight: "",
            height: "",
            observations: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        const full_name = `${values.firstName} ${values.lastName}`
        const birth_date = format(values.dateOfBirth, "yyyy-MM-dd")

        const payload: RegisterPatientProps = {
            full_name,
            birth_date,
            gender: values.gender,
            email: values.email,
            password: values.password,
            mobile: values.phone,
            cpf: values.cpf,
            weight: values.weight,
            height: values.height,
            note: values.observations
        }
        try {
            await professionalRegisterNewPatientService({ ...payload });
            console.log("Payload:", payload);

            showToastSuccess("Paciente cadastrado com sucesso!");

            form.reset();
            router.push("/dashboard/professional");
        } catch (error: any) {
            const apiMessage =
                error?.response?.data?.message || // Axios-like
                error?.message ||                 // Erro comum
                "Erro ao cadastrar paciente";     // Fallback genérico

            showToastError(apiMessage);
        } finally {
            setIsSubmitting(false);
        }


    }

    return (
        <div className="w-full max-w-4xl">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Cadastro de novo paciente</h1>
                <p className="my-1">Por favor preencha o formulário abaixo para cadastrar um novo paciente</p>
            </div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Senha *</FormLabel>
                                            <FormControl>
                                                <div
                                                    className="relative flex items-center">
                                                    <Input
                                                        type={passwordVisible ? "text" : "password"}
                                                        placeholder="Teste@123" {...field} />
                                                    <Button
                                                        variant="link"
                                                        type="button"
                                                        onClick={togglePasswordVisibility}
                                                        className="cursor-pointer absolute right-0 top-0"
                                                        aria-label="Mostrar senha"
                                                    >
                                                        {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="link"
                                                        size="icon"
                                                        onClick={() => {
                                                            const generatedPassword = generatePassword();
                                                            form.setValue("password", generatedPassword);
                                                        }}
                                                        className="cursor-pointer absolute right-8 top-0"
                                                        aria-label="Gerar senha automaticamente"
                                                    >
                                                        <WandSparkles />
                                                    </Button>
                                                </div>
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
                                                <Textarea placeholder="" className="resize-none h-25" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between gap-4">
                            <Link href="/dashboard/professional/">
                                <Button type="submit" variant={"cancel"} className="w-50 cursor-pointer" disabled={isSubmitting}>
                                    {isSubmitting ? "Cancelando..." : "Cancelar"}
                                </Button>
                            </Link>
                            <Button variant={"primary"} type="submit" className="w-50" disabled={isSubmitting}>
                                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
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
