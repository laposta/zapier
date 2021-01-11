module.exports = {
  type: 'custom',
  test: {
    url: 'https://api.laposta.nl/v2/auth',
    method: 'GET',
    // params: {},
    // headers: {},
    // body: {},
    // removeMissingValuesFrom: {},
  },
  fields: [
    {
      key: 'api_key',
      type: 'string',
      required: true,
      helpText: 'Ga naar [koppelingen](https://app.laposta.nl/config/c.connect/s.api/) om de Api key te vinden van jou Laposta account',
    },
  ],
  // basicConfig: {},
  connectionLabel: '{{bundle.inputData.account_name}}',
};
