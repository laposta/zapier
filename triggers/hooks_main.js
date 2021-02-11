/*

  Main hook. All hooks inherit this. Differences set with settings:

  key           - Zap key,
  label         - Zap label
  description   - Zap description
  event         - Laposta hook type 'subscribed|modified|deactivated',

 */



/*
  Converts Hooks data to Zap data:
  - filter by event - event = subscribed|modified|deactivated
  - flatten items
  - add unique id's
 */
const convertHookData = function(data,event) {
  // Filter only the hook types we need
  let filteredData = data.filter( e => e.event==event );
  // Transform to Zapier data (with unique id etc)
  let zapData = filteredData.map( e => {
    let zapDataItem = e.data;
    zapDataItem.id = zapDataItem.member_id;
    zapDataItem.signup_date = zapDataItem.signup_date.replace(/(\d{4}?-\d{2}?-\d{2}?)\s(\d{2}?:\d{2}?:\d{2}?)/g, "$1T$2Z");
    if (zapDataItem.modified) {
      zapDataItem.modified = zapDataItem.modified.replace(/(\d{4}?-\d{2}?-\d{2}?)\s(\d{2}?:\d{2}?:\d{2}?)/g, "$1T$2Z");
    }
    return zapDataItem;
  });
  // console.log('HookData', zapData);
  return zapData;
}

/*
  Converts fallback data to Zap data:
  - flatten items
  - add unique id's
 */
const convertFallbackData = function(data) {
  let zapData = data.map( e => {
    let zapDataItem = e.member;
    zapDataItem.id = zapDataItem.member_id;
    return zapDataItem;
  });
  // console.log('FallbackData', zapData.slice(0,3));
  return zapData;
}


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
  getRelation(event) {
    return (z, bundle) => {
      // bundle.cleanedRequest will include the parsed JSON object (if it's not a
      // test poll) and also a .querystring property with the URL's query string.
      let data = bundle.cleanedRequest.data; //[0].data;
      data = convertHookData(data,event)
      return data;
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
        let data = convertFallbackData(response.data.data);
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
        perform: self.getRelation(settings.event),
        performSubscribe: self.subscribeHook(settings.event),
        performUnsubscribe: self.unsubscribeHook(),
        performList: self.getFallbackRelation(),
        inputFields: [
          {
            key: 'list_id',
            label: 'List',
            type: 'string',
            helpText: "You can find the List ID in the properties of your Laposta list.",
            placeholder: 'List ID of your list',
            required: true,
            list: false,
            altersDynamicFields: true,
            dynamic:'getLists.list_id.name',
          },
        ],
        sample : {
          list_id: '%list_id%',
          email: 'test@example.net',
        },
      },
    };
  },
};
