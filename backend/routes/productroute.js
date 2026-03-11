import express from 'express';
import ProductController from '../controller/ProductController.js';
const products = new ProductController();

let router = express.Router();
router.route('/')
    .get(products.index)
    .post(products.store);
router.route('/:id')
 .get( products.show)
 .put(products.update)
    .delete(products.destroy);
export default router;