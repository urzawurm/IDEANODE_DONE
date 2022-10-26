import express from "express";
import { getAdmin, postAdmin, getWarehouse, deleteProduct, updateProduct, getEditProduct } from "../controllers/adminController.js"; 

const router = express.Router();

router.route("/").get(getAdmin).post(postAdmin);

router.route("/warehouse").get(getWarehouse)
router.delete('/warehouse/(:id)',deleteProduct);
router.route('/warehouse/edit/(:id)').get(getEditProduct).put(updateProduct);

export default router;
