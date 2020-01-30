import { Router } from 'express';
import usuarioControler from '../controllers/usuarioControler';
import verificarToken from '../verificarToken';

const router = Router();

router.post('/registrarse', usuarioControler.registrarse);
router.post('/logearse', usuarioControler.logearse);
router.post('/recuperar-password', usuarioControler.recuperarPassword);
router.get('/listar', verificarToken, usuarioControler.listar);

export default router;