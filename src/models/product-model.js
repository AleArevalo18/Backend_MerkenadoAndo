// =============== Requerimientos =============
const mongoose = require('mongoose');
// ============================================

// =================== Esquema ================
const {Schema} = mongoose
// ============================================

// =================== Creación del esquema ================
const productSchema = new Schema({
    nombre: String,  
    marca: String, 
    presentacion: String, 
    cantPresent: Number, 
    unidad: String, 
    cantStock: Number, 
    precio: Number, 
    imagen: String,
    categoria: String,
    activo:{type:Boolean, default:true},
})
// ============================================

// =================== Exportación ================
module.exports = mongoose.model('products', productSchema);
// ============================================