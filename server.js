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
const checkCookie = require('./middlewares/checkCookie');
const verifyAdmin = require('./middlewares/verifyAdmin');



/**
 *  ROUTERS
 */
const loginRouter = require('./routes/login.js');
const logoutRouter = require('./routes/logout');
const usersRouter = require('./routes/users.js');
const adminRouter = require('./routes/admin');

/**
 * MiddleWares
 */
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cors({
     //origin: process.env.NODE_ENV === 'production' ? 'https://colab-booking.herokuapp.com/' : 'http://localhost:5000/',
     optionsSuccessStatus: 200,
     credentials: true
 }));
 app.use(cookieParser());
 
 app.use(session);
 
 
 /**
  *  ROUTES
  */
 app.use('/api/login', verifyEmail, loginRouter);
 app.use('/api/logout', checkCookie, logoutRouter);
 app.use('/api/users', verifyAdmin,  usersRouter );
 app.use('/api/admin', adminRouter)


// Added yaml



/**
 *  Morgan Loger 
 */
if(process.env.NODE_ENV === 'dev') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}


if( process.env.NODE_ENV === 'test' ){

    app.get('/', ( req , res ) => {
    
        if(req.session.name){
            res.send(`hello ${req.session.name}`)
        }
    
        res.send('Server is up')
    })
}

app.use(express.static(`${__dirname}/dist`));

// app.get('*',  (req,res) => {
//     res.sendFile(`${__dirname}/dist/index.html`);
// });








const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is listening to port ${PORT}`));

module.exports = app;