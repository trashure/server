/**
 * TDD - Mocha Chai
 * - Test User: registrasi & login Manual, update user profil
 * - Test Trash: CRD trash
 */


const { chai, chaiHttp, clearDB, mongoose } = require('./assets/config');
mongoose.set('useFindAndModify', false);

chai.use(chaiHttp);

function importTest(name, path) {
    describe(name, function () {
        require(path);
    })
}

describe('\nRun All Test by mochaChai', function () {
    before(function (done) { clearDB(done) });
    after(function (done) { clearDB(done) });

    importTest("\nUser Test", './assets/test_User');
    importTest("\n\nTrash Test", './assets/test_Trash');
});
