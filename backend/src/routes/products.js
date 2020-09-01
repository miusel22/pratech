const { Router } = require('express');
const router = Router();

const { getProducts, createProduct, getProduct, deleteProduct, updateProduct } = require('../controllers/products.controller');

router.route('/')
    .get(getProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProduct)
    .delete(deleteProduct)
    .put(updateProduct);

module.exports = router;


