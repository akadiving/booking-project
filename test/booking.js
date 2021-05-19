const { chai, User, Doctor, server } = require('./testSetup');


const user = {
    name : 'ikamean',
    email : 'ikamean@gmail.com',
}

const admin = {
    name : "admin",
    email : process.env.ADMIN_EMAIL,
    password : process.env.ADMIN_PASSWORD
}

const wrongEmail = {
    name : 'ikamean',
    email : 'wrongEmail@gmail.com'
}


