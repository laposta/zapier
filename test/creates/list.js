require('should');

const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

// Random data
const Str = require('@supercharge/strings');
const randomData = {
  name : Str.random(1).toUpperCase() + Str.random(10),
  text : 'Lorem ipsum dolor sit amet.',
};

// Generated list_id
let created_list_id = false;

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

    const result = await appTester(
      App.creates['createList'].operation.perform,
      bundle
    );

    created_list_id = result.list.list_id;

    result.should.not.be.an.Array();
  });
});



describe('DELETE Delete list', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {
        api_key: process.env.API_KEY,
      },
      inputData: {
        'list_id': created_list_id,
      },
    };

    const result = await appTester(
      App.creates['deleteList'].operation.perform,
      bundle
    );

    result.should.not.be.an.Array();
  });
});
