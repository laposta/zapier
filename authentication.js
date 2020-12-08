module.exports = {
  type: 'basic',
  test: {
    url: 'https://api.laposta.nl/v2/list',
    method: 'GET',
    params: {},
    headers: {},
    body: {},
    removeMissingValuesFrom: {},
  },
  basicConfig: {},
  connectionLabel: '{{bundle.inputData.api_key}}',
};
