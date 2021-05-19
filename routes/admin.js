const express = require('express');
const router = express.Router();

const Admin = require('../mongoDb/models/admin');

const { compareHash } = require('../controllers/admin/hash');

router.post('/login', async ( req, res ) => {
    

    const admin = await Admin.findOne({ email : req.body.email });
    
    // If it cannot match admin in database sent wrong credentials

    if( admin === null ) {
        return res.status(401).send({
            error: "Wrong Credentials"
        });
    }


   // Comparing password from request body and password hash saved in DB
    const passwordsMatch = await compareHash(req.body.password, admin.password );

   
    // If passwords dont match send wrong credentials

    if( !passwordsMatch ){

        return res.status(401).json({
            error : 'Wrong Credentials'
        })

    }

    // If everything is ok send admin object, and Initialize Session 

    req.session.email = req.body.email;
    req.session.name = req.body.name;
    req.session.hash = admin.password;

    


    res.status(200).send(admin);


});

module.exports = router;