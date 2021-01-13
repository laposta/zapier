/*

  Main Zap

 */

const addApiKeyToHeader = require('./request_headers.js');
const responseErrorHandling = require('./response_errors.js');
const authentication = require('./authentication');

// creates
const upsertRelation = require('./creates/upsert_relation.js');

// triggers
const createdRelationHook = require('./triggers/created_relation_hook.js');
const updatedRelationHook = require('./triggers/updated_relation_hook.js');


const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,

  beforeRequest: [addApiKeyToHeader],
  afterResponse:[responseErrorHandling],

  triggers: {
    [createdRelationHook.key]: createdRelationHook,
    [updatedRelationHook.key]: updatedRelationHook,
  },

  creates: {
    [upsertRelation.key]: upsertRelation
  },

  resources: {
  }
};

module.exports = App;
