require('dotenv').config();
process.env.NODE_ENV = 'test';

const User = require('../mongoDb/models/user');
const Doctor = require('../mongoDb/models/doctor');


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);





module.exports = { chai, User, Doctor, server }