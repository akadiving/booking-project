const { compareHash } = require("../controllers/admin/hash");

const verifyAdmin = async ( req, res, next ) => {
    
    const adminPass = process.env.ADMIN_PASSWORD;


    const isAdmin = await compareHash( adminPass, req.session.hash )

   
    
    if(!isAdmin){
       return res.status(403).json({
           "error": "Access Denied"
       })
    }

    next();
    
}

module.exports = verifyAdmin ;