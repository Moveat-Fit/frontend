import '../../app/globals.css'
import { Metadata } from "next"
import { UserRegisterAuthForm } from "@/components/user-register-form"
import SectionSideRegister from '@/pages/register/section-side-register'

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function Register() {
  return (
    <main className='h-screen flex'>
      <SectionSideRegister />
      <div className='flex items-center justify-center w-1/2'>
        <div className="space-y-6 sm:w-[350px]">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold text-primary-custom tracking-tight">
              Criar uma conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Insira seu email para criar uma conta.
            </p>
          </div>
          <UserRegisterAuthForm />
        </div>
      </div>
    </main>
  )
}