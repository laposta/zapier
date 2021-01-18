require('should');

const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

// Mocking library
const nock = require('nock');

// Random data
const Str = require('@supercharge/strings');
const randomData = {
  name : Str.random(1).toUpperCase() + Str.random(10),
  text : 'Lorem ipsum dolor sit amet.',
};

describe('POST Create list', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {
        api_key: process.env.API_KEY,
      },
      inputData: {
        'name': randomData.name,
        'remarks': randomData.text,
        'ip': process.env.IP,
      },
    };

    if (process.env.MOCK==true) {
    }

    const result = await appTester(
      App.creates['createList'].operation.perform,
      bundle
    );

    // console.log('===', result);

    result.should.not.be.an.Array();
  });
});
