import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

export const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT || '5432'),
    database: process.env.PG_DATABASE,
});

pool.connect()
    .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso!'))
    .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));