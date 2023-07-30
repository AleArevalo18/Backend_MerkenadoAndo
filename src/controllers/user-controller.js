// =========== Instancia del controlador ==========
const userCtr = {};
// ================================================



// =========== Requerimientos ============

const userModel = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const req = require('express/lib/request');

// =======================================

// =========== Crear Usuarios ============

userCtr.crearUsuario = async(req, res) =>{
    const {nombres, apellidos, documento, telefono, email, contrasenia} = req.body
    const nuevoUser = new userModel({
        nombres, 
        apellidos, 
        documento, 
        telefono, 
        email, 
        contrasenia
    })

    // Validación de usuarios ya existentes
    const emailUser = await userModel.findOne({email:email})
    if(emailUser){
        res.json({
            mensaje: 'El usuario ya se encuentra registrado'
        })
    }
    // Creación de nuevos usuarios, encriptado de contraseñas y firma de tokens
    // Recordar que los roles deben ser ("user" o "admin")
    else{
        nuevoUser.contrasenia = await bcrypt.hash(contrasenia, 10)
        const token = jwt.sign({_id:nuevoUser._id}, 'ProyectoFinal')
        await nuevoUser.save()
        res.json({
            mensaje: 'Bienvenido a Merkeando - Ando!!',
            id: nuevoUser._id,
            nombres: nuevoUser.nombres,
            apellidos: nuevoUser.apellidos,
            rol: nuevoUser.rol,
            token
        })
    }
}

// =======================================


// =========== Login ============

userCtr.login = async(req, res) => {
    const {email, contrasenia} = req.body
    const usuario = await userModel.findOne({email:email})
    if(!usuario){
        return res.json({
            mensaje:'Correo incorrecto'
        })
    }
    
    // ========= Compara la contraseña ingresada con la del usuario
    const match = await bcrypt.compare(contrasenia, usuario.contrasenia)
    if(match){
        const token = jwt.sign({_id: usuario._id}, 'ProyectoFinal')
        res.json({
            mensaje: '¡Bienvenido a Merkeando - Ando!',
            id: usuario._id,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            rol: usuario.rol,
            token
        })
    }
    else{
        res.json({
            mensaje: 'La contraseña es incorrecta'
        })
    }
}
// =======================================


// =========== Listar Usuarios ============
userCtr.listarUsers = async(req, res) => {
    const respuesta = await userModel.find()
    res.json(respuesta)
}
// =======================================




// =========== Actualizar Usuarios ============
// userCtr.actuaizarUser = async(req, res) => {
//     const id = req.params.id
//     await userModel.findByIdAndUpdate({_id:id}, req.body)
//     const respuesta = await userModel.findById({_id:id})
//     res.json({
//         mensaje: 'El cliente ha sido actualizado',
//         respuesta
//     })
// }
// =======================================

// =========== Actualizar Usuarios ============
userCtr.actuaizarUser = async(req, res) => {
    const id = req.params.id
    await userModel.findByIdAndUpdate(id, req.body)
    const respuesta = await userModel.findById(id)
    res.json({
        mensaje: 'El cliente ha sido actualizado',
        respuesta
    })
}
// =======================================




// =========== Eliminar Usuarios ============
userCtr.eliminarUser = async(req, res) =>{
    const id = req.params.id
    await userModel.findByIdAndRemove({_id:id})
    res.json({
        mensaje: 'El usuario fue eliminado con exito!'
    })
}
// =======================================


// =========== Exportación de módulos ============
module.exports = userCtr
// ===============================================