"use client"

import { loginService, LoginResponse } from '../services/authService';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader } from "lucide-react"
// import Google from '@/assets/icons/google.png'
// import Image from "next/image"
import Link from "next/link"
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserLoginAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | boolean | null>(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Para redirecionar após o login bem-sucedido

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null); // Limpar erro ao tentar logar

        try {
            const data: LoginResponse = await loginService({ login, password });
            localStorage.setItem('authToken', data.token);
            router.push('/dashboard');
        } catch (error) {
              toast.error("Erro ao fazer login", {
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
            setIsLoading(false); // Finaliza o estado de carregando
        }

    };


    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            id="email"
                            placeholder="E-mail"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2"
                            id="password"
                            placeholder="Senha"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                        <div className="my-3 items-top flex space-x-2">
                            <Checkbox id="terms1" />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="terms1"
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Lembrar senha
                                </label>

                            </div>
                        </div>
                    </div>
                    <Button
                        disabled={isLoading}
                        className="cursor-pointer bg-primary-custom hover:bg-green-700 transition-colors duration-100 ease-in text-white"
                    >
                        {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                        Entrar
                    </Button>
                    <Button
                        type='submit'
                        variant={"link"}
                        disabled={isLoading}
                        className="cursor-pointer text-primary-custom hover:text-green-700 duration-100 ease-in">
                        {isLoading && (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <Link href="/register">Ainda não possuo uma conta</Link>
                    </Button>
                </div>
            </form>
            <ToastContainer />

        </div>
    )
}

{/* <div className="relative">
    <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
            Ou entre com
        </span>
    </div>
</div>
<Button className="cursor-pointer" variant="outline" type="button" disabled={isLoading}>
    {isLoading ? (
        <Loader className="mr-2 h-4 w-4 animate-spin" />
    ) : (
        <Image src={Google} alt="Google" className="mr-2 h-4 w-4" />
    )}{" "}
    Google
</Button> */}