import z from 'zod';

export const CallSchema = z.object({
    titulo: z.string().min(1, 'O título é obrigatório'),
    solicitante: z.string().min(1, 'O solicitante é obrigatório'),
    descricao: z.string().min(1, 'A descrição é obrigatória'),
    prioridade: z.enum(['BAIXA', 'MEDIA', 'ALTA'], 'A prioridade deve ser BAIXA, MEDIA ou ALTA'),
    status: z.enum(['ABERTO', 'EM_ANDAMENTO', 'RESOLVIDO', 'FECHADO'], 'O status deve ser ABERTO, EM_ANDAMENTO, RESOLVIDO ou FECHADO'),
    responsavelId: z.number().optional(),
    dataCriacao: z.date(),
});