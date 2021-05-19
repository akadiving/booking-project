const { compareHash } = require("../controllers/admin/hash");

const verifyAdmin = async ( req, res, next ) => {
    
    const adminPass = process.env.ADMIN_PASSWORD;

    console.log(req.session, adminPass);

    const isAdmin = await compareHash( adminPass, req.session.hash )

    console.log('isAdmin', isAdmin);
    
    if(!isAdmin){
       return res.status(403).json({
           "error": "Access Denied"
       })
    }

    next();
    
}

module.exports = verifyAdmin ;