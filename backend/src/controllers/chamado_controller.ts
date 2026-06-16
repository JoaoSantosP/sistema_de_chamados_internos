import { ChamadoService } from '../services/chamado_service';
import { Request, Response } from 'express';
import {callSchema}  from '../schema/chamadoValidation';

export class ChamadoController {
    
    constructor(
        private chamadoService: ChamadoService
    ) {}
    public async listAllCalls(_req: Request, res: Response): Promise<Response> {
        try {
            const response = await this.chamadoService.listAllCalls();
            return res.status(200).json(response);
        } catch (error: any) {            
            return res.status(500).json({ error: error.message });
        }
    }

    public async createCall(req: Request, res: Response): Promise<Response> {
        try {
            const callValidated = callSchema.parse(req.body);
            const response = await this.chamadoService.createCall(callValidated);
            return res.status(201).json(response);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}