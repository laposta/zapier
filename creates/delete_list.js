/*

  Handles deleting lists on a Laposta account

 */


/*
  Main module
 */
module.exports = {

  key: 'deleteList',
  noun: 'Lijst',
  display: {
    label: 'Verwijder lijst',
    description: 'Verwijder een lijst van je Laposta account.',
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
        label: 'List ID',
        type: 'string',
        helpText: "De List ID kun je vinden bij de kenmerken van je Laposta lijst.",
        placeholder: 'List ID van te verwijderen lijst',
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
