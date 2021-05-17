const verifier = require('email-verify');
const infoCodes = verifier.infoCodes;
 
const verifyEmail = ( req, res, next ) => verifier.verify( req.body.email, ( err, info ) => {
  if( err ){
    res.sendStatus(500);
    next();
  } 

  else{
    console.log( "Success (T/F): " + info.success );
    if(info.success !== true) {
        res.sendStatus(401)
        next();
    }
    console.log( "Info: " + info.info );
    next();
  }
});

module.exports = verifyEmail