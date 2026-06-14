import { ChamadoTypeResponse, ChamadoTypeCreate } from './../types/chamado_type';
import { pool } from '../database/connection';

export class Chamado {
    public async listAll(): Promise<ChamadoTypeResponse[]> {
        // Lógica para criar um chamado
        const query = `SELECT c.id, 
            c.titulo, 
            c.solicitante, 
            c.descricao, 
            c.prioridade, 
            c.status, 
            c.data_criacao, 
            r.nome as responsavel 
            FROM 
            chamados c LEFT JOIN responsaveis r ON c.responsavelId = r.id`
        const response = await pool.query( query );
        return response.rows;
    }
    
    public async create(chamado: ChamadoTypeCreate): Promise<ChamadoTypeResponse> {
        const { titulo, solicitante, descricao, prioridade, status, responsavelId, data_criacao } = chamado;
        const query = `INSERT INTO chamados 
        (titulo, 
        solicitante, 
        descricao, 
        prioridade, status, 
        responsavelId, 
        data_criacao) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const response = await pool.query(query, [titulo, solicitante, descricao, prioridade, status, responsavelId, data_criacao]);
        return response.rows[0];
    }
}