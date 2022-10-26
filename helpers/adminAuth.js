export default function ensureIsAdmin(req,res,next){
  if(req.isAuthenticated() && res.locals.user.isAdmin){
      return next();
  }
  req.flash(`error_msg`,`Not Authorized`);
  res.redirect('/');
}