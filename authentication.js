/*

  Basic Authentication

 */

module.exports = {
  type: 'custom',
  test: {
    url: 'https://api.laposta.nl/v2/auth',
    method: 'GET',
  },
  fields: [
    {
      key: 'api_key',
      type: 'string',
      required: true,
      helpText: 'Ga naar [koppelingen](https://app.laposta.nl/config/c.connect/s.api/) om de Api key te vinden van jou Laposta account',
    },
  ],
  connectionLabel: '{{bundle.inputData.account_name}}',
};
