/*

  Handles deleting lists on a Laposta account

 */


/*
  Main module
 */
module.exports = {

  key: 'deleteList',
  noun: 'List',
  display: {
    label: 'Delete list',
    description: 'Delete a list from your Laposta account.',
    hidden: false,
    important: true,
  },

  operation: {

    perform: async(z, bundle) => {
      let body     = bundle.inputData;
      body.ip      = '0.0.0.0';

      const response = await z.request({
        url: 'https://api.laposta.nl/v2/list/'+bundle.inputData.list_id,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        // body: body,
        removeMissingValuesFrom: {},
      });
      return response.data;
    },

    inputFields: [
      {
        key: 'list_id',
        label: 'List',
        type: 'string',
        helpText: "You can find the List ID in the properties of your Laposta list.",
        placeholder: 'List ID of your list',
        required: true,
        list: false,
        altersDynamicFields: true,
      },
    ],

    sample: {
      list_id: '%list_id%',
    },
  },
};
