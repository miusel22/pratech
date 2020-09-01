const categoriaCtrl = {};

const Categoria = require('../models/Categoria');

categoriaCtrl.getCategorias = async (req, res) => {
    try {
        const categoria = await Categoria.find();
        res.json(categoria);
    }
    catch (err) {
        res.status(400).json({
            error: err
        });
    }
};

categoriaCtrl.createCategoria = async (req, res) => {
    try {
        const { username } = req.body;

        const newCategoria = new Categoria({ username });
        await newCategoria.save();
        res.json('Categoria creada');
    } catch (e) {
        console.log(e)
        res.json(e.errmsg);
    }
};

categoriaCtrl.deleteCategoria = async (req, res) => {
    const { id } = req.params;
    await Categoria.findByIdAndDelete(id);
    res.json('Categoria eliminada');
}

module.exports = categoriaCtrl;