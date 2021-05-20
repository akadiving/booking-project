const session = require('express-session')
const store = require('./store');

const sess = session({
    name: 'BookingApp',
    resave: false,
    secret: process.env.SESS_SECRET,
    saveUninitialized: false,
    store: store,
    cookie :{
        sameSite: 'strict',
        httpOnly: true, 
        maxAge: 1000 * 60 * 60
    }
});

module.exports = sess;