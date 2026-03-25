import express from 'express';
import ProductController from '../controller/ProductController.js';
import checklogin from '../middleware/authMiddleware.js';
const products = new ProductController();

let router = express.Router();
router.route('/')
    .get(checklogin,products.index)
    .post(products.store);
router.route('/:id')
 .get( products.show)
 .put(products.update)
    .delete(products.destroy);
export default router;