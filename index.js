/*

  Main Zap

 */

const addApiKeyToHeader = require('./request_headers.js');
const responseErrorHandling = require('./response_errors.js');
const authentication = require('./authentication');

// creates
const upsertRelation = require('./creates/upsert_relation.js');
const deleteRelation = require('./creates/delete_relation.js');
// const createList = require('./creates/create_list.js');
// const deleteList = require('./creates/delete_list.js');
// const updateList = require('./creates/update_list.js');
// const createListFields = require('./creates/create_list_fields.js');

// triggers
const createdRelationHook = require('./triggers/created_relation_hook.js');
const updatedRelationHook = require('./triggers/updated_relation_hook.js');
const deletedRelationHook = require('./triggers/deleted_relation_hook.js');
const getLists = require('./triggers/get_lists.js');


const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,

  beforeRequest: [addApiKeyToHeader],
  afterResponse:[responseErrorHandling],

  triggers: {
    [createdRelationHook.key]: createdRelationHook,
    [updatedRelationHook.key]: updatedRelationHook,
    [deletedRelationHook.key]: deletedRelationHook,
    [getLists.key]: getLists,
  },

  creates: {
    [upsertRelation.key]: upsertRelation,
    [deleteRelation.key]: deleteRelation,
    // [createList.key]: createList,
    // [deleteList.key]: deleteList,
    // [updateList.key]: updateList,
    // [createListFields.key]: createListFields,
  },

  resources: {
  }
};

module.exports = App;
