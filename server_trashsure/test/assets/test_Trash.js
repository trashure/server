const { chai, chaiHttp, expect, should, app } = require('./config');
const { commonUser, commonTrash } = require('./common_data_input');
const { registerValidation, loginValidation, authValidation, trashValidation } = require('./common_validation');
let currentUser = { ...commonUser };
let currentTrash = {};
//
//     S U C C E S S 
//
describe('BEFORE - LogIn First as User', function () {
    it.only('Login As User', function (done) {
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
// CRUD
describe('SUCCESS', function () {
    describe('C R E A T E - POST  /', function () {
        it.only('should return an Object & Status_Code: 201', function (done) {
            this.timeout(10000)
            chai
                .request(app)
                .post('/')
                .set('token', currentUser.token)
                .send(commonTrash)
                .end(function (err, res) {
                    // console.log(res.body);
                    currentTrash = res.body;
                    expect(err).to.be.null
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('path').to.be.a('string');
                    expect(res.body).to.have.property('location').eql(commonTrash.location).to.be.a('string');
                    expect(res.body).to.have.property('description').eql(commonTrash.description).to.be.a('string');
                    expect(res.body).to.have.property('type').to.be.a('string');
                    expect(res.body).to.have.property('userID').to.be.an('object');
                    expect(res.body.userID).to.have.property('name').eql(currentUser.name).to.be.an('string');
                    expect(res.body.userID).to.have.property('email').eql(currentUser.email).to.be.an('string');
                    expect(res.body.userID).to.have.property('password').to.be.an('string');
                    done();
                })
        })
    })
    describe('R E A D - GET  /', function () {
        it.only('should return an Array of Objects & Status_Code: 200', function (done) {
            chai.request(app)
                .get('/')
                .set('token', currentUser.token)
                .end(function (err, res) {
                    // console.log(res.body);
                    expect(err).to.be.null
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.have.property('_id');
                    expect(res.body[0]).to.have.property('path');
                    expect(res.body[0]).to.have.property('location');
                    expect(res.body[0]).to.have.property('description');
                    expect(res.body[0]).to.have.property('type');
                    expect(res.body[0]).to.have.property('userID').to.be.an('object');
                    done();
                })
        })
    })

    describe('D E L E T E   Failed - DELETE  /:id\n\n', function () {
        it.only('should return Object & Status_Code: 200', function (done) {
            chai.request(app)
                .delete(`/lalala`)
                .set('token', currentUser.token)
                .end(function (err, res) {
                    // console.log(res.body);
                    expect(err).to.be.null
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message').eql(trashValidation.notFound)
                    done();
                })
        })
    })

    describe('D E L E T E - DELETE  /:id\n\n', function () {
        it.only('should return Object & Status_Code: 200', function (done) {
            chai.request(app)
                .delete(`/${currentTrash._id}`)
                .set('token', currentUser.token)
                .end(function (err, res) {
                    // console.log(res.body);
                    expect(err).to.be.null
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('deletedCount').eql(1).to.be.a('number');
                    done();
                })
        })
    })
})

//
//     F A I L E D
//
describe('FAILED', function () {
    describe('Authtneticate', function () {
        describe('login First', function () {
            it.only('should return an Object & Status_Code: 400', function (done) {
                this.timeout(10000)
                chai
                    .request(app)
                    .post('/')
                    .send(commonTrash)
                    .end(function (err, res) {
                        // console.log(res.body);
                        currentTrash = res.body;
                        expect(err).to.be.null
                        expect(res).to.have.status(401);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message').eql(authValidation.loginFirst);
                        done();
                    })
            })
        })
        describe('Not Authenticate', function () {
            it.only('should return an Object & Status_Code: 400', function (done) {
                this.timeout(10000)
                chai
                    .request(app)
                    .post('/')
                    .set('token', 'lalala')
                    .send(commonTrash)
                    .end(function (err, res) {
                        // console.log(res.body);
                        currentTrash = res.body;
                        expect(err).to.be.null
                        expect(res).to.have.status(401);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message').eql(authValidation.auth);
                        done();
                    })
            })
        })
    })
    describe('C R E A T E - POST  /', function () {
        describe('Path is nothing', function () {
            it.only('should return an Object & Status_Code: 400', function (done) {
                let data = { ...commonTrash };
                delete data.path;
                this.timeout(10000)
                chai
                    .request(app)
                    .post('/')
                    .set('token', currentUser.token)
                    .send(data)
                    .end(function (err, res) {
                        // console.log(res.body);
                        currentTrash = res.body;
                        expect(err).to.be.null
                        expect(res).to.have.status(400);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message').eql(trashValidation.path);
                        done();
                    })
            })
        })
    })


})