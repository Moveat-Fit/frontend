/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { SetStateAction, useCallback, useEffect, useState } from "react";
import { ChevronDown, Download, Filter, Pencil, Plus, RefreshCw, Search, SquarePen, Trash, Trash2, UserPlus, Utensils, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { showToastError, showToastSuccess } from "@/utils/toast";
import { getProfessionalName } from "@/utils/tokenUtil";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { deletePatientService } from "@/services/patient/patientService";
import { professionalReadAllPatientService } from "@/services/professional/professionalService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteMealPlan } from "@/services/meal-plan/mealPlansService";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type PatientInterface = {
    id: number
    full_name: string
    birth_date: string
    gender: string
    email: string
    phone: string
    cpf: string
    weight: string
    height: string
    note: string
    professional_id: number
    created_at: string
    updated_at: string
};



function calculateAge(dateOfBirth: string): number {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }

    return age
}

function checkGender(gender: string) {
    if (gender.toLocaleUpperCase() === "M") return "Masculino";
    if (gender.toLocaleUpperCase() === "F") return "Feminino";
    if (gender.toLocaleUpperCase() === "O") return "Outro";

}

export default function AllPatients() {
    const [dropdownOpen, setDropdownOpen] = useState<{ [id: number]: boolean }>({});

    const router = useRouter()
    const [patients, setPatients] = useState<PatientInterface[]>([])
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
    const [openDeleteMealPlanDialog, setOpenDeleteMealPlanDialog] = useState(false)
    const deletePatient = async (id: string) => {
        try {
            const response = await deletePatientService(id)
            return response
        } catch (error) {
            console.error("Error removing patient:", error)
            showToastError("Erro ao remover paciente")
        }
    }

    const handleDeleteClick = async (id: number) => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        setSelectedPatientId(id);
        setDialogOpen(true);
    };

    const [professionalName, setProfessionalName] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);


    useEffect(() => {
        setIsClient(true);
        const name = getProfessionalName();
        setProfessionalName(name);
    }, []);

    const professionalNameFirstPart = professionalName?.split(" ")[0];
    const greetings = professionalNameFirstPart
        ? `Olá, ${professionalNameFirstPart.charAt(0).toUpperCase() + String(professionalNameFirstPart).slice(1)}!`
        : "Olá!";

    const [dialogOpen, setDialogOpen] = useState(false);

    const getAllPatients = useCallback(async () => {
        try {
            const response = await professionalReadAllPatientService()
            setPatients(response.patients)
        } catch (error) {
            console.error("Error fetching patients:", error)
        }
    }, [])

    useEffect(() => {
        getAllPatients()
    }, [getAllPatients])

    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const patientsPerPage = 5

    const filteredPatients = patients.filter((patient) => {
        const matchesSearch =
            patient.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toString().toLowerCase().includes(searchTerm.toLowerCase())


        return matchesSearch
    })

    const indexOfLastPatient = currentPage * patientsPerPage
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage
    const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient)
    const totalPages = Math.ceil(filteredPatients.length / patientsPerPage)

    const handleRefresh = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 800)
    }

    const removeMealPlan = async (patientId: number) => {
        const patient_id = patientId.toString();
        try {
            const response = await deleteMealPlan(patient_id)
            console.log(response?.message)
            showToastSuccess(response?.message)
        } catch (error: any) {
            showToastError(error.message || "Erro ao apagar plano alimentar");
        }

    }

    if (!isClient) return null;

    return (
        <div className="container space-y-2">
            <div className="flex justify-between items-center">
                <div className="pb-3">
                    <h1 className="text-3xl font-bold text-primary-custom">{greetings}</h1>
                    <h2 className="text-muted-foreground">Gerencie e veja as informações de seus pacientes.</h2>
                </div>
                <Button variant={"primary"} asChild>
                    <Link href="/dashboard/professional/new-patient">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Cadastrar novo paciente
                    </Link>
                </Button>
            </div>

            <div>
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Digite o nome do paciente"
                                className="pl-8 w-full"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    setCurrentPage(1)
                                }}
                            />
                        </div>

                        <Select
                            value={statusFilter}
                            onValueChange={(value: SetStateAction<string>) => {
                                setStatusFilter(value)
                                setCurrentPage(1)
                            }}
                        >
                        </Select>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
                            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                            <span className="sr-only">Refresh</span>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Filter className="h-4 w-4" />
                                    <span className="sr-only">Mais filtros</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Opções de filtro</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Por ordem de ID</DropdownMenuItem>
                                <DropdownMenuItem>Por grupo de idade</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Exportar
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Exportar como CSV</DropdownMenuItem>
                                <DropdownMenuItem>Exportar como PDF</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="rounded-md overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead className="hidden md:table-cell">Idade/Gênero</TableHead>
                                <TableHead className="hidden lg:table-cell">Contato</TableHead>
                                <TableHead className="hidden md:table-cell">Observação</TableHead>
                                <TableHead className="text-center">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TooltipProvider>
                            <TableBody>
                                {currentPatients.length > 0 ? (
                                    currentPatients.map((patient) => (
                                        <TableRow key={patient.id}>
                                            <TableCell className="font-medium">{patient.id}</TableCell>
                                            <TableCell>{patient.full_name}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {calculateAge(patient.birth_date)} / {checkGender(patient.gender)}
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell">
                                                <div>{patient.phone}</div>
                                                <div className="text-xs text-muted-foreground">{patient.email}</div>
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell">{patient.note}</TableCell>
                                            <TableCell className="text-center space-x-2">
                                                <DropdownMenu
                                                    open={dropdownOpen[patient.id] || false}
                                                    onOpenChange={(open) =>
                                                        setDropdownOpen((prev) => ({ ...prev, [patient.id]: open }))
                                                    }
                                                >
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    data-testid="button-optionsMealPlan"
                                                                    variant="ghost"
                                                                    className="text-green-600 hover:text-green-700"
                                                                >
                                                                    <Utensils className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Plano alimentar</p>
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem
                                                            data-testid="button-addMealPlan"
                                                            className="cursor-pointer"
                                                            onClick={() =>
                                                                router.push(`/dashboard/professional/new-meal-plan/${patient.id}`)
                                                            }
                                                        >
                                                            <Plus className="w-4 h-4 mr-2" />
                                                            Adicionar plano alimentar
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem
                                                            data-testid="button-updateMealPlan"
                                                            className="cursor-pointer"
                                                            onClick={() =>
                                                                router.push(`/dashboard/professional/edit-meal-plan/${patient.id}`)
                                                            }
                                                        >
                                                            <Pencil className="w-4 h-4 mr-2" />
                                                            Editar plano alimentar
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem
                                                            data-testid="button-removeMealPlan"
                                                            className="cursor-pointer"
                                                            onSelect={(e) => {
                                                                e.preventDefault();
                                                                setDropdownOpen((prev) => ({ ...prev, [patient.id]: false }));
                                                                setSelectedPatientId(patient.id);
                                                                setTimeout(() => setOpenDeleteMealPlanDialog(true), 50);
                                                            }}
                                                        >
                                                            <Trash className="w-4 h-4 mr-2 text-red-600" />
                                                            <span className="text-red-600">Remover plano alimentar</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                                <Link href={`/dashboard/professional/edit-patient-info/${patient.id}`} passHref>
                                                    <Tooltip data-testid="link-editPatientInfo">
                                                        <TooltipTrigger asChild>

                                                            <Button variant="ghost">
                                                                <SquarePen className="h-4 w-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Editar informações do paciente</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </Link>
                                                <Tooltip data-testid="button-deletePatient">
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            onClick={() => handleDeleteClick(patient.id)}
                                                            variant="ghost"
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <Trash2 className="h-10 w-10" />
                                                            <span className="sr-only">Apagar paciente</span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Apagar paciente</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-24 text-center">
                                            Nenhum paciente encontrado
                                        </TableCell>
                                    </TableRow>
                                )}

                                {/* DIALOG FORA DO MAP */}
                                {selectedPatientId !== null && (
                                    <Dialog open={openDeleteMealPlanDialog} onOpenChange={setOpenDeleteMealPlanDialog}>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-primary-custom">Remover plano alimentar</DialogTitle>
                                            </DialogHeader>
                                            <p>Tem certeza que deseja remover este plano alimentar? Essa ação não pode ser desfeita.</p>
                                            <DialogFooter>
                                                <Button variant="cancel" onClick={() => setOpenDeleteMealPlanDialog(false)}>
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => {
                                                        removeMealPlan(selectedPatientId);
                                                        setOpenDeleteMealPlanDialog(false);
                                                        setSelectedPatientId(null);
                                                    }}
                                                >
                                                    Confirmar
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </TableBody>

                        </TooltipProvider>

                        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-primary-custom">
                                        Você tem certeza que deseja excluir?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Esta ação não pode ser desfeita. Ao continuar, os dados deste paciente serão removidos permanentemente.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={async () => {
                                            if (selectedPatientId !== null) {
                                                await deletePatient(selectedPatientId.toString());
                                                setDialogOpen(false);
                                                getAllPatients();
                                                showToastSuccess("Paciente removido com sucesso!");
                                            }
                                        }}
                                    >
                                        Confirmar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </Table>
                </div>

                {filteredPatients.length > 0 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground text-nowrap">
                            Exibindo {indexOfFirstPatient + 1}-{Math.min(indexOfLastPatient, filteredPatients.length)} de{" "}
                            {filteredPatients.length} pacientes
                        </div>

                        <Pagination className="mr-60">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        className="cursor-pointer"
                                    />
                                </PaginationItem>

                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                    let pageToShow
                                    if (totalPages <= 5) {
                                        pageToShow = i + 1
                                    } else if (currentPage <= 3) {
                                        pageToShow = i + 1
                                    } else if (currentPage >= totalPages - 2) {
                                        pageToShow = totalPages - 4 + i
                                    } else {
                                        pageToShow = currentPage - 2 + i
                                    }

                                    return (
                                        <PaginationItem key={pageToShow}>
                                            <PaginationLink
                                                isActive={currentPage === pageToShow}
                                                onClick={() => setCurrentPage(pageToShow)}
                                                className="cursor-pointer"
                                            >
                                                {pageToShow}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                })}

                                {totalPages > 5 && currentPage < totalPages - 2 && (
                                    <>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
                                        </PaginationItem>
                                    </>
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        className="cursor-pointer"
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div >
    )
}

