const addApiKeyToHeader = require('./request_headers.js');
const responseErrorHandling = require('./response_errors.js');

const authentication = require('./authentication');
const addedRelationHook = require('./triggers/addedRelationHook.js');
const addListMemberCreate = require('./creates/add_list_member.js');

// Main Zapier App
const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,

  beforeRequest: [addApiKeyToHeader],
  afterResponse:[responseErrorHandling],

  triggers: {
    [addedRelationHook.key]: addedRelationHook
  },

  creates: {
    [addListMemberCreate.key]: addListMemberCreate
  },

  resources: {
  }
};

module.exports = App;
