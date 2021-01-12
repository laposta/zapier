require('should');

const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

let subscribeData = {};
let cleanedRequest = {};

describe('Subscribe Hook', () => {
  zapier.tools.env.inject();

  it('should return webhook object', done => {
    const bundle = {
      authData: {
        api_key: process.env.API_KEY,
      },
      inputData: {
        list_id: process.env.LIST_ID,
        event : 'subscribed',
        url : process.env.MOCKAPIHOOK,
        blocked: false,
      },
    };

    appTester(App.triggers['webhooks'].operation.performSubscribe, bundle)
      .then(results => {
        results.webhook.should.be.an.Object();
        subscribeData = results;
        done();
      })
      .catch(done);
  });

});

describe('Unsubscribe Hook', () => {
  zapier.tools.env.inject();

  it('should return webhook object', done => {
    const bundle = {
      authData: {
        api_key: process.env.API_KEY,
      },
      subscribeData : subscribeData,
    };
    appTester(App.triggers['webhooks'].operation.performUnsubscribe, bundle)
      .then(results => {
        results.webhook.should.be.an.Object();
        results.webhook.webhook_id.should.equal(subscribeData.webhook.webhook_id);
        results.webhook.list_id.should.equal(subscribeData.webhook.list_id);
        done();
      })
      .catch(done);
  });

});


describe('New relatie trigger (hook)', () => {
  zapier.tools.env.inject();

  it('should load relatie from hook', done => {
    const bundle = {
      cleanedRequest: {
        "data": [
            {
                "type": "member",
                "event": "subscribed",
                "data": {
                    "member_id": "9978ydioiZ",
                    "list_id": process.env.LIST_ID,
                    "email": "test@example.net",
                    "state": "deleted",
                    "signup_date": "2012-08-13 16:13:07",
                    "ip": process.env.IP,
                    "source_url": "http://example.com",
                    "custom_fields": {
                        "name": "Voornaam",
                    }
                },
                "info": {
                    "source": "app",
                    "action": "subscribed",
                    "date_event": "2012-08-17 20:56:31",
                }
            }
        ],
      "date_requested": "2012-08-17 20:56:34",
      },
    };

    appTester(App.triggers['webhooks'].operation.perform, bundle)
      .then(results => {
        results.length.should.eql(1);
        const firstRecipe = results[0];
        firstRecipe.data.should.be.an.Array();
        cleanedRequest = firstRecipe.data;
        done();
      })
      .catch(done);
  });

});

// describe('Load relatie after hook', () => {
//   zapier.tools.env.inject();

//   it('should load relatie', done => {
//     const bundle = {
//       authData: {
//         api_key: process.env.API_KEY,
//       },
//       inputData: cleanedRequest,
//     };

//     console.log(bundle.inputData);

//     appTester(App.triggers['webhooks'].operation.performSubscribe, bundle)
//       .then(results => {
//         console.log(results);
//         // results.webhook.should.be.an.Object();
//         // subscribeData = results;
//         done();
//       })
//       .catch(done);
//   });

// });
