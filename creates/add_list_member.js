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
      helpText: field.name+' van de nieuwe relatie',
      placeholder: field.name+' van de nieuwe relatie',
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

const dynamicInputFields = async (z, bundle) => {
  z.console.log('Starting dynamicInputFields', bundle.inputData.list_id);
  const response = await z.request('https://api.laposta.nl/v2/field?list_id='+bundle.inputData.list_id);
  // z.console.log('Response from dynamicInputFields', response);
  if (response.data.data) {
    let customFields = convertFields(response.data.data);
    z.console.log('Converted fields', response);
    return customFields;
  }
  return [];
}

const dynamicOutputFields = async (z, bundle) => {
  // z.console.log('Starting dynamicOutputFields', bundle.inputData.list_id);
  const response = await z.request('https://api.laposta.nl/v2/field?list_id='+bundle.inputData.list_id);
  // z.console.log('Response from dynamicOutputFields', response);
  if (response.data.data) {
    let customFields = convertFields(response.data.data);
    // z.console.log('Converted fields', response);
    return customFields;
  }
  return [];
}


// Main
const AddListMember = {
  key: 'add_list_member',
  noun: 'Relatie',
  display: {
    label: 'Voeg Relatie Toe',
    description: 'Voegt een nieuwe relatie aan een bestaande lijst in je Laposta account.',
    hidden: false,
    important: true,
  },
  operation: {
    perform: (z, bundle) => {
      let body     = bundle.inputData;
      body.list_id = bundle.inputData.list_id;
      body.ip      = '0.0.0.0';
      const promise = z.request({
        url: 'https://api.laposta.nl/v2/member',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: body,
        removeMissingValuesFrom: {},
      });
      return promise.then((response) => response.data);
    },
    inputFields: [
      {
        key: 'list_id',
        label: 'List ID',
        type: 'string',
        helpText: "De List ID kun je vinden bij de kenmerken van je Laposta lijst.",
        placeholder: 'List ID van jouw lijst',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'email',
        label: 'Email',
        type: 'string',
        helpText: 'Een geldig e-mail adres van de nieuwe relatie',
        placeholder: 'E-mail adres',
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
        helpText: 'Een geldig e-mail adres van de nieuwe relatie',
        required: true,
      },
      dynamicOutputFields,
    ],
    sample: {
      member: {
        list_id: '%list_id%',
        email: 'test@example.net',
        signup_date: new Date(),
        ip: '0.0.0.0',
        // custom_fields: { voornaam: 'Voornaam (voorbeeld)', achternaam: 'Achternaam (voorbeeld)' },
      },
    },
  },
};

module.exports = AddListMember;
