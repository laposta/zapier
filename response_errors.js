// Custom response errors
const responseStatusErrors = [
  { 'status':400,'message':'Input is niet compleet'},
  { 'status':401,'message':'Geen geldige API key'},
  { 'status':402,'message':'Aanvraag niet verwerkt'},
  { 'status':404,'message':'Item bestaat niet'},
  { 'status':429,'message':'Maximale aanvragen is bereikt, probeer het later nog eens.'},
  { 'status':500,'message':'Server error'},
];
const responseErrors = [
  { 'code':201,'message':'%param% is leeg'},
  { 'code':202,'message':'De syntax van %param% is niet correct'},
  { 'code':203,'message':'%param% is onbekend'},
  { 'code':204,'message':'%param% komt al voor'},
  { 'code':205,'message':'%param% is geen getal'},
  { 'code':206,'message':'%param% is geen boolean (true/false)'},
  { 'code':207,'message':'%param% is geen datum'},
  { 'code':208,'message':'%param% is geen e-mailadres'},
  { 'code':209,'message':'%param% is geen URL'},
  { 'code':999,'message':'%param% bevat een onbekende fout'},
];

const responseErrorHandling = (response, z, bundle) => {
  let message = false;
  // input errors
  if (response.data.error) {
    z.console.log('ERROR: ',response.data.error);
    message = response.data.error.message;
    if (response.data.error.code) {
      let code = response.data.error.code;
      let messageIdx = responseErrors.findIndex(e=>e.code==code);
      if (messageIdx>=0) {
        message = responseErrors[messageIdx].message;
        message = message.replace(/%param%/,response.data.error.parameter);
        message = message.charAt(0).toUpperCase() + message.slice(1);
      }
    }
    throw new z.errors.Error( message,'', response.status );
  }
  // status errors
  else {
    if (response.status>201) {
      z.console.log('ERROR: ',response.status);
      let messageIdx = responseStatusErrors.findIndex(e=>e.status==response.status);
      if (messageIdx>=0) {
        message = responseStatusErrors[messageIdx].message;
      }
      throw new z.errors.Error( message, '', response.status );
    }
  }
  // throw for standard error statuses
  response.throwForStatus();
  return response;
};

module.exports = responseErrorHandling;
