/*

  Main Zap

 */


const addApiKeyToHeader = require('./request_headers.js');
const responseErrorHandling = require('./response_errors.js');
const authentication = require('./authentication');
const upsertRelation = require('./creates/upsert_relation.js');


const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,

  beforeRequest: [addApiKeyToHeader],
  afterResponse:[responseErrorHandling],

  triggers: {
  },

  creates: {
    [upsertRelation.key]: upsertRelation
  },

  resources: {
  }
};

module.exports = App;
