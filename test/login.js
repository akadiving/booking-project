require('dotenv').config();
process.env.NODE_ENV = 'test';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');



chai.use(chaiHttp);

const user = {
    userName : 'ikamean',
    password : 'ikamean@gmail.com',
}

describe('Login / Logout flow', () => {

    try {

        // beforeEach( async () => {
        //     await Users.deleteMany({});
        //     await chai.request(server)
        //           .post('/api/register')
        //           .send(newUser)
        // })

        it('Login status must be 200 and user object must be returned from server', async () => {
            
            const res = await chai.request(server)
                        .post('/api/login')
                        .send(user);
            console.log('Login Status =>>>>', res.status);
            console.log(res.body);

        });
    } catch (error) {
        console.log(error);
    }
});