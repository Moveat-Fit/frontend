/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Controller, useForm } from "react-hook-form";
import { professionalLoginService, patientlLoginService } from "../../services/auth/authService";
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
import { LoginResponse } from "@/services/auth/types";

interface LoginFormData {
    login: string;
    password: string;
}

export const UserLoginAuthForm: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    const { handleSubmit, control, formState: { errors }, setError, clearErrors } = useForm<LoginFormData>({
        mode: "onSubmit",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState("patient");

    const router = useRouter();

    const handleChange = (field: keyof LoginFormData) => {
        clearErrors(field);
    };

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            let response: LoginResponse;

            if (selectedTab === "patient") {
                response = await patientlLoginService(data);
            } else {
                response = await professionalLoginService(data);
            }

            localStorage.setItem("access_token", response.access_token);
            if(selectedTab === "professional") router.push("/dashboard/professional"); 
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.message || "Erro desconhecido";
            ToastError({ message: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="border border-primary-custom rounded-lg">
                        <TabsList>
                            <TabsTrigger value="patient">Paciente</TabsTrigger>
                            <TabsTrigger value="professional">Profissional</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">Email</Label>

                        <Controller
                            name="login"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="login"
                                    type="email"
                                    placeholder="E-mail"
                                    disabled={isLoading}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleChange("login");
                                    }}
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
                        <Checkbox id="terms1" />
                        <div className="grid gap-1.5 leading-none">
                            <label htmlFor="terms1" className="text-sm leading-none">
                                Lembrar senha
                            </label>
                        </div>
                    </div>

                    <Button variant={"primary"} disabled={isLoading}>
                        {isLoading ? (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            "Entrar"
                        )}
                    </Button>

                    {selectedTab === "professional" && (
                        <>
                            <Link href="/register" className="text-center">
                                <Button
                                    variant={"link"}
                                    className="p-6 text-primary-custom hover:text-green-700 duration-100 ease-in"
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

                            <Button variant="outline" type="button" disabled={isLoading}>
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
};
