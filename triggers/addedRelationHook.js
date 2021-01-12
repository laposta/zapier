const hook = require('./hooks_main.js');

module.exports = hook.create({
  key : 'addedRelationHook',
  label : 'Een Nieuwe Relatie Is Toegevoegd',
  description: 'Triggers when een nieuwe relatie is toegevoegd aan je lijst in je Laposta account.', // Helaas wil Zapier dat dit begint met 'Triggers when...'
  event : 'subscribed',
});
