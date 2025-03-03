"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader } from "lucide-react"
import Google from '@/assets/icons/google.png'
import Image from "next/image"

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserLoginAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

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
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="Insira seu e-mail"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                        <Input
                            className="mt-2"
                            id="password"
                            placeholder="Digite sua senha"
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
                    <Button disabled={isLoading} className="cursor-pointer">
                        {isLoading && (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Entrar
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