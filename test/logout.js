const { chai, User, Doctor, server } = require('./testSetup');


describe('Logout Route', () => {
       

    it('Unauthorized Logout request should response with 401', async () => {

        const res = await chai.request(server).post('/api/logout');

        res.should.have.status(401);
        res.body.should.be.a('object');
      
    });

    
  
})