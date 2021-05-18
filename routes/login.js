const express = require('express');
const router = express.Router();

const { findByEmailIfExists } = require('../controllers/login/userHandler');
const doctor = require('../mongoDb/models/doctor');
const User = require('../mongoDb/models/user');

router.post('/', async ( req, res ) => {
    const email = req.body.email;
    const name = req.body.name;

    const adminEmail = process.env.ADMIN_EMAIL;

    
    
    // Initialize Session Variables
    req.session.email = email;
    req.session.name = name;

    
    
    // Find Out if Email allready Exists in our Database
    const user = await findByEmailIfExists(email);

    // If user allready exists return Its Object
    if(user){
        return res.status(200).send(user);
    }



    /**
     *  If user is admin create new Doctor object and send it back as response.
     */
    if(adminEmail === email){
        const adminUser = new doctor({
            name: name,
            email: adminEmail,
            booking: [],
            occupation: req.body.occupation || 'doctor'
        })

        await adminUser.save();

        return res.status(201).send(adminUser);

    }


    //If not Create New One In Database and Return It

    const newUser =new User({ 
        name : name,
        email : email,
        booking : []
    })

    await newUser.save();

    res.status(201).send(newUser)


})

module.exports = router;