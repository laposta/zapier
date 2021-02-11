/*

  Handles deleting relations on a Laposta list

 */

/*
  Main module
 */
module.exports = {

  key: 'deleteRelation',
  noun: 'Relation',
  display: {
    label: 'Delete Relation',
    description: 'Delete an existing relation.',
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
        helpText: "You can find the List ID in the properties of your Laposta list.",
        placeholder: 'List ID of your list',
        required: true,
        list: false,
        altersDynamicFields: true,
        dynamic:'getLists.list_id.name',
      },
      {
        key: 'email',
        label: 'Email',
        type: 'string',
        helpText: 'E-mail adress if the relation to be deleted.',
        placeholder: 'E-mail adress',
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
        helpText: 'E-mail adress if the relation to be deleted.',
        required: true,
      },
    ],

    sample: {
      list_id: '%list_id%',
      email: 'test@example.net',
    },
  },
};
