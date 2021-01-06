const listFields = async (z, bundle) => {
  z.console.log('Starting listFields', bundle.inputData.list_id);
  const response = await z.request('https://api.laposta.nl/v2/field?list_id='+bundle.inputData.list_id);
  z.console.log('Response from listFields', response);
  if (response.data.data) {
    // Convert Laposta response to Zap field schema
    let responseFields = response.data.data;
    z.console.log('responseFields', responseFields);
    let customFields = responseFields.map( e => {
      let field = e.field;
      let type = 'string'; // Laposta (text, numeric, date, select_single, select_multiple) Zapier: 'string', 'text', 'integer', 'number', 'boolean', 'datetime', 'file', 'password', 'copy'
      switch (field.type) {
        case 'numeric':
          type = 'number';
          break;
        case 'date':
          type = 'datetime';
          break;
      }
      return {
        key: field.tag.replace(/{{/g, "").replace(/}}/g, ""),
        label: field.name,
        type: type,
        helpText: field.name+' van de nieuwe relatie',
        required: field.required,
        list: false,
        altersDynamicFields: false,
      };
    });
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
      const promise = z.request({
        url: 'https://api.laposta.nl/v2/member',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: {
          list_id: bundle.inputData.list_id,
          ip: '0.0.0.0',
          email: bundle.inputData.email,
          'custom_fields[voornaam]': bundle.inputData.voornaam,
          'custom_fields[achternaam]': bundle.inputData.achternaam,
        },
        removeMissingValuesFrom: {},
      });
      return promise.then((response) => response.data);
    },
    inputFields: [
      {
        key: 'list_id',
        label: 'List ID',
        type: 'string',
        helpText: "De List ID kun je vinden bij de [kenmerken](https://app.laposta.nl/c.listconfig/s.settings/t.config/) van je Laposta lijst (bij 'ID voor API').",
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      // {
      //   key: 'email',
      //   label: 'Email',
      //   type: 'string',
      //   helpText: 'Een geldig e-mail adres van de nieuwe relatie',
      //   required: true,
      //   list: false,
      //   altersDynamicFields: false,
      // },
      listFields,
    ],
    sample: {
      member: {
        member_id: '%member_id%',
        list_id: '%list_id%',
        email: 'test@example.net',
        state: 'active',
        signup_date: new Date(),
        modified: null,
        confirm_date: null,
        ip: '0.0.0.0',
        source_url: null,
        custom_fields: { voornaam: 'Voornaam (voorbeeld)', achternaam: 'Achternaam (voorbeeld)' },
      },
    },
    outputFields: [
      { key: 'member__member_id' },
      { key: 'member__list_id' },
      { key: 'member__email' },
      { key: 'member__state' },
      { key: 'member__signup_date' },
      { key: 'member__modified' },
      { key: 'member__confirm_date' },
      { key: 'member__ip' },
      { key: 'member__source_url' },
      { key: 'member__custom_fields__voornaam' },
      { key: 'member__custom_fields__achternaam' },
    ],
  },
};

module.exports = AddListMember;
