CREATE TABLE responsaveis (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE chamados (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    prioridade VARCHAR(20) NOT NULL,
    status VARCHAR(30) NOT NULL,
    solicitante VARCHAR(100) NOT NULL,
    responsavel_id INTEGER NOT NULL,
    data_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_responsavel
        FOREIGN KEY (responsavel_id)
        REFERENCES responsaveis(id)
);