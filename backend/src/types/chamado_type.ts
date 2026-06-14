export type ChamadoTypeResponse ={
    id: number,
    titulo: string,
    solicitante: string,
    descricao: string,
    prioridade: string,
    status: "ABERTO" | "EM ANDAMENTO" | "RESOLVIDO" | "FECHADO",
    responsavelId: number,
    data_criacao: Date,
}

export type ChamadoTypeCreate ={
    titulo: string,
    solicitante: string,
    descricao: string,
    prioridade: string,
    status: "ABERTO" | "EM ANDAMENTO" | "RESOLVIDO" | "FECHADO",
    responsavelId: number,
    data_criacao: Date,
}

export type ResponsavelType = {
    id: number,
    nome: string,
}