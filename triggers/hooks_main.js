module.exports = {

  // Maak de hook aan (bij Laposta)
  subscribeHook(event) {
    return (z, bundle) => {
      const data = bundle.inputData;
      data.url = bundle.targetUrl;
      data.event = event;
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
  },

  // Verwijder de hook (bij Laposta)
  unsubscribeHook() {
    return (z, bundle) => {
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
  },


  // Hier komt de hook binnen (een nieuwe relatie is aangemaakt)
  getRelation() {
    return (z, bundle) => {
      // bundle.cleanedRequest will include the parsed JSON object (if it's not a
      // test poll) and also a .querystring property with the URL's query string.
      let data = bundle.cleanedRequest.data[0].data;
      return [data];
    };
  },

  // Een fallback aanroep die alle relaties opvraagt
  getFallbackRelation() {
    return (z, bundle) => {
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
  },

  // Main
  create(settings) {
    let self = this;
    return {
      key: settings.key,
      noun: 'Relatie',
      display: {
        label: settings.label,
        description: settings.description,
        hidden: false,
        important: true,
      },
      operation: {
        type: 'hook',
        perform: self.getRelation(),
        performSubscribe: self.subscribeHook(settings.event),
        performUnsubscribe: self.unsubscribeHook(),
        performList: self.getFallbackRelation(),
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
  },
};
