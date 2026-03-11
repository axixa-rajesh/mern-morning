import express from 'express';
import CategoryController from '../controller/CategoryController.js';
const path = new CategoryController();
let router = express.Router();
router.route('/')
    .get(path.index)
    .post(path.store);
router.route('/:id')
 .get( path.show)
 .put(path.update)
    .delete(path.destroy);
export default router;