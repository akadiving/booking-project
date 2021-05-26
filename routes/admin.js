const express = require('express');
const router = express.Router();
const uuid = require('uuid').v4;

const Admin = require('../mongoDb/models/admin');

const { compareHash } = require('../controllers/admin/hash');
const  checkCookie  = require('../middlewares/checkCookie');
const verifyAdmin = require('../middlewares/verifyAdmin');

/**
 *  Get Logged in admin user
 */


router.get('/me', verifyAdmin, async ( req, res ) => {
    try {
        const admin = await Admin.findOne({ email: req.session.email });

        res.send(admin)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/login', async ( req, res ) => {
    
    try {

        
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

    } catch (error) {
        res.status(500).send(error)
    }



});

/**
 *  Add Working hours from admin dashboard
 */

router.post('/workTime/add', verifyAdmin, async ( req, res ) => {

    try {
        
        const { workTime, workDay } = req.body;
    
        
        const admin = await Admin.findOne({  email: req.session.email })
    
    
        const newWorkTime = {
            day: workDay,
            time: workTime,
            id: uuid()
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
    
});

/**
 * Delete available work date
 */

router.delete('/workTime/delete/:id', verifyAdmin, async ( req, res) => {

    try {
        
        const { id } = req.params;
        
        const admin = await Admin.findOne({ email : req.session.email });

        const workTime = admin.workTime.find( time => time.id === id )
        
        /** 
         *  if id is not present or workTime object not found send 404
         */

        if(!workTime || !id ){
            return res.status(404).send({
                error: 'workTime Not Found, check request id parameter'
            })
        }
    
        admin.workTime = admin.workTime.filter( time => time.id !== id );

    
        await admin.save();
    
        res.status(200).json({
            success: true,
            msg : 'work time deleted successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }


})





module.exports = router;