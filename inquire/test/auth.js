var request = require('supertest');
var agent = request.agent;

exports.login = function(done) {
    var loggedInAgent = agent(sails.hooks.http.app);
    loggedInAgent
        .post('/login')
        .send({ email: 'admin@test.com', password: '1234' })
        .end(function (err, res) {
            loggedInAgent.saveCookies(res);
            done(loggedInAgent);
        });
};
