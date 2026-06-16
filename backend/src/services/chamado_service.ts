import { ChamadoModel } from '../models/chamado_model';
import { CallTypeCreate, CallTypeResponse, ResponsibleType } from '../types/chamado_type';

export class ChamadoService {

    constructor(
        private chamadoModel: ChamadoModel
    ) {}
    public async listAllCalls(): Promise<CallTypeResponse[]> {
        const response = await this.chamadoModel.listAll();
        if (!response) {
            throw new Error('Nenhum chamado encontrado');
        }
        return response;
    }

   public async createCall(callData: CallTypeCreate): Promise<CallTypeResponse> {
        let responsibleId = callData.responsavelId;
        // verifica se o id do responsável foi fornecido, caso contrário, atribui o chamado ao responsável com menos chamados
        if (!responsibleId) {
            const responsibleWithLessCalls = await this.chamadoModel.responsibleWithLessCalls();
            responsibleId = responsibleWithLessCalls.id;
        }
        // considerando que o id foi passado entao passa a verificar se o responsavel com aquele id existe, caso contrário, lança um erro
        const responsible = await this.chamadoModel.getResponsibleById(responsibleId);
        if (!responsible) {
            throw new Error('Responsável não encontrado');
        }
        
        const response =  await this.chamadoModel.create({
                ...callData,
                responsavelId: responsibleId,
            })
        if (!response) {
            throw new Error('Erro ao criar chamado');
        }
        return response;

   }
}