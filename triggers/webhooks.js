// Triggers voor de Laposta webhooks voor als er een nieuwe relatie is aangemeld.

// Onthoud resultaat van de hook
let cleanedRequest = {};


// Maak de hook aan (bij Laposta)
const subscribeHook = (z, bundle) => {
  const url = 'https://api.laposta.nl/v2/webhook';
  const options = {
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: bundle.inputData,
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
  cleanedRequest = bundle.cleanedRequest
  return [cleanedRequest];
};

// Een fallback aanroep die een relatie opvraagt
const getFallbackRelation = (z, bundle) => {
  // For the test poll, you should get some real data, to aid the setup process.
  const url = 'https://api.laposta.nl/v2/member/'+bundle.inputData.member_id+'?list_id='+bundle.inputData.list_id;
  const options = {
    url: url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
  };
  return z.request(options).then((response) => response.data);
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
    sample: {
      sample: {
        email: 'test@example.net',
      },
    }
  },
};

module.exports = webhooks;
