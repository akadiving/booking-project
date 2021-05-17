const session = require('express-session')
const store = require('./store');

const sess = session({
    name: 'sid',
    resave: false,
    secret: process.env.SESS_SECRET,
    saveUninitialized: false,
    store: store,
    cookie :{
        sameSite: 'strict',
        httpOnly: true, 

        
        
    }
});

module.exports = sess;