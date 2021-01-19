/*

  Handles webhook when a relation has been deleted

 */

const hook = require('./hooks_main.js');

module.exports = hook.create({
  key : 'deletedRelationHook',
  label : 'Een Relatie Is Verwijderd',
  description: 'Triggers when een relatie van je Laposta lijst is verwijderd.', // Helaas wil Zapier dat dit begint met 'Triggers when...'
  event : 'deactivated',
});
