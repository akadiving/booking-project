const express = require('express');
const router = express.Router();

const Admin = require('../mongoDb/models/admin');
const Doctor = require('../mongoDb/models/doctor');

router.get('/:email', async ( req, res ) => {
    try {
        
        const doctor = await  Doctor.findOne({ email : req.params.email });
        const admin = await  Admin.findOne({ email : req.params.email });

        if( !admin && !doctor ){
            return res.status(404).json({ error: 'doctor by that email not found'})
        }

        if( admin ) {
            return res.json(admin)
        }

        res.json(doctor)

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;