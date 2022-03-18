
exports.loingErrorHandler = (err,req,res,next) =>{

!!err.statusCode? err.statusCode : err.statusCode=500;
return res.render('/login',{message:err.message,status:false});
}