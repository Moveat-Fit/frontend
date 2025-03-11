"use client"


import { ToastContainer, toast } from 'react-toastify';
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import { registerService, RegisterResponse } from '../services/authService';
// import Google from '@/assets/icons/google.png'
// import Image from "next/image"
import { RadioGroup } from "./ui/radio-group"
import { RadioGroupItem } from "./ui/radio-group"
import Link from "next/link"
import { useState } from "react"
import Router from 'next/router';
import { Checkbox } from './ui/checkbox';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserRegisterAuthForm({ className, ...props }: UserAuthFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [userType, setUserType] = useState<string>("Paciente");
    const [occupationDocument, setOccupationDocument] = useState<string>("");
    const [cellphone, setCellphone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // console.log("Enviando os seguintes dados para o serviço de registro:");
            // console.log("Name:", name);
            // console.log("Email:", email);
            // console.log("Password:", password);
            // console.log("Confirm Password:", confirmPassword);
            // console.log("Occupation Document:", occupationDocument);
            // console.log("Cellphone:", cellphone);
            // console.log("CPF:", cpf);
            // console.log("User Type:", userType);

            const response: RegisterResponse = await registerService({
                name,
                email,
                password,
                cellphone,
                cpf,
                user_type: userType,
            });

            console.log("Resposta da API:", response);

            setSuccess("Cadastro realizado com sucesso!");

            setError(null);

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
                Router.push('/login');  // Redireciona para a página de login após 2 segundos
            }, 2000);
        } catch (err) {
            toast.error('Erro ao se registrar', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-2">
                    <RadioGroup
                        onValueChange={setUserType}
                        value={userType}
                        className="text-center mb-4" defaultValue="Paciente">
                        <div className="flex items-center space-x-2">
                            <Checkbox value="Paciente" id="paciente" />
                            <Label htmlFor="paciente">Sou Paciente</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox value="Nutricionista" id="nutricionista" />
                            <Label htmlFor="nutricionista">Sou Nutricionista</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox value="Personal Trainer" id="personal-trainer" />
                            <Label htmlFor="personal-trainer">Sou Personal Trainer</Label>
                        </div>

                    </RadioGroup>
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                            <Input
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
                        <Input
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            id="password"
                            placeholder="Confirme sua senha"
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
                            className="cursor-pointer text-primary-custom hover:text-green-700 duration-100 ease-in">
                            Já possuo uma conta
                        </Button>
                    </Link>

                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
