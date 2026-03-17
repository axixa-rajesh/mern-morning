import express from 'express';
import AuthController from '../controller/AuthController.js';
const path = new AuthController();
let router = express.Router();
router.route('/register')
    .post(path.register)

export default router;