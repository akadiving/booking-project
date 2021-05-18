const verifier = require('email-verify');

 
const verifyEmail = ( req, res, next ) =>
  
  verifier.verify( req.body.email, ( err, info ) => {

  

    if( err ){
      res.sendStatus(500);
    } 
  
    else{
    
      /**
       *  If Email is not verifired returning 401 wrong credentials
       */
      if(info.success !== true) {
          res.status(401).send({ 'error' : 'Wrong Credentials' });
          
      }
  
     
      next();
    }
  });


module.exports = verifyEmail