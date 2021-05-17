require('dotenv').config();
const express = require('express');
const app = express();

/**
 * Helper Packages
 */
const cors = require('cors');
const morgan = require('morgan');


/**
 *  ROUTERS
 */
const loginRouter = require('./routes/login.js');


/**
 * MiddleWares
 */
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: [ "GET", "POST", "PUT", "DELETE" ]
}));



/**
 *  ROUTES
 */
app.use('/api/login', loginRouter);


/**
 *  Morgan Loger 
 */
if(process.env.NODE_ENV === 'dev') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app.get('/', ( req , res ) => {
    res.send('Server is up')
})



const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`server is listening to port ${PORT}`));

module.exports = app;