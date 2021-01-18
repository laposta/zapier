require('should');

const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

// Mocking library
const nock = require('nock');

// Random data
const Str = require('@supercharge/strings');
const randomData = {
  email : Str.random(10) + '@laposta.tester.nl',
  firstname : Str.random(1).toUpperCase() + Str.random(10),
};

describe('DELETE - Create new relation for deletion', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {
        api_key: process.env.API_KEY,
      },
      inputData: {
        'list_id': process.env.LIST_ID,
        'email': randomData.email,
        'custom_fields[voornaam]': randomData.firstname,
      },
    };

    if (process.env.MOCK==true) {
      // Weinig zinvol
    }

    const result = await appTester(
      App.creates['upsertRelation'].operation.perform,
      bundle
    );

    result.should.not.be.an.Array();
  });
});

describe('DELETE - Delete created relation', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {
        api_key: process.env.API_KEY,
      },
      inputData: {
        'list_id': process.env.LIST_ID,
        'email': randomData.email,
      },
    };

    const result = await appTester(
      App.creates['deleteRelation'].operation.perform,
      bundle
    );

    result.should.not.be.an.Array();
  });
});
