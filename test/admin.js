
const { chai, User, Doctor, Admin, server } = require('./testSetup');

describe('Admin', () => {


    it('Login/Logout admin Success 200', async () => {

        const res = await chai.request(server)
                        .post('/api/admin/login')
                        .send({
                            email: "akoivanishvili6@gmail.com",
                            name: "admin",
                            password: "12345678"
                        })

        
        res.should.have.status(200);
        res.body.should.be.an('object');

        let Cookie = res.headers['set-cookie'].pop().split(';')[0];

        const req = chai.request(server).post('/api/logout');
        // Set cookie to get saved user session
        req.cookies = Cookie;

        const logoutResp = await req;

        logoutResp.should.have.status(200);
    });

    it('Login admin  Password Fail 401', async () => {

        const res = await chai.request(server)
                        .post('/api/admin/login')
                        .send({
                            email: "akoivanishvili6@gmail.com",
                            password: "111"
                        })

        
        res.should.have.status(401);
        res.body.should.be.an('object');
    });

    it('Login admin Email Fail 401', async () => {

        const res = await chai.request(server)
                        .post('/api/admin/login')
                        .send({
                            email: "akoivashvili6@gmail.com",
                            password: "12345678"
                        })

        
        res.should.have.status(401);
        res.body.should.be.an('object');
    });

    

})


describe('Get All Users from ADMIN', () => {

    

    const admin = {
        email: process.env.ADMIN_EMAIL,
        name: "admin",
        password: process.env.ADMIN_PASSWORD
    }

    it('GET ALL USERS', async () => {

        const res = await chai.request(server)
                            .post('/api/admin/login')
                            .send(admin);

        
        let Cookie =  res.headers['set-cookie'].pop().split(';')[0];

        const req = chai.request(server).get('/api/users')
        
        req.cookies = Cookie;


        const userRes = await req

        userRes.should.have.status(200);
        userRes.body.should.be.an('array')

        
    })
})