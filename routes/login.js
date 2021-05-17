const express = require('express');
const router = express.Router();

router.post('/', ( req, res ) => {
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;

    console.log(name,email);

    res.status(200).json(req.body)
})

module.exports = router;