import express from 'express';
import { getShoppingCart, deleteShoppingCart, postShoppingCart, getConfirmCart, updateCarts, /*invoiceRecord*/} from '../controllers/cartController.js';

const router = express.Router();



router.get("/",getShoppingCart);
router.delete('/(:id)', deleteShoppingCart);
//router.post("/buy", invoiceRecord);
router.post("/buy", postShoppingCart);

router.get('/confirm', getConfirmCart);
router.post('/add', updateCarts);

export default router;