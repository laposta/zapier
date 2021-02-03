require('should');

const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);


describe('TRIGGER - Load Lists', () => {
  zapier.tools.env.inject();

  it('should return array', done => {
    const bundle = {
      authData: {
        api_key: process.env.API_KEY,
      },
    };
    appTester(App.triggers['getLists'].operation.perform, bundle)
      .then(results => {
        results.should.be.an.Array();
        done();
      })
      .catch(done);
  });

});
