import z from 'zod';
import { CallSchema } from "../schema/chamadoValidation";

export type CallTypeResponse ={
    id: number,
    titulo: string,
    solicitante: string,
    descricao: string,
    prioridade: "BAIXA" | "MEDIA" | "ALTA",
    status: "ABERTO" | "EM_ANDAMENTO" | "RESOLVIDO" | "FECHADO",
    responsavelId: number,
    dataCriacao: Date,
}

export type CallTypeCreate = z.infer<typeof CallSchema>;
/* {
    titulo: string,
    solicitante: string,
    descricao: string,
    prioridade: "BAIXA" | "MEDIA" | "ALTA",
    status: "ABERTO" | "EM_ANDAMENTO" | "RESOLVIDO" | "FECHADO",
    responsavelId?: number,
    dataCriacao: Date,
} */
export type ResponsibleType = {
    id: number,
    nome: string,
    totalChamados: number,
}