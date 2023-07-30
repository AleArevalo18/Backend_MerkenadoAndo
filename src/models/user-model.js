const mongoose = require('mongoose');

const {Schema} = mongoose


// ========== Creación del esquema del usuario =======
const userSchema = new Schema({
    nombres: String,
    apellidos: String,
    documento: String,
    telefono: String,
    email: String,
    contrasenia: String,
    activo: {type: Boolean, default:true},
    rol: {type: String, default:"user"},
    fechaRegistro: {type: Date, default:Date.now}
})

module.exports = mongoose.model('user', userSchema);