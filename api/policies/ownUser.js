module.exports = function(req, res, next){
  var userId = req.param('id');
  var currentUserId = req.token.sid;
  if(userId != currentUserId){
    return res.json(403,{err:'No esta autorizado para hacer eso.'});
  }
  next();
}
