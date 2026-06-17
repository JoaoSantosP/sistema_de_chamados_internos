export interface Chamado {
  id: number;
  titulo: string;
  solicitante: string;
  descricao: string;
  prioridade: 'ALTA' | 'MEDIA' | 'BAIXA';
  status: 'ABERTO' | 'EM_ANDAMENTO' | 'RESOLVIDO' | 'FECHADO';
  responsavel: string;
}