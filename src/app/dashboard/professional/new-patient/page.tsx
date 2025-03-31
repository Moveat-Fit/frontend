"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import ToastSuccess from "@/components/ToastSuccess";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";


export default function NewPatient() {
    const [isSubmitting, setIsSubmitting] = useState(false)

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
        phone: z.string().min(10, {
            message: "Telefone deve ter pelo menos 10 dígitos.",
        }),
        cpf: z.string().min(11, {
            message: "CPF deve ter pelo menos 11 dígitos.",
        }),
        weight: z.string().min(1, {
            message: "Peso é obrigatório.",
        }),
        height: z.string().min(1, {
            message: "Altura é obrigatória.",
        }),
        observations: z.string().optional(),
    })

    const genders = [
        { label: "Masculino", value: "male" },
        { label: "Feminino", value: "female" },
        { label: "Não binário", value: "non-binary" },
        { label: "Outro", value: "not-specified" },
    ]

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

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            console.log(values)
            ToastSuccess({ message: "Patient registered successfully" })
            setIsSubmitting(false)
            form.reset()
        }, 1500)
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
                                                <FormLabel>Nome</FormLabel>
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
                                                <FormLabel>Sobrenome</FormLabel>
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
                                            <FormLabel>Data de nascimento</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground",
                                                            )}
                                                        >
                                                            {field.value ? format(field.value, "PPP") : <span>Escolha uma data</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
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
                                            <FormLabel>Número de telefone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="(123) 456-7890" {...field} />
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
                                            <FormLabel>CPF</FormLabel>
                                            <FormControl>
                                                <Input placeholder="(123) 456-7890" {...field} />
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
                                            <FormLabel>Gênero</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    {genders.map((gender) => (
                                                        <FormItem key={gender.value} className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value={gender.value} />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">{gender.label}</FormLabel>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
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
                                            <FormLabel>Email</FormLabel>
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
                                            <FormLabel>Peso</FormLabel>
                                            <FormControl>
                                                <Input placeholder="50.2" {...field} />
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
                                            <FormLabel>Peso</FormLabel>
                                            <FormControl>
                                                <Input placeholder="1.55" {...field} />
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

                        <div className="flex gap-4">
                            <Button type="submit" variant={"cancel"} className="w-50 cursor-pointer" disabled={isSubmitting}>
                                {isSubmitting ? "Cancelando..." : "Cancelar"}
                            </Button>
                            <Button type="submit" className="w-50 bg-primary-custom hover:bg-red-500 cursor-pointer" disabled={isSubmitting}>
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
