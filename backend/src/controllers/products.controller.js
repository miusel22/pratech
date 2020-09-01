const productCtrl = {};

const Product = require('../models/Product');

productCtrl.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

productCtrl.createProduct = async (req, res) => {
    const { nombre,  descripcion, stock, categoria,date } = req.body;
    const newProduct = new Product({
        nombre,
        descripcion,
        stock,
        categoria,
        date
    });
 
    await newProduct.save();
    res.json('Se ha agregado un nuevo producto');
};


productCtrl.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
}

productCtrl.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
    res.json('Producto Eliminado');
}

productCtrl.updateProduct = async (req, res) => {
    const { nombre, fecha, descripcion, stock, categoria,date } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
        nombre,
        fecha,
        descripcion,
        stock,
        categoria,
        date
    });
    res.json('Producto modificado');
}

module.exports = productCtrl;