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
      helpText: 'De Api key kun je bij je Laposta account vinden bij "Toegang & Abonnement -> Koppelingen"',
    },
  ],
  // basicConfig: {},
  // connectionLabel: '{{bundle.inputData.api_key}}',
};
