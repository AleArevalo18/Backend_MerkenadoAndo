// ================ Requerimientos =================
const {Router} = require('express');
const cli = require('nodemon/lib/cli');
const router = Router();
const userCtr = require('../controllers/user-controller');
// Autenticación
const auth = require('../helper/auth');
// =================================================


// ================ Rutas =================
router.post('/login', userCtr.login);
router.post('/crearUsuario', userCtr.crearUsuario);
router.get('/listarUsuarios', userCtr.listarUsers);
router.put('/actualizarUsuarios/:id', userCtr.actuaizarUser);
router.delete('/eliminarUsuario/:id', userCtr.eliminarUser);
// ========================================



// ================ Exportación de Módulos =================
module.exports = router;
// ========================================