const express = require('express');
const router = express.Router();

router.post('/', ( req, res ) => {
    const email = req.body.email;
    const name = req.body.name;
    

    

    req.session.email = email;
    req.session.name = name;



    

    res.status(200).json(req.body)
})

module.exports = router;