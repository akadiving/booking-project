const verifyAdmin = ( req, res, next ) => {
    const adminEmail = process.env.ADMIN_EMAIL;

    const isAdmin = adminEmail === req.session.email
    
    if(!isAdmin){
       return res.status(403).json({
           "error": "Access Denied"
       })
    }

    next();
    
}

module.exports = verifyAdmin ;