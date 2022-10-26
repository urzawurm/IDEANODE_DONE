import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "./../models/User.js";

export default function (passport) {
    passport.use(
        new LocalStrategy ({usernameField: "emailInput"}, function(emailInput, passwordInput, done) {
            User.findOne({email : emailInput}).then(user => {
                if (!user) {
                    return done(null, false, {
                        type: "fail_passport",
                        message: "No User Found",
                    });
                }
                bcrypt.compare(passwordInput, user.password, (err,isMatch) => {
                    if (err) throw err;//可能斷網
                    if (isMatch) {//無斷網
                        return done(null, user);//done 証明做完，要帶走一啲野
                    } else {
                        return done (null, false, {
                            type: "fail_passport",
                            message: "Password Incorrect",
                        });
                    };
                });
            });
        }));
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
        User.findById(id, function(err,user){
            done(err,user);
        });
    });
}
