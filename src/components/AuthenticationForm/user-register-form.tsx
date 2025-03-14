/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"


import { ToastContainer, toast } from 'react-toastify';
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle, CheckCircle2, Eye, EyeOff, Loader, XCircle } from "lucide-react"
import { registerService } from '../../services/authService';
import Link from "next/link"
import { use, useEffect, useState } from "react"
import Router from 'next/router';
import { Checkbox } from '../ui/checkbox';
import ToastError from '../ToastError';
import { set } from 'react-hook-form';

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
    const [canSubmit, setCanSubmit] = useState<boolean>(false);

    const [passwordVisible, setPasswordVisible] = useState(false); // Estado para controlar a visibilidade da senha
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Estado para confirmar a senha

    // Função para alternar a visibilidade da senha
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);


    const criteria = [
        { text: "Senha precisa ter no mínimo 8 dígitos", test: (pwd: string) => pwd.length >= 8 },
        { text: "Senha precisa ter caracteres especiais", test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
        { text: "Senha precisa ter letras maiúsculas e minúsculas", test: (pwd: string) => /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) }
    ];

    const nameIsValid = (name: string) => {
        return (
            name.trim().length >= 3 &&
            name.trim().length <= 50 &&
            /^[A-Za-zÀ-ÿ'\s]+$/.test(name)
        );
    };


    const allValid = nameIsValid(name) && criteria.every(({ test }) => test(password)) && password === confirmPassword && password.length > 0;

    const handleSubmit = () => {
        if (!nameIsValid(name)) {
            ToastError({ message: "O nome deve ter entre 3 e 50 caracteres e conter apenas letras e espaços." });
            return;
        }
    };

    const formatCPF = (value: string) => {
        const cleaned = value.replace(/\D/g, "");

        return cleaned
            .replace(/^(\d{3})(\d)/, "$1.$2")
            .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
            .slice(0, 14);
    };

    const formatPhone = (value: string) => {
        const cleaned = value.replace(/\D/g, "");

        return cleaned
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d{4})/, '$1-$2')
            .slice(0, 15);
    };

    const handleChangeCellphone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCellphone(formatPhone(event.target.value));
    };


    const handleChangeCPF = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCpf(formatCPF(event.target.value));
    };

    const handleSelect = (value: string) => setUserType(value);



    useEffect(() => {
        if (userType != "Paciente" && occupationDocument.length < 6) setCanSubmit(false);
        if (cpf.length < 14) setCanSubmit(false);
        if (cellphone.length < 15) setCanSubmit(false);

    }, [cellphone.length, cpf.length, occupationDocument, userType]);


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await registerService({
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
                                onChange={handleChangeCPF}
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
                                onChange={handleChangeCellphone}
                                id="cellphone"
                                placeholder="Telefone"
                                type="tel"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                        </div>
                        <div className='relative'>
                            <Input
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                id="password"
                                placeholder="Senha"
                                type={passwordVisible ? "text" : "password"} // Condicionando o tipo de input
                                autoCapitalize="none"
                                autoComplete="new-password"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                            <Button
                                variant="link"
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="cursor-pointer absolute right-0 top-0"
                                aria-label="Mostrar senha"
                            >
                                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                            </Button>
                        </div>
                        <div className='relative'>
                            <Input
                                required
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                id="password"
                                placeholder="Confirmar senha"
                                type={confirmPasswordVisible ? "text" : "password"} // Condicionando o tipo de input
                                autoCapitalize="none"
                                autoComplete="new-password"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                            <Button
                                variant="link"
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute cursor-pointer right-0 top-0"
                                aria-label="Mostrar senha"
                            >
                                {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                            </Button>
                        </div>

                        <div className='mt-2 space-y-2'>
                            {criteria.map(({ text, test }, index) => (
                                <p key={index} className="flex items-center gap-2 text-sm">
                                    {test(password) ? (
                                        <CheckCircle2 className="text-primary-custom" size={16} />
                                    ) : (
                                        <XCircle className="text-red-500" size={16} />
                                    )}
                                    {text}
                                </p>

                            ))}
                            <p className="flex items-center gap-2 text-sm ">
                                {password && confirmPassword && password === confirmPassword ? (
                                    <CheckCircle2 className="text-primary-custom" size={16} />
                                ) : (
                                    <XCircle className="text-red-500" size={16} />
                                )}
                                As senhas precisam coincidir
                            </p>
                        </div>

                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={!allValid}
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
