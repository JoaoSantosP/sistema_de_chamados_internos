# Sistema de Chamados Internos

Aplicação Full Stack para gerenciamento de chamados internos.

## Tecnologias Utilizadas

### Backend

- Node.js
- TypeScript
- Express
- PostgreSQL
- Docker
- Jest

### Frontend

- React
- TypeScript
- Vite
- Bootstrap

---

# Pré-requisitos

É necessário ter instalado:

- Docker
- Docker Compose

Opcionalmente:

- Node.js 22+

---

# Estrutura do Projeto

```text
sistema_de_chamados_internos/
│
├── backend/
│   ├── src/
│   ├── tests/
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── docker-compose.yml
```

---

# Clonando o Projeto

```bash
git clone git@github.com:JoaoSantosP/sistema_de_chamados_internos.git
cd sistema_de_chamados_internos
```

---

# Variáveis de Ambiente

Antes de iniciar a aplicação, crie um arquivo `.env` dentro da pasta `backend`.

Estrutura:

```text
backend/
├── src/
├── tests/
├── .env
├── package.json
└── ...
```

Conteúdo do arquivo:

```env
PORT=3000

PG_HOST=db
PG_PORT=5432
PG_DATABASE=service_desk
PG_USER=postgres
PG_PASSWORD=postgres
```

### Descrição das Variáveis

| Variável | Descrição |
|-----------|-----------|
| PORT | Porta da aplicação backend |
| PG_HOST | Host do banco PostgreSQL |
| PG_PORT | Porta utilizada pelo PostgreSQL |
| PG_DATABASE | Nome do banco de dados |
| PG_USER | Usuário do banco |
| PG_PASSWORD | Senha do banco |

---

# Executando a Aplicação

Na raiz do projeto execute:

```bash
docker compose up
```

Ou em segundo plano:

```bash
docker compose up -d
```

Durante a inicialização:

- O PostgreSQL será criado automaticamente.
- Os scripts de banco serão executados automaticamente.
- O backend instalará as dependências e iniciará a API.
- O frontend instalará as dependências e iniciará a aplicação React.

---

# Serviços Disponíveis

### Frontend

```text
http://localhost:5173
```

### Backend

```text
http://localhost:3000
```

### PostgreSQL

```text
Host: localhost
Porta: 5432
Banco: service_desk
Usuário: postgres
Senha: postgres
```

---

# Banco de Dados

Ao iniciar o container do PostgreSQL, os scripts abaixo são executados automaticamente:

```text
backend/src/database/schema.sql
backend/src/database/seed.sql
```

Esses scripts criam a estrutura inicial do banco e inserem os dados necessários para utilização da aplicação.

---

# Executando os Testes

Entrar no container do backend:

```bash
docker compose exec app sh
```

Executar os testes:

```bash
npm test
```

---

# Funcionalidades Implementadas

## Backend

- Listagem de chamados
- Criação de chamados
- Atualização de status
- Consulta de responsáveis
- Associação automática de responsável
- Persistência em PostgreSQL
- Testes unitários da camada de serviço

## Frontend

- Listagem de chamados
- Busca por título
- Filtro por status
- Filtro por responsável
- Criação de chamados
- Visualização detalhada por expansão de card
- Atualização de status dos chamados

---

# Endpoints

## Listar Chamados

```http
GET /chamados
```

Exemplo de resposta:

```json
[
  {
    "id": 1,
    "titulo": "Internet indisponível",
    "solicitante": "João Vitor",
    "descricao": "Sem acesso à internet no setor financeiro",
    "prioridade": "ALTA",
    "status": "ABERTO",
    "data_abertura": "2026-06-16T01:15:22.000Z",
    "responsavel": "Maria"
  }
]
```

---

## Criar Chamado

```http
POST /chamados
```

Payload:

```json
{
  "titulo": "Internet indisponível",
  "descricao": "Sem acesso à internet no setor financeiro",
  "prioridade": "ALTA",
  "status": "ABERTO",
  "solicitante": "João Vitor",
  "responsavelId": 2
}
```

Resposta:

```json
{
  "id": 3,
  "titulo": "Notebook não liga",
  "solicitante": "Pedro Santos",
  "descricao": "Equipamento não inicializa",
  "prioridade": "ALTA",
  "status": "ABERTO",
  "responsavel_id": 1,
  "data_abertura": "2026-06-16T03:45:10.000Z"
}
```

Caso o campo `responsavelId` não seja informado, o sistema atribui automaticamente o responsável com menor quantidade de chamados.

---

## Atualizar Status

```http
PATCH /chamados/:id/status
```

Payload:

```json
{
  "status": "RESOLVIDO"
}
```

Resposta:

```json
{
  "msg": "Status atualizado com sucesso",
  "chamado": {
    "id": 1,
    "status": "RESOLVIDO"
  }
}
```

---

## Listar Responsáveis

```http
GET /responsaveis
```

Resposta:

```json
[
  {
    "id": 1,
    "nome": "Maria"
  },
  {
    "id": 2,
    "nome": "Carlos"
  }
]
```

---

# Regras de Negócio

- O responsável informado deve existir.
- Caso nenhum responsável seja informado, o sistema seleciona automaticamente o responsável com menor quantidade de chamados.
- Todo chamado recebe data de abertura automaticamente.
- O status do chamado pode ser atualizado posteriormente.
- Os dados são persistidos em PostgreSQL.

---

# Autor

João Santos
