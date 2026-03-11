import express from 'express';
import cors from "cors";
import proudctrouter from './routes/productroute.js';
import categoryrouter from './routes/categoryroute.js';
const app = express();
app.use(express.json());
app.use(cors({
    origin:[process.env.FRONTEND_URL]
}))
app.use('/products', proudctrouter);
app.use('/category', categoryrouter);

export default app;

