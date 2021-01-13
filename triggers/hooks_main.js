/*

  Main hook. All hooks inherit this. Differences set with settings:

  key           - Zap key,
  label         - Zap label
  description   - Zap description
  event         - Laposta hook type 'subscribed|modified|deactivated',

 */


module.exports = {


/*
  Add hook to Laposta list
 */
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


/*
  Remove hook from Laposta list
 */
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


/*
  Handles the hook itself (hook returns with data)
 */
  getRelation() {
    return (z, bundle) => {
      // bundle.cleanedRequest will include the parsed JSON object (if it's not a
      // test poll) and also a .querystring property with the URL's query string.
      let data = bundle.cleanedRequest.data[0].data;
      return [data];
    };
  },

/*
  Fallback for retrieving relations from the Laposta list
 */
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


/*

  Hook is created here, with settings.

 */
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
