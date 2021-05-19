const { chai, User, Doctor, server } = require('./testSetup');


describe.skip('Logout Route', () => {

    beforeEach( async () => {
        await User.deleteMany({});
        await Doctor.deleteMany({})
    })
       

    it('Unauthorized Logout request should response with 401', async () => {

        

        const res = await chai.request(server).post('/api/logout');

        res.should.have.status(401);
        res.body.should.be.a('object');
      
    });

    it(' Authorized Logout request returns 200 status', async () => {
        const user = {
            name : 'ikamean',
            email : 'ikamean@gmail.com',
        }

           const res = await chai.request(server)
                        .post('/api/login')
                        .send(user);


            res.should.have.status(201)
            res.body.should.be.a('object')
            let Cookie = res.headers['set-cookie'].pop().split(';')[0];

            const req = chai.request(server).post('/api/logout');
            // Set cookie to get saved user session
            req.cookies = Cookie;

            const logoutResp = await req;

            logoutResp.should.have.status(200);
           
    })

    
  
})