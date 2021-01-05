require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

const Str = require('@supercharge/strings');
const randomData = {
  email : Str.random(10) + '@laposta.tester.nl',
  firstname : Str.random(1).toUpperCase() + Str.random(10),
  lastname : 'Tester (' + new Date().toLocaleString('nl-NL','short') + ')',
};

describe('Create - add_list_member', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {
        api_key: process.env.API_KEY,
      },
      inputData: {
        list_id: process.env.LIST_ID,
        ip: process.env.IP,
        email: randomData.email,
        voornaam: randomData.firstname,
        achternaam: randomData.lastname,
      },
    };

    const result = await appTester(
      App.creates['add_list_member'].operation.perform,
      bundle
    );
    result.should.not.be.an.Array();
  });
});
