import '../../app/globals.css'
import { Metadata } from "next"

import { UserLoginAuthForm } from "@/components/AuthenticationForm/user-login-form"
import SectionSideLogin from '@/app/login/section-side-login'

export const metadata: Metadata = {
  title: "Página de Login",
  description: "Página de login do Moveat.",
}
export default function Login() {
  return (
    <main className='h-screen block lg:flex bg-white'>
      <div className='bg-white lg:mt-0 w-full h-screen lg:w-1/2 lg:h-full items-center justify-center flex'>
        <div className="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-primary-custom">
              Bem vindo de volta.
            </h1>
            <p className="text-sm text-muted-foreground">
              Insira o email para entrar na sua conta.
            </p>
          </div>
          <UserLoginAuthForm />
        </div>
      </div>
      <SectionSideLogin />
    </main>
  )
}


