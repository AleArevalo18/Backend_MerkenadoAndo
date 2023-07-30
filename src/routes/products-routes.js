// ================ Requerimientos =================
const {Router} = require('express');
const cli = require('nodemon/lib/cli');
const router = Router();
const productCtr = require('../controllers/product-controller');
// Autenticación
const auth = require('../helper/auth');
// =================================================

// ================ Rutas =================
router.post('/crearProducto', productCtr.crearProducto);
router.get('/listarProducto', productCtr.listarProductos);
router.get('/listarProducto/:id', productCtr.listarProductosId);
router.put('/actualizarProducto/:id', productCtr.actualizarProducto);
router.delete('/eliminarProducto/:id', auth.verificacionToken, productCtr.eliminarProducto);
// ========================================


// ================ Exportación de Módulos =================
module.exports = router;
// ========================================