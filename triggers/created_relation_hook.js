/*

  Handles webhook when a relation has been created

 */

const hook = require('./hooks_main.js');

module.exports = hook.create({
  key : 'createdRelationHook',
  label : 'A New Relation Has Been Added',
  description: 'Triggers when een new relation has been added to the list in your Laposta account.',
  event : 'subscribed',
});
