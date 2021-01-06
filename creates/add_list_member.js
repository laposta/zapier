// const customInputFields = async (z, bundle) => {
//   zapier.tools.env.inject();
//   const response = await z.request('https://api.laposta.nl/v2/field?list_id='+process.env.LIST_ID);
//   // console.log(response.data);
//   // Should return an array like [{"key":"field_1"},{"key":"field_2"}]
//   return response.data;
// };

const inputFields = [
  {
    key: 'list_id',
    label: 'List ID',
    type: 'string',
    helpText: "Een geldig list_id van je Laposta lijst.",
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
  // customInputFields,
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
];

// Main
const AddListMember = {
  key: 'add_list_member',
  noun: 'Relatie',
  display: {
    label: 'Voeg Relatie Toe',
    description:
      'Voegt een nieuwe relatie aan een bestaande lijst in je Laposta account.',
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
    inputFields: inputFields,
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
