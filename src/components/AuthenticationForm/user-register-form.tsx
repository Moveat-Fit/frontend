/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"


import { ToastContainer, toast } from 'react-toastify';
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import { registerService, RegisterResponse } from '../../services/authService';
import Link from "next/link"
import { useState } from "react"
import Router from 'next/router';
import { Checkbox } from '../ui/checkbox';
import ToastError from '../ToastError';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserRegisterAuthForm({ className, ...props }: UserAuthFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [userType, setUserType] = useState<string>("Paciente");
    const [occupationDocument, setOccupationDocument] = useState<string>("");
    const [cellphone, setCellphone] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSelect = (value: string) => setUserType(value);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response: RegisterResponse = await registerService({
                name,
                email,
                password,
                cellphone,
                cpf,
                user_type: userType,
            });
            setSuccess("Cadastro realizado com sucesso!");


            toast.success('Cadastro realizado com sucesso', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setTimeout(() => {
                Router.push('/login');
            }, 2000);

            setError(null);
        } catch (error: any) {
            let errorMessage = "Erro desconhecido";

            if (error?.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error?.message) {
                errorMessage = error.message;
            }

            ToastError({ message: errorMessage });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="text-center mb-4 space-y-2">
                        {[
                            { label: "Sou Paciente", value: "Paciente" },
                            { label: "Sou Nutricionista", value: "Nutricionista" },
                            { label: "Sou Personal Trainer", value: "Personal Trainer" },
                        ].map((item) => (
                            <div key={item.value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={item.value}
                                    checked={userType === item.value}
                                    onCheckedChange={() => handleSelect(item.value)}
                                />
                                <Label htmlFor={item.value}>{item.label}</Label>
                            </div>
                        ))}
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                            <Input
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                id="name"
                                placeholder="Nome completo"
                                type="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                            />

                            {userType !== "Paciente" && (
                                <abbr
                                    className="no-underline"
                                    title={userType === "Nutricionista" ? "Conselho Regional de Nutrição" : "Conselho Regional de Educação Física"}
                                >
                                    <Input
                                        required
                                        value={occupationDocument}
                                        onChange={e => setOccupationDocument(e.target.value)}
                                        id={userType === "Nutricionista" ? "nutricionista" : "personal-trainer"}
                                        placeholder={userType === "Nutricionista" ? "CRN" : "CREF"}
                                        type="text"
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                    />
                                </abbr>
                            )}

                        </div>

                        <Input
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            id="email"
                            placeholder="E-mail"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                        <div className="flex gap-2">
                            <Input
                                required
                                value={cpf}
                                onChange={e => setCpf(e.target.value)}
                                id="cpf"
                                placeholder="CPF"
                                type="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                            <Input
                                required
                                value={cellphone}
                                onChange={e => setCellphone(e.target.value)}
                                id="cellphone"
                                placeholder="Telefone"
                                type="tel"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                        </div>
                        <Input
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            id="password"
                            placeholder="Senha"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="new-password"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <Button
                        disabled={isLoading}
                        className="cursor-pointer bg-primary-custom hover:bg-green-700 transition-colors duration-100 ease-in text-white"
                    >
                        {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                        Criar
                    </Button>
                    <Link href="/login" className='text-center'>
                        <Button
                            variant={"link"}
                            className="p-6 cursor-pointer text-primary-custom hover:text-green-700 duration-100 ease-in">
                            Já possuo uma conta
                        </Button>
                    </Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
