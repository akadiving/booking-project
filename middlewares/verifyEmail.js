const verifier = require('email-verify');

 
const verifyEmail = ( req, res, next ) => 
  
{
    const email = req.body.email;
    const name = req.body.name;
    
    if(!email || !name){
      return res.status(403).json({
          error : "Wrong Credentials, Request must be Url-Encoded"
      });
  }  

  
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
}

module.exports = verifyEmail