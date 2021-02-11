/*

  Handles updating an existing lists on a Laposta account

 */


/*
  Main module
 */
module.exports = {

  key: 'updateList',
  noun: 'List',
  display: {
    label: 'Edit list',
    description: 'Edit an existing list of your Laposta account.',
    hidden: false,
    important: true,
  },

  operation: {

    perform: async(z, bundle) => {
      let body     = bundle.inputData;
      body.ip      = '0.0.0.0';

      const response = await z.request({
        url: 'https://api.laposta.nl/v2/list/'+bundle.inputData.list_id,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: body,
        removeMissingValuesFrom: {},
      });
      return response.data;
    },

    inputFields: [
      {
        key: 'name',
        label: 'Name',
        type: 'string',
        helpText: "Naam of the new list.",
        placeholder: 'Name of the list',
        required: true,
        list: false,
        altersDynamicFields: true,
      },
      {
        key: 'remarks',
        label: 'Description',
        type: 'string',
        helpText: 'A description of this list.',
        placeholder: 'Description',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'subscribe_notification_email',
        label: 'Subscribe notification Email',
        type: 'string',
        helpText: 'Email address to send a notification when a new relation is added.',
        placeholder: 'Subscribe notification e-mail',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'unsubscribe_notification_email',
        label: 'Unsubscribe notification Email',
        type: 'string',
        helpText: 'Email address to send a notification when a new relation is removed.',
        placeholder: 'Unsubscribe notification e-mail',
        required: false,
        list: false,
        altersDynamicFields: false,
      },

    ],

    sample: {
      naam: 'Updated list',
    },
  },
};
