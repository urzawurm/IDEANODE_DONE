import express from 'express';
const router = express.Router();

import { getProduct, postSearchProduct } from '../controllers/productController.js';

router.get('/', getProduct);
//by Alan
router.post("/",postSearchProduct);

export default router;