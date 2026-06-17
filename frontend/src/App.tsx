import { useEffect, useState } from 'react';
import {
  getChamados,
  getResponsaveis,
  createChamado,
  updateStatus,
} from './services/api';

import type { Chamado } from './types/chamado';
import type { ResponsibleType } from './types/responsavel';



function App() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [responsaveis, setResponsaveis] = useState<ResponsibleType[]>([]);

  const [busca, setBusca] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('TODOS');
  const [responsavelFiltro, setResponsavelFiltro] = useState('TODOS');
  const [chamadoExpandido, setChamadoExpandido] =
  useState<number | null>(null);
  const [statusEditado, setStatusEditado] =
  useState<Record<number, string>>({});
  

  const [novoChamado, setNovoChamado] = useState({
    titulo: '',
    solicitante: '',
    descricao: '',
    prioridade: 'MEDIA' as 'ALTA' | 'MEDIA' | 'BAIXA',
    status: 'ABERTO' as
      | 'ABERTO'
      | 'EM_ANDAMENTO'
      | 'RESOLVIDO'
      | 'FECHADO',
    responsavelId: '',
  });

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const chamadosData = await getChamados();
      const responsaveisData = await getResponsaveis();

      setChamados(chamadosData);
      setResponsaveis(responsaveisData);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreateChamado(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      await createChamado({
        titulo: novoChamado.titulo,
        solicitante: novoChamado.solicitante,
        descricao: novoChamado.descricao,
        prioridade: novoChamado.prioridade,
        status: novoChamado.status,
        responsavelId: novoChamado.responsavelId
          ? Number(novoChamado.responsavelId)
          : undefined,
      });

      setNovoChamado({
        titulo: '',
        solicitante: '',
        descricao: '',
        prioridade: 'MEDIA',
        status: 'ABERTO',
        responsavelId: '',
      });

      await carregarDados();
    } catch (error) {
      console.error(error);
      alert('Erro ao criar chamado');
    }
  }

  async function handleSalvarStatus(
  id: number
) {
  try {
    const status =
      statusEditado[id];

    if (!status) {
      return;
    }

    await updateStatus(
      id,
      status as
        | 'ABERTO'
        | 'EM_ANDAMENTO'
        | 'RESOLVIDO'
        | 'FECHADO'
    );

    await carregarDados();

    alert(
      'Status atualizado com sucesso'
    );
  } catch (error) {
    console.error(error);

    alert(
      'Erro ao atualizar status'
    );
  }
}

  const chamadosFiltrados = chamados.filter(
    (chamado) => {
      const correspondeTitulo = chamado.titulo
        .toLowerCase()
        .includes(busca.toLowerCase());

      const correspondeStatus =
        statusFiltro === 'TODOS' ||
        chamado.status === statusFiltro;

      const correspondeResponsavel =
        responsavelFiltro === 'TODOS' ||
        chamado.responsavel ===
          responsavelFiltro;

      return (
        correspondeTitulo &&
        correspondeStatus &&
        correspondeResponsavel
      );
    }
  );

  return (
  <div className="container py-4">
    <h1 className="mb-4">Sistema de Chamados</h1>

    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0">Criar Chamado</h5>
      </div>

      <div className="card-body">
        <form onSubmit={handleCreateChamado}>
          <div className="row g-3">

            <div className="col-md-6">
              <input
                className="form-control"
                type="text"
                placeholder="Título"
                value={novoChamado.titulo}
                onChange={(e) =>
                  setNovoChamado({
                    ...novoChamado,
                    titulo: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="col-md-6">
              <input
                className="form-control"
                type="text"
                placeholder="Solicitante"
                value={novoChamado.solicitante}
                onChange={(e) =>
                  setNovoChamado({
                    ...novoChamado,
                    solicitante: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="col-12">
              <textarea
                className="form-control"
                placeholder="Descrição"
                rows={3}
                value={novoChamado.descricao}
                onChange={(e) =>
                  setNovoChamado({
                    ...novoChamado,
                    descricao: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={novoChamado.prioridade}
                onChange={(e) =>
                  setNovoChamado({
                    ...novoChamado,
                    prioridade: e.target.value as
                      | 'ALTA'
                      | 'MEDIA'
                      | 'BAIXA',
                  })
                }
              >
                <option value="BAIXA">Baixa</option>
                <option value="MEDIA">Média</option>
                <option value="ALTA">Alta</option>
              </select>
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={novoChamado.status}
                onChange={(e) =>
                  setNovoChamado({
                    ...novoChamado,
                    status: e.target.value as
                      | 'ABERTO'
                      | 'EM_ANDAMENTO'
                      | 'RESOLVIDO'
                      | 'FECHADO',
                  })
                }
              >
                <option value="ABERTO">Aberto</option>
                <option value="EM_ANDAMENTO">
                  Em andamento
                </option>
                <option value="RESOLVIDO">
                  Resolvido
                </option>
                <option value="FECHADO">
                  Fechado
                </option>
              </select>
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={novoChamado.responsavelId}
                onChange={(e) =>
                  setNovoChamado({
                    ...novoChamado,
                    responsavelId: e.target.value,
                  })
                }
              >
                <option value="">
                  Atribuição automática
                </option>

                {responsaveis.map((responsavel) => (
                  <option
                    key={responsavel.id}
                    value={responsavel.id}
                  >
                    {responsavel.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Criar Chamado
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0">Filtros</h5>
      </div>

      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              className="form-control"
              type="text"
              placeholder="Buscar por título..."
              value={busca}
              onChange={(e) =>
                setBusca(e.target.value)
              }
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={statusFiltro}
              onChange={(e) =>
                setStatusFiltro(e.target.value)
              }
            >
              <option value="TODOS">
                Todos os status
              </option>
              <option value="ABERTO">Aberto</option>
              <option value="EM_ANDAMENTO">
                Em andamento
              </option>
              <option value="RESOLVIDO">
                Resolvido
              </option>
              <option value="FECHADO">
                Fechado
              </option>
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={responsavelFiltro}
              onChange={(e) =>
                setResponsavelFiltro(
                  e.target.value
                )
              }
            >
              <option value="TODOS">
                Todos os responsáveis
              </option>

              {responsaveis.map((responsavel) => (
                <option
                  key={responsavel.id}
                  value={responsavel.nome}
                >
                  {responsavel.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>

    <p className="text-muted">
      Exibindo {chamadosFiltrados.length} de{' '}
      {chamados.length} chamados
    </p>

    {chamadosFiltrados.map((chamado) => (
  <div
    key={chamado.id}
    className="card shadow-sm mb-3"
    style={{
      cursor: 'pointer',
      transition: 'all .2s ease',
    }}
    onClick={() =>
      setChamadoExpandido(
        chamadoExpandido === chamado.id
          ? null
          : chamado.id
      )
    }
  >
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h5 className="card-title mb-1">
            {chamado.titulo}
          </h5>

          <small className="text-muted">
            {chamadoExpandido === chamado.id
              ? '▼ Clique para recolher'
              : '▶ Clique para expandir'}
          </small>
        </div>

        <div>
          <span className="badge text-bg-warning me-2">
            {chamado.prioridade}
          </span>

          <span className="badge text-bg-primary">
            {chamado.status}
          </span>
        </div>
      </div>

      <hr />

      <p className="mb-1">
        <strong>Solicitante:</strong>{' '}
        {chamado.solicitante}
      </p>

      <p className="mb-0">
        <strong>Responsável:</strong>{' '}
        {chamado.responsavel}
      </p>

      {chamadoExpandido === chamado.id && (
        <>
          <hr />

          <p>
            <strong>Descrição:</strong>
          </p>

          <p>{chamado.descricao}</p>

          <div className="row">
            <div className="col-md-6">
              <p>
                <strong>ID:</strong>{' '}
                {chamado.id}
              </p>
            </div>
            <div className="mt-3">
          <button
            className="btn btn-success"
            onClick={(e) => {
              e.stopPropagation();

              handleSalvarStatus(
                  chamado.id
                );
            }}
          >
            Salvar Status
          </button>
        </div>

            <div className="col-md-6">
  <label className="form-label">
    <strong>Status</strong>
  </label>

  <select
    className="form-select"
    value={
  statusEditado[chamado.id] ??
  chamado.status
}
    onClick={(e) => e.stopPropagation()}
    onChange={(e) =>
  setStatusEditado({
    ...statusEditado,
    [chamado.id]: e.target.value,
  })
}
  >
    <option value="ABERTO">
      Aberto
    </option>

    <option value="EM_ANDAMENTO">
      Em andamento
    </option>

    <option value="RESOLVIDO">
      Resolvido
    </option>

    <option value="FECHADO">
      Fechado
    </option>
  </select>
</div>
          </div>
        </>
      )}
    </div>
  </div>
))}
  </div>
);
}

export default App;