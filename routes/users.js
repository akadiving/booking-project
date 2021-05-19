const express = require('express');
const router = express.Router();

const User = require('../mongoDb/models/user');


router.get('/', async (req, res) => {
    const allUsers = await User.find({});

    res.status(200).send(allUsers);
})

module.exports = router;