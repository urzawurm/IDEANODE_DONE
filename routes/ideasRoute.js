import express, { Router } from"express";

import { 
    getIdeas, getAddIdea, getEditIdea,
    postAddIdea, putEditIdea, deleteIdea,
    } from "../controllers/ideaController.js"; //../係上一層path, ../../係上二層path, ./係同層path
import {getRecords,}from "../controllers/productController.js";

const router=express.Router();

router.get("/",getIdeas).post("/",postAddIdea);
//router.post("/",postAddIdea);呢句可以搬上去
router.get("/add",getAddIdea);
router.get("/edit/(:id)",getEditIdea).put("/edit/(:id)",putEditIdea);
//router.put("/edit/(:id)",putEditIdea);呢句可以搬上去
router.delete("/(:id)",deleteIdea);
router.get("/products",getRecords);
/*由app.js轉入routes
router.get("/ideas",getIdeas); //因為Router,所以app.get=>router.get
router.post("/ideas",postAddIdea);
router.get("/ideas/add",getAddIdea);
router.get("/ideas/edit/(:id)",getEditIdea);
router.put("/ideas/edit/(:id)",putEditIdea);
router.delete("/ideas/(:id)",deleteIdea);*/

export default router;