

function checkForAuthentication(req, res, next){
    const authorizationValue = req.headers.authorization;
    req.user = null;

    if(!authorizationValue || !authorizationValue.startsWith("Bearer"))
    return next()

}

function restrictTo(roles = []){
  return function(req,res,next){
    if(!req.user) return res.redirect("/login");
  }
}

module.exports = {checkForAuthentication,restrictTo}