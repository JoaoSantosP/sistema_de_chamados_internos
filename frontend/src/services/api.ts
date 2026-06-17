import type { Chamado } from '../types/chamado';
import type { ResponsibleType } from '../types/responsavel';

const API_URL = 'http://localhost:3000';

export async function getChamados(): Promise<Chamado[]> {
  const response = await fetch(`${API_URL}/chamados`);

  if (!response.ok) {
    throw new Error('Erro ao buscar chamados');
  }

  return response.json();
}

export async function getResponsaveis(): Promise<ResponsibleType[]> {
    const response = await fetch(
        'http://localhost:3000/responsaveis'
    );
    if (!response.ok) {
    throw new Error('Erro ao buscar responsáveis');
  }
    return response.json();
}

export async function createChamado(data: {
  titulo: string;
  solicitante: string;
  descricao: string;
  prioridade: 'ALTA' | 'MEDIA' | 'BAIXA';
  status: 'ABERTO' | 'EM_ANDAMENTO' | 'RESOLVIDO' | 'FECHADO';
  responsavelId?: number;
}) {
  const response = await fetch(
    'http://localhost:3000/chamados',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('Erro ao criar chamado');
  }

  return response.json();
}

export async function updateStatus(
  id: number,
  status:
    | 'ABERTO'
    | 'EM_ANDAMENTO'
    | 'RESOLVIDO'
    | 'FECHADO'
) {
  const response = await fetch(
    `${API_URL}/chamados/${id}/status`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      'Erro ao atualizar status'
    );
  }

  return response.json();
}