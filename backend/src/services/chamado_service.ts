import { ChamadoModel } from '../models/chamado_model';
import { CallTypeResponse, ResponsibleType } from '../types/chamado_type';

export class ChamadoService {
    private chamadoModel: ChamadoModel = new ChamadoModel();

    public async listAllCalls(): Promise<CallTypeResponse[]> {
        const response = await this.chamadoModel.listAll();
        if (!response) {
            throw new Error('Nenhum chamado encontrado');
        }
        return response;
    }

    /* public async getResponsibleWithLessCalls(id: number): Promise<ResponsibleType> {
        if (!id) {
            const response = await this.chamadoModel.responsibleWithLessCalls();

        }
    } */
   public async createCall(callData: CallTypeResponse): Promise<CallTypeResponse> {
        let responsibleId = callData.responsavelId;
        if (!responsibleId) {
            const responsibleWithLessCalls = await this.chamadoModel.responsibleWithLessCalls();
            responsibleId = responsibleWithLessCalls.id;
        } const response =  await this.chamadoModel.create({
                ...callData,
                responsavelId: responsibleId,
            })
        if (!response) {
            throw new Error('Erro ao criar chamado');
        }
        return response;

   }
}