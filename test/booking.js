const { chai, User, Doctor, server } = require('./testSetup');


const user = {
    name : 'ikamean',
    email : 'ikamean@gmail.com',
}

const admin = {
    name : "admin",
    email : process.env.ADMIN_EMAIL
}

const wrongEmail = {
    name : 'ikamean',
    email : 'wrongEmail@gmail.com'
}




describe('Booking Flow for Admin', () => {

    before( async () => {
        await chai.request(server)
        .post('/api/login')
        .send(user)
    })
    
    let Cookie = ''
    

    beforeEach( async () => {
       

        const res = await chai.request(server)
                        .post('/api/login')
                        .send(admin);

            Cookie = res.headers['set-cookie'].pop().split(';')[0];
    })

    afterEach( async () => {
        await User.deleteMany({});
        await Doctor.deleteMany({});
    })

    it('Admin can get all user Objects if he is authorized /api/users', async () => {

        const req = chai.request(server)
                    .get('/api/users')
        req.cookies = Cookie;

        const res = await req;

        console.log(res.body);
    });

    it('Unauthorized /api/users request should return 403', async () => {
        const res = await chai.request(server)
                            .get('/api/users')
        console.log(res.status);
        console.log(res.body);
    })
})