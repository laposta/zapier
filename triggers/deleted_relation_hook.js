/*

  Handles webhook when a relation has been deleted

 */

const hook = require('./hooks_main.js');

module.exports = hook.create({
  key : 'deletedRelationHook',
  label : 'A Relation Has Been Removed',
  description: 'Triggers when a relation of your Laposta list has been removed.',
  event : 'deactivated',
});
