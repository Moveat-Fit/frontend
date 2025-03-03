"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import Google from '@/assets/icons/google.png'
import Image from "next/image"

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserRegisterAuthForm({ className, ...props }: UserAuthFormProps) {
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
                            placeholder="nome@exemplo.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <Button disabled={isLoading} className="cursor-pointer">
                        {isLoading && (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Criar
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