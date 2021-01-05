const authentication = require('./authentication');
const addListMemberCreate = require('./creates/add_list_member.js');

const addApiKeyToHeader = (request, z, bundle) => {
  // request.headers['X-Subdomain'] = bundle.authData.subdomain;
  const basicHash = Buffer.from(`${bundle.authData.api_key}:x`).toString(
    'base64'
  );
  request.headers.Authorization = `Basic ${basicHash}`;
  return request;
};

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
