const chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    should = chai.should(),
    app = require('../../app'),
    mongoose = require('mongoose');

module.exports = {
    chai, chaiHttp, expect, should, app, mongoose,
    clearDB(done) {
        mongoose.connect(`mongodb://localhost:27017/trash_test`, { useNewUrlParser: true }, function () {
            mongoose.connection.db.dropDatabase();
            done();
        })
    }
}