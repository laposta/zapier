const authentication = require('./authentication');
const addListMemberCreate = require('./creates/add_list_member.js');

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,

  creates: {
    [addListMemberCreate.key]: addListMemberCreate
  },

  // beforeRequest:[],
  // afterResponse:[],
  triggers: {

  },

  resources: {
  }
};


module.exports = App;
