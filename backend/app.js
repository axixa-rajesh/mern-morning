import express from 'express';
import cors from "cors";
import CategoryController from './controller/CategoryController.js';
import ProductController from './controller/ProductController.js';
const cats = new CategoryController();
 const products = new ProductController();

const app = express();
app.use(express.json());
app.use(cors({
    origin:[process.env.FRONTEND_URL]
}))
app.route('/category')
    .get(cats.index)
    .post(cats.store);
app.route('/category/:id')
.get( cats.show)
.put(cats.update)
    .delete(cats.destroy);


app.route('/products')
    .get(products.index)
    .post(products.store);
app.route('/products/:id')
 .get( products.show)
 .put(products.update)
 .delete(products.destroy);

export default app;

