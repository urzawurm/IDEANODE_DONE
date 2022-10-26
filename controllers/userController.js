import bcrypt from "bcryptjs"
import passport from "passport";

import User from "../models/User.js";
import multer from "multer";
import * as fs from "fs";

const storageSetting = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "./uploads");
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname);
    },
});
export const uploadAvatar = multer({
    // storage: storageSetting,
    storage: storageSetting,
    fileFilter: (req,file,cb) => {
     const mimetype = file.mimetype;
    if (mimetype === "image/png" || mimetype === "image/jpg" || mimetype === "image/jpeg" || mimetype === "image/gif"){
        cb(null,true);
    } else {
        req.flash("error_msg", "Wrong file type for Avatar !");
        cb(null, false);
    }
},
}).single("avatarUpload");//食呢個名，唔可以錯

export const getRegister= (req, res) => {
    res.render("users/register"); 
};
export const postRegister = (req,res) =>  {  
    let errors=[];
    if (!req.body.name) {
        errors.push({text:"Name is missing!"});
    } 
    if (!req.body.email) {
        errors.push({text:"Email is missing!"});
    } 
    if (req.body.password.length<4) {
        errors.push({text:"Password must be over 4 characters!"});
    }
    if (req.body.password != req.body.password2) {
        errors.push({text:"The first password does not match with the second password!"});
    }
    if (errors.length>0) {
        res.render("users/register", {
        errors: errors,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,
        password2: req.body.password2,
        }); 
    } else { 
        const newUser= new User({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            password: req.body.password, 
        });
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password, salt, (err,hash)=>{
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(()=>{
                    req.flash("success_msg","Register Done!");
                    res.redirect("/users/login");
                })
                .catch(err=>{
                    console.log(err);
                    req.flash("error_msg","Server went wrong!");
                    res.redirect("/register");
                    return;
                });
            });
        });
                // res.redirect("/");
        // res.redirect('/') ;
}
};
export const getLogin = (req,res)=>{
    res.render("users/login");
};
export const postLogin = (req,res, next) => {
    passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
    // session: false, 
})(req,res, next);
};
export const getLogout = (req,res) => {
    req.logout((err) => {
        if (err) throw err;
    req.flash("success_msg", "logged out!");
    res.redirect("/users/login");
    });
};
export const getProfile = (req,res) => {
    res.render("users/profile", {
        name: res.locals.user.name,
        email: res.locals.user.email,
        avatar: res.locals.user.avatar,
    });
};

export const postProfile = (req,res) => {
    User.findOne({_id: res.locals.user._id}).then((user) => {
        if (req.file) {
            let avatarData = fs.readFileSync(req.file.path).toString("base64");
            let avatarContentType = req.file.mimetype;
            
            user.avatar.data = avatarData;
            user.avatar.contentType = avatarContentType;

            fs.unlink(req.file.path,(err)=>{
                if(err)throw err;
            });

            user.save().then(() => {
                req.flash("success_msg", "Avatar uploaded !");
                res.redirect("/users/profile");
            });
        } else {
            req.flash(
                "error_msg", "choose a correct file before clicking 'Upload Avatar' button"
            );
            res.redirect("/users/profile");
        }
    });
};

export const deleteProfile = (req,res)=>{
    User.updateOne({_id: res.locals.user._id},{$unset: {avatar:""}}).then(()=>{
            req.flash("success_msg","Avatar successfully deleted !");
            res.redirect("/users/profile");
        }
    );
};