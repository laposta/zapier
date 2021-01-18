require('should');

const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

// Mocking library
const nock = require('nock');

// Random data
const Str = require('@supercharge/strings');
const randomData = {
  name : 'tzqjhmmmf9',//Str.random(10),
};

describe('DELETE Delete list', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {
        api_key: process.env.API_KEY,
      },
      inputData: {
        'list_id': randomData.name,
      },
    };

    if (process.env.MOCK==true) {
    }

    const result = await appTester(
      App.creates['deleteList'].operation.perform,
      bundle
    );

    // console.log('===', result);

    result.should.not.be.an.Array();
  });
});
