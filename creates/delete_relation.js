/*

  Handles deleting relations on a Laposta list

 */

/*
  Main module
 */
module.exports = {

  key: 'deleteRelation',
  noun: 'Relatie',
  display: {
    label: 'Verwijderen Relatie',
    description: 'Verwijderd een bestaande relatie.',
    hidden: false,
    important: true,
  },

  operation: {

    perform: async(z, bundle) => {
      const response = await z.request({
        url: 'https://api.laposta.nl/v2/member/'+bundle.inputData.email+'?list_id='+bundle.inputData.list_id,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        removeMissingValuesFrom: {},
      });
      return response.data;
    },

    inputFields: [
      {
        key: 'list_id',
        label: 'List',
        type: 'string',
        helpText: "De List ID kun je vinden bij de kenmerken van je Laposta lijst.",
        placeholder: 'List ID van jouw lijst',
        required: true,
        list: false,
        altersDynamicFields: true,
        dynamic:'getLists.list_id.name',
      },
      {
        key: 'email',
        label: 'Email',
        type: 'string',
        helpText: 'Een geldig e-mail adres van de te verwijderen relatie',
        placeholder: 'E-mail adres',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],

    outputFields: [
      {
        key: 'email',
        label: 'Email',
        type: 'string',
        helpText: 'Een geldig e-mail adres van de nieuwe relatie',
        required: true,
      },
    ],

    sample: {
      list_id: '%list_id%',
      email: 'test@example.net',
    },
  },
};
