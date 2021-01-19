require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('AUTHENTICATION - Test', () => {
  zapier.tools.env.inject();

  it('should return no 401', async () => {
    const bundle = {
      authData: {
        // username: process.env.API_KEY,
        api_key: process.env.API_KEY,
      },
      inputData: {
      },
    };
    const result = await appTester(
      App.authentication.test,
      bundle
    );
    result.should.not.be.an.Array();
  });
});
