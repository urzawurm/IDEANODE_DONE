export default function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){ //已經login 
        return next();
    }
    req.flash(`error_msg`,`Pls login or registher `);
    res.redirect(`/users/login`);
}
