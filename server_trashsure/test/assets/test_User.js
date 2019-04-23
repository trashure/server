const { chai, chaiHttp, expect, should, app } = require('./config');
const { commonUser } = require('./common_data_input');
const { registerValidation, loginValidation } = require('./common_validation');
let currentUser = {}


//
//      S U C C E S S
//
describe('SUCCESS', function () {
    describe('R E G I S T E R - POST  /register', function () {
        it.only('should return an Object & Status_Code: 201', function (done) {
            chai
                .request(app)
                .post('/user/register')
                .send(commonUser)
                .end(function (err, res) {
                    // console.log(res.body);
                    currentUser = res.body;
                    expect(err).to.be.null
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name').eql(commonUser.name).to.be.a('string');
                    expect(res.body).to.have.property('email').eql(commonUser.email).to.be.a('string');
                    done();
                })
        })
    })
    describe('L O G I N - POST  /login', function () {
        it.only('should return an Object & Status_Code: 200', function (done) {
            chai
                .request(app)
                .post('/user/login')
                .send(commonUser)
                .end(function (err, res) {
                    // console.log(res.body);
                    currentUser.token = res.body.token;
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('token').to.be.a('string');
                    done();
                })
        })
    })
})


//
//      F A I L E D
//
describe('FAILED', function () {
    describe('R E G I S T E R - POST  /register', function () {
        describe('Validation name', function () {
            it.only('should return an Object & Status_Code: 400', function (done) {
                let data = { ...commonUser };
                delete data.name;
                chai
                    .request(app)
                    .post('/user/register')
                    .send(data)
                    .end(function (err, res) {
                        // console.log(res.body);
                        currentUser = res.body;
                        expect(err).to.be.null
                        expect(res).to.have.status(400);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message').eql(registerValidation.name)
                        done();
                    })
            })
        })

        describe('Validation email required', function () {
            it.only('should return an Object & Status_Code: 400', function (done) {
                let data = { ...commonUser };
                delete data.email;
                chai
                    .request(app)
                    .post('/user/register')
                    .send(data)
                    .end(function (err, res) {
                        // console.log(res.body);
                        currentUser = res.body;
                        expect(err).to.be.null
                        expect(res).to.have.status(400);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message').eql(registerValidation.email_Required)
                        done();
                    })
            })
        })

        describe('Validation email invalid format', function () {
            it.only('should return an Object & Status_Code: 400', function (done) {
                let data = { ...commonUser };
                data.email = 'lalalala';
                chai
                    .request(app)
                    .post('/user/register')
                    .send(data)
                    .end(function (err, res) {
                        // console.log(res.body);
                        currentUser = res.body;
                        expect(err).to.be.null
                        expect(res).to.have.status(400);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message').eql(registerValidation.email_Format)
                        done();
                    })
            })
        })

        describe('Validation email unique', function () {
            it.only('should return an Object & Status_Code: 400', function (done) {
                chai
                    .request(app)
                    .post('/user/register')
                    .send(commonUser)
                    .end(function (err, res) {
                        // console.log(res.body);
                        currentUser = res.body;
                        expect(err).to.be.null
                        expect(res).to.have.status(400);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message').eql(registerValidation.email_Unique)
                        done();
                    })
            })
        })

        describe('Validation password required', function () {
            it.only('should return an Object & Status_Code: 400', function (done) {
                let data = { ...commonUser };
                delete data.password;
                chai
                    .request(app)
                    .post('/user/register')
                    .send(data)
                    .end(function (err, res) {
                        // console.log(res.body);
                        currentUser = res.body;
                        expect(err).to.be.null
                        expect(res).to.have.status(400);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message').eql(registerValidation.password)
                        done();
                    })
            })
        })

    })
    describe('L O G I N - POST  /login', function () {
        describe('Email is nothing', function () {
            it.only('should return an Object & Status_Code: 400', function (done) {
                let data = { ...commonUser };
                delete data.email;
                chai
                    .request(app)
                    .post('/user/login')
                    .send(data)
                    .end(function (err, res) {
                        // console.log(res.body);
                        expect(err).to.be.null;
                        expect(res).to.have.status(400);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message').eql(loginValidation.email)
                        done();
                    })
            })
        })

        describe('Email is wrong', function () {
            it.only('should return an Object & Status_Code: 400', function (done) {
                let data = { ...commonUser };
                data.email = 'lalala';
                chai
                    .request(app)
                    .post('/user/login')
                    .send(data)
                    .end(function (err, res) {
                        // console.log(res.body);
                        expect(err).to.be.null;
                        expect(res).to.have.status(400);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message').eql(loginValidation.email)
                        done();
                    })
            })
        })

        describe('Password is nothing', function () {
            it.only('should return an Object & Status_Code: 400', function (done) {
                let data = { ...commonUser };
                delete data.password;
                chai
                    .request(app)
                    .post('/user/login')
                    .send(data)
                    .end(function (err, res) {
                        // console.log(res.body);
                        expect(err).to.be.null;
                        expect(res).to.have.status(400);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message').eql(loginValidation.email);
                        done();
                    })
            })
        })

        describe('Password is wrong', function () {
            it.only('should return an Object & Status_Code: 400', function (done) {
                let data = { ...commonUser };
                data.password = 'lalala'
                chai
                    .request(app)
                    .post('/user/login')
                    .send(data)
                    .end(function (err, res) {
                        // console.log(res.body);
                        expect(err).to.be.null;
                        expect(res).to.have.status(400);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message').eql(loginValidation.password);
                        done();
                    })
            })
        })
    })
})