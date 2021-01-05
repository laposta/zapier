const authentication = require('./authentication');
const addListMemberCreate = require('./creates/add_list_member.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  creates: {
    [addListMemberCreate.key]: addListMemberCreate
  },
  triggers: {

  },
  // beforeRequest:[],
  // afterResponse:[],
};
