import { CallTypeResponse, CallTypeCreate, ResponsibleType } from './../types/chamado_type';
import { pool } from '../database/connection';

export class ChamadoModel {
    public async listAll(): Promise<CallTypeResponse[]> {
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
    
    public async create(chamado: CallTypeCreate): Promise<CallTypeResponse> {
        const { titulo, solicitante, descricao, prioridade, status, responsavelId, dataCriacao } = chamado;
        const query = `INSERT INTO chamados 
        (titulo, 
        solicitante, 
        descricao, 
        prioridade, status, 
        responsavelId, 
        data_criacao) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const response = await pool.query(query, [titulo, solicitante, descricao, prioridade, status, responsavelId, dataCriacao]);
        return response.rows[0];
    }

    public async responsibleWithLessCalls (): Promise<ResponsibleType> {
        const query = `SELECT r.id, r.nome, 
         COUNT(c.id) as total_chamados
         FROM responsaveis r
         LEFT JOIN chamados c ON r.id = c.responsavel_id
         GROUP BY r.id, r.nome
         ORDER BY total_chamados ASC, r.id ASC
         LIMIT 1`;
        const response = await pool.query(query);
        return response.rows[0];
    }

    public async getResponsibleById(id: number): Promise<ResponsibleType> {
        const query = `SELECT id, nome FROM responsaveis WHERE id = $1`;
        const response = await pool.query(query, [id]);
        return response.rows[0];
    }
}