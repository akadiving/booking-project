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

const user = {
    name : 'ikamean',
    email : 'ikamean@gmail.com',
}

const wrongEmail = {
    name : 'ikamean',
    email : 'wrongEmail@gmail.com'
}

let Cookie = '';

describe('Login / Logout flow', () => {

    try {


        it('Login status must be 200 and user object must be returned from server', async () => {
            
            const res = await chai.request(server)
                        .post('/api/login')
                        .send(user);

            console.log('Login Status =>>>>', res.status);
            console.log(res.body);

            res.should.have.status(200)
            res.body.should.be.a('object')

            Cookie = res.headers['set-cookie'].pop().split(';')[0];
     
        });

        it('Respones text should be Hello', async () => {

            const req = chai.request(server).get('/');
            // Set cookie to get saved user session
            req.cookies = Cookie;

            const res = await req;

            console.log(res.text);
            console.log('GET status =>>>', res.status);

            res.text.should.be.a.string('hello ikamean')
            res.should.have.status(200)

        })


        it('Login status must be 401', async () => {

            const res = await chai.request(server)
                        .post('/api/login')
                        .send(wrongEmail)


            console.log('Login Status =>>>>', res.status);       
            console.log(res.body);

            res.body.should.be.a('object');
            res.should.have.status(401);
        });


    } catch (error) {
        console.log(error);
    }

    
});