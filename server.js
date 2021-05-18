require('dotenv').config();
const express = require('express');
const app = express();

/**
 * Helper Packages
 */
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


/**
 *  SESSION
 */
const session = require('./mongoDb/session/session');


/**
 * Middlewares
 */
const verifyEmail = require('./middlewares/verifyEmail');
const redirectLogin = require('./middlewares/redirectLogin');


/**
 *  ROUTERS
 */
const loginRouter = require('./routes/login.js');
const logoutRouter = require('./routes/logout');


/**
 * MiddleWares
 */
 app.use(express.json({ limit: '50mb' }));

 app.use(express.urlencoded({ extended: true }));
 app.use(cors({
     origin: process.env.NODE_ENV === 'production' ? 'https://colab-booking.herokuapp.com/' : 'http://localhost:5000/',
     optionsSuccessStatus: 200,
     credentials: true
 }));
 app.use(cookieParser());

 app.use(session);


/**
 *  ROUTES
 */
app.use('/api/login', verifyEmail, loginRouter);
app.use('/api/logout', redirectLogin, logoutRouter);



/**
 *  Morgan Loger 
 */
if(process.env.NODE_ENV === 'dev') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}



app.get('/', ( req , res ) => {
    
    if(req.session.name){
        res.send(`hello ${req.session.name}`)
    }

    res.send('Server is up')
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is listening to port ${PORT}`));

module.exports = app;