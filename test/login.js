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

    try {


        it('Login status must be 200 and user object must be returned from server', async () => {

            
            
            const res = await chai.request(server)
                        .post('/api/login')
                        .send(user);


            res.should.have.status(200)
            res.body.should.be.a('object')

            Cookie = res.headers['set-cookie'].pop().split(';')[0];
     
        });

        it('Respones text should be Hello', async () => {

            const req = chai.request(server).get('/');
            // Set cookie to get saved user session
            req.cookies = Cookie;

            const res = await req;

            res.text.should.be.a.string('hello ikamean')
            res.should.have.status(200)

        })


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


        })


    } catch (error) {
        console.log(error);
    }

    
});