const addApiKeyToHeader = (request, z, bundle) => {
  // Add auth header to API calls
  const basicHash = Buffer.from(`${bundle.authData.api_key}:x`).toString(
    'base64'
  );
  request.headers.Authorization = `Basic ${basicHash}`;
  return request;
};

module.exports = addApiKeyToHeader;
