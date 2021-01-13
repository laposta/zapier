/*

  Adds auth header to API calls

 */

module.exports = (request, z, bundle) => {
  const basicHash = Buffer.from(`${bundle.authData.api_key}:x`).toString(
    'base64'
  );
  request.headers.Authorization = `Basic ${basicHash}`;
  return request;
};
