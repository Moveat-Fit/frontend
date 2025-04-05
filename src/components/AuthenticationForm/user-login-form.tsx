/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Controller, useForm } from "react-hook-form";
import { professionalLoginService, LoginResponse, patientlLoginService } from "../../services/authService";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader } from "lucide-react";
import Google from "@/assets/icons/google.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ToastError from "../ToastError";
import ToastSuccess from "../ToastSuccess";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { table } from "console";


interface LoginFormData {
    login: string;
    password: string;
}

export const UserLoginAuthForm: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    const { handleSubmit, control, formState: { errors }, setError, clearErrors } = useForm<LoginFormData>({
        mode: "onSubmit",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedTab, setSelectedTab] = useState("patient");

    const router = useRouter();

    const handleChange = (field: keyof LoginFormData) => {
        if (isSubmitted) {
            clearErrors(field);
        }
    };

    const onSubmit = async (data: LoginFormData) => {
        try {
            setIsLoading(true);

            console.log("Dados do formulário:", selectedTab);

            if (selectedTab === "patient") {
                console.log("Paciente")
                const response: LoginResponse = await patientlLoginService(data);
                localStorage.setItem("access_token", response.access_token);
                console.log(response)
            } else if (selectedTab === "professional") {
                console.log("Profissional")
                const response: LoginResponse = await professionalLoginService(data);
                localStorage.setItem("access_token", response.access_token);
                console.log(response)
            }

            // ToastSuccess({ message: "Login efetuado com sucesso" });
            router.push(`/dashboard`);

        } catch (error: any) {
            setIsLoading(false);
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
    };

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <Tabs value={selectedTab} onValueChange={setSelectedTab} defaultValue="patient" className="border border-primary-custom rounded-lg">
                        <TabsList>
                            <TabsTrigger className="cursor-pointer" value="patient">Paciente</TabsTrigger>
                            <TabsTrigger className="cursor-pointer" value="professional">Profissional</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>

                        <Controller
                            name="login"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleChange("login");
                                    }}
                                    id="login"
                                    type="email"
                                    placeholder="E-mail"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                />

                            )}

                        />

                        {errors.login && <ToastError message={errors.login.message || ""} />}

                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    id="password"
                                    type="password"
                                    className="mt-2"
                                    placeholder="Senha"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleChange("password");
                                    }}
                                />
                            )}
                        />
                        {errors.password && <ToastError message={errors.password.message || ""} />}
                    </div>

                    <div className="my-3 items-top flex space-x-2">
                        <Checkbox id="terms1" className="cursor-pointer" />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="terms1"
                                className="cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Lembrar senha
                            </label>
                        </div>
                    </div>

                    <Button
                        variant={"primary"}
                    >
                        {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                        Entrar
                    </Button>

                    {selectedTab === "professional" && (
                        <>
                            <Link href="/register" className="text-center">
                                <Button
                                    type="submit"
                                    variant={"link"}
                                    className="p-6 cursor-pointer text-primary-custom hover:text-green-700 duration-100 ease-in"
                                >
                                    Ainda não possuo uma conta
                                </Button>
                            </Link>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Ou entre com
                                    </span>
                                </div>
                            </div>

                            <Button className="cursor-pointer" variant="outline" type="button">
                                {isLoading ? (
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Image src={Google} alt="Google Logo" className="mr-2 h-4 w-4" />
                                )}
                                Google
                            </Button>
                        </>
                    )}

                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
