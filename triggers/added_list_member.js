const subscribeHook = (z, bundle) => {
  // bundle.targetUrl has the Hook URL this app should call when a recipe is created.
  const data = {
    url: bundle.targetUrl,
    style: bundle.inputData.style,
  };

  // You can build requests and our client will helpfully inject all the variables
  // you need to complete. You can also register middleware to control this.
  const options = {
    url: 'https://57b20fb546b57d1100a3c405.mockapi.io/api/hooks',
    method: 'POST',
    body: data,
  };
  // You may return a promise or a normal data structure from any perform method.
  return z.request(options).then((response) => response.data);
};

// const unsubscribeHook = (z, bundle) => {
//   // bundle.subscribeData contains the parsed response JSON from the subscribe
//   // request made initially.
//   const hookId = bundle.subscribeData.id;

//   // You can build requests and our client will helpfully inject all the variables
//   // you need to complete. You can also register middleware to control this.
//   const options = {
//     url: `https://57b20fb546b57d1100a3c405.mockapi.io/api/hooks/${hookId}`,
//     method: 'DELETE',
//   };

//   // You may return a promise or a normal data structure from any perform method.
//   return z.request(options).then((response) => response.data);
// };

// const getRecipe = (z, bundle) => {
//   // bundle.cleanedRequest will include the parsed JSON object (if it's not a
//   // test poll) and also a .querystring property with the URL's query string.
//   const recipe = {
//     id: bundle.cleanedRequest.id,
//     name: bundle.cleanedRequest.name,
//     directions: bundle.cleanedRequest.directions,
//     style: bundle.cleanedRequest.style,
//     authorId: bundle.cleanedRequest.authorId,
//     createdAt: bundle.cleanedRequest.createdAt,
//   };

//   return [recipe];
// };

// const getFallbackRealRecipe = (z, bundle) => {
//   // For the test poll, you should get some real data, to aid the setup process.
//   const options = {
//     url: 'https://57b20fb546b57d1100a3c405.mockapi.io/api/recipes/',
//     params: {
//       style: bundle.inputData.style,
//     },
//   };

//   return z.request(options).then((response) => response.data);
// };


// Main
const AdddedListMember = {
  key: 'addded_list_member',
  noun: 'Relatie',
  display: {
    label: 'Een Nieuwe Relatie is Toegevoegd',
    description: 'Een nieuwe relatie is toegevoegd aan je lijst in je Laposta account.',
    hidden: false,
    important: true,
  },
  operation: {
    type: 'hook',
    performSubscribe: subscribeHook,
    // performUnsubscribe: unsubscribeHook,
    // perform: getRecipe,
    // performList: getFallbackRealRecipe,
    sample: {
      sample: {
        email: 'test@example.net',
      },
    }
  },

  // `inputFields` can define the fields a user could provide,
  // we'll pass them in as `bundle.inputData` later.
  inputFields: [
  ],
  outputFields: [
  ],



  //   perform: (z, bundle) => {
  //     // let body     = bundle.inputData;
  //     // body.list_id = bundle.inputData.list_id;
  //     // body.ip      = '0.0.0.0';
  //     const promise = z.request({
  //       url: 'https://api.laposta.nl/v2/member',
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         Accept: 'application/json',
  //       },
  //       body: body,
  //       removeMissingValuesFrom: {},
  //     });
  //     return promise.then((response) => response.data);
  //   },
  // },
};

module.exports = AdddedListMember;
