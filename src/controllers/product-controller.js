const productCtr = {};
const productModel = require('../models/product-model');

// Crear Productos
productCtr.crearProducto = async(req, res) => {
    const {nombre, marca, presentacion, cantPresent, unidad, cantStock, precio, imagen, categoria} = req.body
    const nuevoProducto = new productModel({
        nombre, 
        marca, 
        presentacion, 
        cantPresent, 
        unidad, 
        cantStock, 
        precio, 
        imagen, 
        categoria,
    })

    await nuevoProducto.save()
    res.json({
        mensaje: 'El producto fue creado satisfactoriamente!'
    })

}


// Listar productos

productCtr.listarProductos = async(req, res) => {
    const respuesta = await productModel.find()
    res.json(respuesta)
}


// Listar productos por ID 

productCtr.listarProductosId = async(req, res) => {
    const id = req.params.id
    const respuesta = await productModel.findById({_id:id})
    res.json(respuesta)
}

// Actualizar Productos

productCtr.actualizarProducto = async(res, req) => {
    const id = req.params.id
    await productModel.findByIdAndUpdate({_id:id},req.body)
    const respuesta = productModel.findById({_id:id})
    res.json({
        mensaje: 'El producto fue actualizado con exito',
        respuesta
    })
}

// Eliminar producto

productCtr.eliminarProducto = async(req, res) => {
    const id = req.params.id
    await productModel.findByIdAndRemove({_id:id})
    res.json({
        mensaje: 'El producto fue eliminado con exito!'
    })
}

// =========== Exportación de módulos ===========
module.exports = productCtr;
// ==============================================