require('dotenv').config();
const express = require('express');
const app = express();

/**
 * Helper Packages
 */
const cors = require('cors');
const morgan = require('morgan');

/**
 *  SESSION
 */
const session = require('./mongoDb/session/session');


/**
 * Middlewares
 */
const verifyEmail = require('./middlewares/verifyEmail');


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

app.use(session);


/**
 *  ROUTES
 */
app.use('/api/login', verifyEmail, loginRouter);



/**
 *  Morgan Loger 
 */
if(process.env.NODE_ENV === 'dev') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}



app.get('/', ( req , res ) => {
    console.log('Session is activated', req.session);
    res.send('Server is up')
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is listening to port ${PORT}`));

module.exports = app;