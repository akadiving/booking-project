const redirectLogin = ( req, res, next ) => {

    
    if(!req.session.email){
        
        
       return res.status(401).json({
           "error": "Not Authenticated Request"
       })
    }

    console.log('request author Logging out =>>>>>', req.session.name);

    next();
    
}

module.exports = redirectLogin ;