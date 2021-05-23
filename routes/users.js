const express = require('express');
const router = express.Router();

const User = require('../mongoDb/models/user');


router.get('/', async (req, res) => {
    try {
        
        const allUsers = await User.find({});
    
        res.status(200).send(allUsers);
    } catch (error) {
        
        res.status(500).send(error)
    }
})

module.exports = router;