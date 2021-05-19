const { compareHash } = require("../controllers/admin/hash");

const verifyAdmin = async ( req, res, next ) => {
    
    const adminPass = process.env.ADMIN_PASSWORD;

    const isAdmin = await compareHash( req.session.hash, adminPass )
    
    if(!isAdmin){
       return res.status(403).json({
           "error": "Access Denied"
       })
    }

    next();
    
}

module.exports = verifyAdmin ;