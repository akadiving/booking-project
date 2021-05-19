const express = require('express');
const router = express.Router();

const { findByEmailIfExists } = require('../controllers/login/userHandler');

const User = require('../mongoDb/models/user');

router.post('/', async ( req, res ) => {
    const email = req.body.email;
    const name = req.body.name;
    
    // Initialize Session Variables
    req.session.email = email;
    req.session.name = name;

      
    // Find Out if Email allready Exists in our Database
    const user = await findByEmailIfExists(email);

    // If user allready exists return Its Object
    if(user){
        return res.status(200).send(user);
    }

    //If not Create New One In Database and Return It

    const newUser =new User({ 
        name : name,
        email : email,
        booking : []
    })

    await newUser.save();

    res.status(201).send(newUser)


});


module.exports = router;