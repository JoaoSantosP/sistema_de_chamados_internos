import { Router } from 'express';
import { ChamadoController } from '../controllers/chamado_controller';
import { ChamadoService } from '../services/chamado_service';
import { ChamadoModel } from '../models/chamado_model';

const router = Router();

const chamadoModel = new ChamadoModel();
const chamadoService = new ChamadoService(chamadoModel);
const chamadoController = new ChamadoController(chamadoService);

router.get(
    '/',
    (req, res) => chamadoController.listAllCalls(req, res)
);

router.post(
    '/',
    (req, res) => chamadoController.createCall(req, res)
);

router.patch(
    '/:id/status',
    (req, res) => chamadoController.updateStatus(req, res)
);




export default router;