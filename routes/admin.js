const express = require('express');
const router = express.Router();
const uuid = require('uuid').v4();

const Admin = require('../mongoDb/models/admin');

const { compareHash } = require('../controllers/admin/hash');
const  checkCookie  = require('../middlewares/checkCookie');

/**
 *  Get Logged in admin user
 */
router.get('/me', checkCookie, async ( req, res ) => {
    try {
        
        const admin = await  Admin.findOne({ email : req.session.email });

        res.send(admin)

    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/login', async ( req, res ) => {
    

    const admin = await Admin.findOne({ email : req.body.email });
    
    // If it cannot match admin in database sent wrong credentials

    if( admin === null || !req.body.password ) {
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
    req.session.name = 'Admin';
    req.session.hash = admin.password;

    


    res.status(200).send(admin);


});

/**
 *  Add Working hours from admin dashboard
 */

router.post('/workTime/add', async ( req, res ) => {

    try {
        
        const { workTime, workDate } = req.body;
    
        
        const admin = await Admin.findOne({  email: req.session.email })
    
    
        const newWorkTime = {
            date: workDate,
            time: workTime,
            id: uuid
        }
    
        
        admin.workTime = [...admin.workTime, newWorkTime ];
    
        await admin.save();
    
    
        res.status(201).json({
            success: true,
            data : newWorkTime
        })

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
    
})





module.exports = router;