const { chai, User, Doctor, server } = require('./testSetup');

const user = {
    name : 'ikamean',
    email : 'ikamean@gmail.com',
}

const wrongEmail = {
    name : 'ikamean',
    email : 'wrongEmail@gmail.com'
}

let Cookie = '';

describe('Login ', () => {

   beforeEach( async () => {
       await User.deleteMany({});
       await Doctor.deleteMany({})
   })

    try {


        it('Login status must be 201 and user object should be returned, after that authorized request should return hello username', async () => {

            
            
            const res = await chai.request(server)
                        .post('/api/login')
                        .send(user);


            res.should.have.status(201)
            res.body.should.be.a('object')

            Cookie = res.headers['set-cookie'].pop().split(';')[0];

            const req = chai.request(server).get('/');
            // Set cookie to get saved user session
            req.cookies = Cookie;

            const cookieResponse = await req;

            cookieResponse.text.should.be.a.string('hello ikamean')
            cookieResponse.should.have.status(200)
     
        });



        it('Login status must be 401', async () => {

            const res = await chai.request(server)
                        .post('/api/login')
                        .send(wrongEmail)


            res.body.should.be.a('object');
            res.should.have.status(401);
        });

        it('Login With new Email Should Response status 201', async ()  => {
            await User.deleteMany({});

            const res = await chai.request(server)
            .post('/api/login')
            .send(user);


            res.should.have.status(201)
            res.body.should.be.a('object')


        });

        it('Logging in with Admin mail should return Doctor User', async () => {
            const admin = {
                name : "admin",
                email : process.env.ADMIN_EMAIL
            }

            const res = await chai.request(server)
                            .post('/api/login')
                            .send(admin)
            res.should.have.status(201);
            res.body.should.be.an('object');
            res.body.should.have.property('occupation')
                            
        })


    } catch (error) {
        console.log(error);
    }

    
});