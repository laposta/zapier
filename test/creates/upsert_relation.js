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
  lastname : 'Tester (' + new Date().toLocaleString('nl-NL','short') + ')',
  text : 'Lorem ipsum dolor sit amet.',
};

describe('UPSERT Create relation', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {
        api_key: process.env.API_KEY,
      },
      inputData: {
        'list_id': process.env.LIST_ID,
        'ip': process.env.IP,
        'email': randomData.email,
        'custom_fields[voornaam]': randomData.firstname,
        'custom_fields[opmerkingen]': randomData.text,
        'custom_fields[datum]': new Date().toISOString(),
        'custom_fields[kleur]': 'Rood',
      },
    };

    if (process.env.MOCK==true) {
      // Mock aanmaken van relatie
      nock('https://api.laposta.nl',{ allowUnmocked: true })
        .post('/v2/member')
        .reply(201, {
        });

      // Mock opvragen van velden
      nock('https://api.laposta.nl')
        .get('/v2/field')
        .query({'list_id':process.env.LIST_ID})
        .reply(200, [
          { "field": { "field_id": "0VDupMQ9ND","list_id": "kyxitprvp9","created": "2020-11-16 09:24:24","modified": null,"state": "active","name": "E-mailadres","tag": "{{email}}","custom_name": null,"defaultvalue": "","datatype": "text","datatype_display": null,"pos": "0","required": true,"in_form": true,"in_list": true,"is_email": true } },
          { "field": { "field_id": "KHPrOIZi4n", "list_id": "kyxitprvp9", "created": "2020-11-16 09:24:24", "modified": null, "state": "active", "name": "Voornaam", "tag": "{{voornaam}}", "custom_name": "voornaam", "defaultvalue": "", "datatype": "text", "datatype_display": null, "pos": "1", "required": false, "in_form": true, "in_list": true, "is_email": false } },
          { "field": { "field_id": "NbbAKAMtDD", "list_id": "kyxitprvp9", "created": "2020-11-16 09:24:24", "modified": null, "state": "active", "name": "Achternaam", "tag": "{{achternaam}}", "custom_name": "achternaam", "defaultvalue": "", "datatype": "text", "datatype_display": null, "pos": "2", "required": false, "in_form": true, "in_list": true, "is_email": false } }
        ]);
    }

    const result = await appTester(
      App.creates['upsertRelation'].operation.perform,
      bundle
    );

    // console.log('===', result);

    result.should.not.be.an.Array();
  });
});

describe('UPSERT - Update relation', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {
        api_key: process.env.API_KEY,
      },
      inputData: {
        'list_id': process.env.LIST_ID,
        'ip': process.env.IP,
        'email': randomData.email,
        // 'achternaam': randomData.lastname,
        'custom_fields[voornaam]': randomData.firstname,
        'custom_fields[opmerkingen]': 'UPDATED: '+randomData.text,
        'custom_fields[datum]': new Date().toISOString(),
        'custom_fields[kleur]': 'Rood',
      },
    };

    const result = await appTester(
      App.creates['upsertRelation'].operation.perform,
      bundle
    );

    result.should.not.be.an.Array();
  });
});
