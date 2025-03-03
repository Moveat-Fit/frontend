"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import Google from '@/assets/icons/google.png'
import Image from "next/image"
import { RadioGroup } from "@radix-ui/react-radio-group"
import { RadioGroupItem } from "./ui/radio-group"
import Link from "next/link"

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserRegisterAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [occupation, setOccupation] = React.useState<string>("nutricionista");

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <RadioGroup
                        onValueChange={setOccupation}
                        value={occupation}
                        className="flex items-center justify-around mb-4" defaultValue="option-one">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nutricionista" id="nutricionista" />
                            <Label htmlFor="nutricionista">Sou Nutricionista</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="personal-trainer" id="personal-trainer" />
                            <Label htmlFor="personal-trainer">Sou Personal Trainer</Label>
                        </div>
                    </RadioGroup>

                    <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                            <Input
                                id="name"
                                placeholder="Nome completo"
                                type="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                            />

                            {occupation === "nutricionista" ? (
                                <abbr className="no-underline" title="Conselho Regional de Nutrição">
                                    <Input
                                        id="nutricionista"
                                        placeholder="CRN"

                                        type="text"
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                    />
                                </abbr>
                            ) : (
                                <abbr className="no-underline" title="Conselho Regional de Educação Física">
                                    <Input
                                        id="personal-trainer"
                                        placeholder="CREF"
                                        type="text"
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                    />
                                </abbr>
                            )}
                        </div>

                        <Input
                            id="email"
                            placeholder="E-mail"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                        <Input
                            id="password"
                            placeholder="Senha"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="new-password"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                        <Input
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
                    <Button

                        variant={"link"}
                        disabled={isLoading}
                        className="cursor-pointer text-primary-custom hover:text-green-700 duration-100 ease-in">
                        {isLoading && (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <Link href="/login">Já possuo uma conta</Link>

                    </Button>
                </div>
            </form>
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
            <Button className="cursor-pointer" variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Image src={Google} alt="Google" className="mr-2 h-4 w-4" />
                )}{" "}
                Google
            </Button>
        </div>
    )
}