# Sistema de Chamados Internos

API REST desenvolvida em Node.js, TypeScript e PostgreSQL para gerenciamento de chamados internos de uma empresa.

## Tecnologias Utilizadas

* Node.js
* TypeScript
* Express
* PostgreSQL
* Docker
* Jest

## Funcionalidades

* Listar chamados
* Criar chamados
* Associação automática de responsável quando não informado
* Consulta de responsáveis
* Persistência em PostgreSQL
* Testes unitários da camada de serviço

## Estrutura do Projeto

```text
src/
├── controllers/
├── services/
├── models/
├── routes/
├── database/
├── types/
└── index.ts

tests/
└── services/
```

## Pré-requisitos

* Docker
* Docker Compose
* Node.js 22+

## Configuração

Clone o repositório:

```bash
git clone git@github.com:JoaoSantosP/sistema_de_chamados_internos.git
cd backend
```

Instale as dependências:

```bash
npm install
```

## Executando o Banco de Dados

Suba os containers:

```bash
docker compose up -d
```

O PostgreSQL será iniciado utilizando as configurações definidas no arquivo `docker-compose.yml`.

## Executando a Aplicação

Inicie a aplicação em modo desenvolvimento:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

## Executando os Testes

```bash
npm test
```

## Endpoints

### Listar Chamados

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
### Criar Chamado

```http
POST /chamados
```
Exemplo de resposta:

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
Exemplo de payload:

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

Caso o campo `responsavelId` não seja informado, o sistema atribui automaticamente o chamado ao responsável com menor quantidade de chamados.

## Regras de Negócio

* O responsável informado deve existir no sistema.
* Caso nenhum responsável seja informado, o sistema seleciona automaticamente o responsável com menor número de chamados.
* Chamados são registrados com data de abertura automática pelo banco de dados.

## Testes

Foram implementados testes unitários para a camada de serviço cobrindo os seguintes cenários:

* Listagem de chamados com sucesso.
* Erro ao não encontrar chamados.
* Criação de chamado com responsável informado.
* Criação de chamado com responsável automático.
* Erro quando o responsável não existe.
* Erro quando a criação falha.

```
```
