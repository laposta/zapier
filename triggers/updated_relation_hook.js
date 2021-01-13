/*

  Handles webhook when a relation has been updated

 */

const hook = require('./hooks_main.js');

module.exports = hook.create({
  key : 'updatedRelationHook',
  label : 'Een Relatie Is Aangepast',
  description: 'Triggers when een relatie van je Laposta lijst is aangepast.', // Helaas wil Zapier dat dit begint met 'Triggers when...'
  event : 'modified',
});
