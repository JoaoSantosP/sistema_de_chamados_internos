import { ChamadoService } from '../../src/services/chamado_service';
import { CallTypeCreate } from '../../src/types/chamado_type';

describe('ChamadoService', () => {
    let mockModel: any;
    let service: ChamadoService;

    beforeEach(() => {
        mockModel = {
            listAll: jest.fn(),
            create: jest.fn(),
            getResponsibleById: jest.fn(),
            responsibleWithLessCalls: jest.fn(),
            updateStatus: jest.fn()
        };

        service = new ChamadoService(mockModel);
    });

    describe('listAllCalls', () => {
        it('deve retornar todos os chamados', async () => {
            const mockCalls = [
                {
                    id: 1,
                    titulo: 'Problema na impressora'
                }
            ];

            mockModel.listAll.mockResolvedValue(mockCalls);

            const result = await service.listAllCalls();

            expect(result).toEqual(mockCalls);
            expect(mockModel.listAll).toHaveBeenCalledTimes(1);
        });

        it('deve lançar erro quando não encontrar chamados', async () => {
            mockModel.listAll.mockResolvedValue(null);

            await expect(
                service.listAllCalls()
            ).rejects.toThrow('Nenhum chamado encontrado');
        });
    });

    describe('createCall', () => {
        it('deve criar um chamado quando o responsável for informado', async () => {
            const callData: CallTypeCreate = {
                titulo: 'Internet caiu',
                descricao: 'Sem conexão',
                prioridade: 'ALTA',
                status: 'ABERTO',
                solicitante: 'João',
                responsavelId: 1
            };

            const responsible = {
                id: 1,
                nome: 'Carlos'
            };

            const createdCall = {
                id: 10,
                ...callData
            };

            mockModel.getResponsibleById.mockResolvedValue(responsible);
            mockModel.create.mockResolvedValue(createdCall);

            const result = await service.createCall(callData);

            expect(result).toEqual(createdCall);

            expect(mockModel.getResponsibleById)
                .toHaveBeenCalledWith(1);

            expect(mockModel.create)
                .toHaveBeenCalledWith(callData);
        });

        it('deve atribuir o responsável com menos chamados quando nenhum responsável for informado', async () => {
            const callData: CallTypeCreate = {
                titulo: 'Notebook não liga',
                descricao: 'Tela preta',
                prioridade: 'MEDIA',
                status: 'ABERTO',
                solicitante: 'Maria'
            };

            const responsible = {
                id: 2,
                nome: 'Ana'
            };

            const createdCall = {
                id: 20,
                ...callData,
                responsavelId: 2
            };

            mockModel.responsibleWithLessCalls
                .mockResolvedValue(responsible);

            mockModel.getResponsibleById
                .mockResolvedValue(responsible);

            mockModel.create
                .mockResolvedValue(createdCall);

            const result = await service.createCall(callData as any);

            expect(result).toEqual(createdCall);

            expect(mockModel.responsibleWithLessCalls)
                .toHaveBeenCalledTimes(1);

            expect(mockModel.create)
                .toHaveBeenCalledWith({
                    ...callData,
                    responsavelId: 2
                });
        });

        it('deve lançar erro quando o responsável não existir', async () => {
            const callData: CallTypeCreate = {
                titulo: 'Teste',
                descricao: 'Teste',
                prioridade: 'ALTA',
                status: 'ABERTO',
                solicitante: 'João',
                responsavelId: 999
            };

            mockModel.getResponsibleById
                .mockResolvedValue(null);

            await expect(
                service.createCall(callData)
            ).rejects.toThrow('Responsável não encontrado');

            expect(mockModel.create)
                .not.toHaveBeenCalled();
        });

        it('deve lançar erro quando a criação falhar', async () => {
            const callData: CallTypeCreate = {
                titulo: 'Teste',
                descricao: 'Teste',
                prioridade: 'ALTA',
                status: 'ABERTO',
                solicitante: 'João',
                responsavelId: 1
            };

            mockModel.getResponsibleById.mockResolvedValue({
                id: 1,
                nome: 'Carlos'
            });

            mockModel.create.mockResolvedValue(undefined);

            await expect(
                service.createCall(callData)
            ).rejects.toThrow('Erro ao criar chamado');
        });
    });
    describe('updateStatus', () => {
        it('deve atualizar o status de um chamado', async () => {
            const chamadoAtualizado = {
                id: 1,
                titulo: 'Internet caiu',
                descricao: 'Sem conexão',
                prioridade: 'ALTA',
                status: 'RESOLVIDO',
                solicitante: 'João',
                responsavelId: 1
            };

            mockModel.updateStatus.mockResolvedValue(
                chamadoAtualizado
            );

            const result =
                await service.updateStatus(
                    1,
                    'RESOLVIDO'
                );

            expect(result).toEqual(
                chamadoAtualizado
            );

            expect(mockModel.updateStatus)
                .toHaveBeenCalledWith(
                    1,
                    'RESOLVIDO'
                );
        });

        it('deve lançar erro quando o chamado não existir', async () => {
            mockModel.updateStatus.mockResolvedValue(
                null
            );

            await expect(
                service.updateStatus(
                    999,
                    'RESOLVIDO'
                )
            ).rejects.toThrow(
                'Chamado não encontrado'
            );

            expect(mockModel.updateStatus)
                .toHaveBeenCalledWith(
                    999,
                    'RESOLVIDO'
                );
        });
    });
});