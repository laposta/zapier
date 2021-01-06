const authentication = require('./authentication');
const addListMemberCreate = require('./creates/add_list_member.js');

// Add auth header to API calls
const addApiKeyToHeader = (request, z, bundle) => {
  const basicHash = Buffer.from(`${bundle.authData.api_key}:x`).toString(
    'base64'
  );
  request.headers.Authorization = `Basic ${basicHash}`;
  return request;
};


// Main Zapier App
const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,

  beforeRequest: [addApiKeyToHeader],
  // afterResponse:[],

  triggers: {
  },

  creates: {
    [addListMemberCreate.key]: addListMemberCreate
  },

  resources: {
  }
};

module.exports = App;
