/*

  Handles webhook when a relation has been updated

 */

const hook = require('./hooks_main.js');

module.exports = hook.create({
  key : 'updatedRelationHook',
  label : 'A Relation Has Been Edited',
  description: 'Triggers when a relation of your Laposta list has been edited.',
  event : 'modified',
});
