/*

  Handles creating and updating (upserting) relations on a Laposta list

 */



/*
  Converts Laposta fields to Zap fields
 */
const convertFields = function(lapostaFields) {
  let zapierFields = lapostaFields.map( e => {
    let field = e.field;
    let custom = (field.custom_name !== null);
    let key = field.tag.replace(/{{/g, "").replace(/}}/g, "");
    if (custom) {
      key = 'custom_fields['+field.custom_name+']';
    }
    let type = 'string'; // Laposta (text, numeric, date, select_single, select_multiple) Zapier: 'string', 'text', 'integer', 'number', 'boolean', 'datetime', 'file', 'password', 'copy'
    let choices = false;
    switch (field.type) {
      case 'numeric':
        type = 'number';
        break;
      case 'date':
        type = 'datetime';
        break;
      case 'select_single' :
      case 'select_multiple' :
        choices = field.options_full;
        break;
    }
    let zapField = {
      key: key,
      label: field.name,
      type: type,
      helpText: field.name+' of the new relation',
      placeholder: field.name+' of the new relation',
      required: field.required,
      list: false,
      altersDynamicFields: false,
    };
    if ( choices!==false ) {
      zapField.choices = choices;
    }
    return zapField;
  });
  return zapierFields;
}

/*
  Fetch input fields
 */
const dynamicInputFields = async (z, bundle) => {
  const response = await z.request('https://api.laposta.nl/v2/field?list_id='+bundle.inputData.list_id);
  if (response.data.data) {
    let customFields = convertFields(response.data.data);
    return customFields;
  }
  return [];
}

/*
  Fetch output fields
 */
const dynamicOutputFields = async (z, bundle) => {
  const response = await z.request('https://api.laposta.nl/v2/field?list_id='+bundle.inputData.list_id);
  if (response.data.data) {
    let customFields = convertFields(response.data.data);
    return customFields;
  }
  return [];
}


/*
  Main module
 */
module.exports = {

  key: 'upsertRelation',
  noun: 'Relation',
  display: {
    label: 'Add or Edit a Relation',
    description: 'Edit an existing relation, or add a new relation, in your Laposta list.',
    hidden: false,
    important: true,
  },

  operation: {

    perform: async(z, bundle) => {
      let body     = bundle.inputData;
      body['options[upsert]'] = true;
      if ( !body.ip ) body.ip = '0.0.0.0'; // required field

      const response = await z.request({
        url: 'https://api.laposta.nl/v2/member',
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
        helpText: 'An existing e-mail adress if the new relation',
        placeholder: 'E-mail adress',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      dynamicInputFields,
    ],

    outputFields: [
      {
        key: 'email',
        label: 'Email',
        type: 'string',
        helpText: 'An existing e-mail adress if the new relation',
        required: true,
      },
      dynamicOutputFields,
    ],

    sample: {
      list_id: '%list_id%',
      email: 'test@example.net',
      // ip: '0.0.0.0',
    },
  },
};
