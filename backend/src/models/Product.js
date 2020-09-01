const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        nombre: { type: String},
        descripcion: { type: String },
        stock: { type: String },
        categoria: { type: String },
        date: Date
    }, {
        timestamps: true
    });

module.exports = model('Product', productSchema);