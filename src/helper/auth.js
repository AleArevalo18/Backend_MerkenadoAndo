// =========== Requerimientos ==========
const auth = {};
const jwt = require('jsonwebtoken');
// =====================================


// ========= Validación por diferencia de Token ===========
auth.verificacionToken = (req, res, next) => {
    if(!req.headers.autorizacion){
        return res.json({
            mensaje: 'No estás autorizado, no te has registrado'
        })
    }

    // Cierre de sesión por eliminación de token
    const token = req.headers.autorizacion
    if(token === 'null'){
        res.json({
            mensaje: 'No estás autorizado, tu sesión ha sido cerrada'
        })
    }

    // Credenciales invalidas
    jwt.verify(token, 'ProyectoFinal', (error, resultado) =>{
        if(error){
            return res.json({
                mensaje: 'No estás autorizado, las credenciales son incorrectas'
            })

            next();
        }
    })

}
// ========================================================



// =========== Exportación de módulos ==========
module.exports = auth;
// =============================================
