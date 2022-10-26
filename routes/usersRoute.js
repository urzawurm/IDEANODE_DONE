import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import passport from "passport";
import {getRegister, postRegister, getLogin, postLogin, getLogout, getProfile, uploadAvatar, postProfile, deleteProfile} from "../controllers/userController.js";
import ensureAuthenticated from "../helpers/auth.js";
//import passportConfig from "../config/passportConfig.js";

const router = express.Router();

router.route("/register").get(getRegister).post(postRegister);
router.route("/login").get(getLogin).post(postLogin);
router.route("/logout").get(getLogout);
router.get("/profile",ensureAuthenticated, getProfile);
router.post("/profile", ensureAuthenticated, uploadAvatar, postProfile);
router.delete("/profile",ensureAuthenticated, deleteProfile);

export default router;
