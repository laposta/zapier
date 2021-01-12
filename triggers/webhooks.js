// Triggers voor de Laposta webhooks voor als er een nieuwe relatie is aangemeld.

// Maak de hook aan (bij Laposta)
const subscribeHook = (z, bundle) => {
  const data = bundle.inputData;
  data.url = bundle.targetUrl;
  data.event = 'subscribed';
  data.blocked = false;
  const options = {
    url: 'https://api.laposta.nl/v2/webhook',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: data,
  };
  return z.request(options).then((response) => response.data);
};

// Verwijder de hook (bij Laposta)
const unsubscribeHook = (z, bundle) => {
  const hookId = bundle.subscribeData.webhook.webhook_id;
  const url = 'https://api.laposta.nl/v2/webhook/'+hookId+'?list_id='+bundle.subscribeData.webhook.list_id;
  const options = {
    url: url,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
  };
  return z.request(options).then((response) => response.data);
};

// Hier komt de hook binnen (een nieuwe relatie is aangemaakt)
const getRelation = (z, bundle) => {
  // bundle.cleanedRequest will include the parsed JSON object (if it's not a
  // test poll) and also a .querystring property with the URL's query string.
  let data = bundle.cleanedRequest.data[0].data;
  return [data];
};


// Een fallback aanroep die alle relaties opvraagt
const getFallbackRelation = (z, bundle) => {
  const url = 'https://api.laposta.nl/v2/member?list_id='+bundle.inputData.list_id;
  const options = {
    url: url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
  };
  return z.request(options).then(function(response) {
    let data = response.data.data.map(m => m.member);
    return data;
  });
};


// Main
const webhooks = {
  key: 'webhooks',
  noun: 'Relatie',
  display: {
    label: 'Een Nieuwe Relatie Is Toegevoegd',
    description: 'Triggers when een nieuwe relatie is toegevoegd aan je lijst in je Laposta account.', // Helaas wil Zapier dat dit begint met 'Triggers when...'
    hidden: false,
    important: true,
  },
  operation: {
    type: 'hook',
    perform: getRelation,
    performSubscribe: subscribeHook,
    performUnsubscribe: unsubscribeHook,
    performList: getFallbackRelation,
    inputFields: [
      {
        key: 'list_id',
        label: 'List ID',
        type: 'string',
        helpText: "De List ID kun je vinden bij de kenmerken van je Laposta lijst.",
        placeholder: 'List ID van jouw lijst',
        required: true,
        list: false,
        altersDynamicFields: true,
      },
    ],
  },
};

module.exports = webhooks;
