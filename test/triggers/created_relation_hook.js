require('should');

const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

let subscribeData = {};
let cleanedRequest = {};

describe('Subscribe Create Hook', () => {
  zapier.tools.env.inject();

  it('should return webhook object', done => {
    const bundle = {
      authData: {
        api_key: process.env.API_KEY,
      },
      inputData: {
        list_id: process.env.LIST_ID,
      },
      targetUrl : process.env.MOCKAPIHOOK,
    };

    appTester(App.triggers['createdRelationHook'].operation.performSubscribe, bundle)
      .then(results => {
        results.webhook.should.be.an.Object();
        subscribeData = results;
        done();
      })
      .catch(done);
  });

});

describe('Unsubscribe Create Hook', () => {
  zapier.tools.env.inject();

  it('should return webhook object', done => {
    const bundle = {
      authData: {
        api_key: process.env.API_KEY,
      },
      subscribeData : subscribeData,
    };
    appTester(App.triggers['createdRelationHook'].operation.performUnsubscribe, bundle)
      .then(results => {
        results.webhook.should.be.an.Object();
        results.webhook.webhook_id.should.equal(subscribeData.webhook.webhook_id);
        results.webhook.list_id.should.equal(subscribeData.webhook.list_id);
        done();
      })
      .catch(done);
  });

});


describe('New relatie create trigger (hook)', () => {
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

    appTester(App.triggers['createdRelationHook'].operation.perform, bundle)
      .then(results => {
        results.length.should.eql(1);
        results.should.be.an.Array();
        cleanedRequest = results[0];
        done();
      })
      .catch(done);
  });

});

describe('Load relaties after create hook', () => {
  zapier.tools.env.inject();

  it('should load relatie', done => {
    const bundle = {
      authData: {
        api_key: process.env.API_KEY,
      },
      inputData: {
        list_id : process.env.LIST_ID,
      },
    };

    appTester(App.triggers['createdRelationHook'].operation.performList, bundle)
      .then(result => {
        result.should.be.an.Array();
        done();
      })
      .catch(done);
  });

});
