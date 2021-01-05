module.exports = {
  operation: {
    perform: {
      url: 'https://api.laposta.nl/v2/member',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: {
        list_id: '{{bundle.inputData.list_id}}',
        ip: '0.0.0.0',
        email: '{{bundle.inputData.email}}',
        'custom_fields[voornaam]': '{{bundle.inputData.voornaam}}',
        'custom_fields[achternaam]': '{{bundle.inputData.achternaam}}',
      },
      removeMissingValuesFrom: {},
    },
    inputFields: [
      {
        key: 'list_id',
        label: 'List ID',
        type: 'string',
        helpText: "The id from you're Laposta list.",
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'email',
        label: 'Email',
        type: 'string',
        helpText: 'Een geldig e-mail adres van de nieuwe relatie',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'voornaam',
        label: 'Voornaam',
        type: 'string',
        helpText: 'Voornaam van de nieuwe relatie',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'achternaam',
        label: 'Achternaam',
        type: 'string',
        helpText: 'Achternaam van de nieuwe relatie',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      member: {
        member_id: '%member_id%',
        list_id: '%list_id%',
        email: 'my@email.com',
        state: 'active',
        signup_date: '2020-11-17 13:36:52',
        modified: null,
        confirm_date: null,
        ip: '0.0.0.0',
        source_url: null,
        custom_fields: { voornaam: 'First name', achternaam: 'Last name' },
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
  key: 'add_list_member',
  noun: 'Relation',
  display: {
    label: 'Add relation to a Laposta list',
    description:
      'Adds a new relation to an existing list in your Laposta account.',
    hidden: false,
    important: true,
  },
};
