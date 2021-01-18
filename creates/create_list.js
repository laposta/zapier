/*

  Handles creating lists on a Laposta account

 */


/*
  Main module
 */
module.exports = {

  key: 'createList',
  noun: 'Lijst',
  display: {
    label: 'Aanmaken lijst',
    description: 'Voegt een nieuwe lijst toe aan je Laposta account.',
    hidden: false,
    important: true,
  },

  operation: {

    perform: async(z, bundle) => {
      let body     = bundle.inputData;
      body.ip      = '0.0.0.0';

      const response = await z.request({
        url: 'https://api.laposta.nl/v2/list',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: body,
        removeMissingValuesFrom: {},
      });
      return response.data;
    },

    inputFields: [
      {
        key: 'name',
        label: 'Naam',
        type: 'string',
        helpText: "De naam van de aan te maken lijst.",
        placeholder: 'Naam van lijst',
        required: true,
        list: false,
        altersDynamicFields: true,
      },
      {
        key: 'remarks',
        label: 'Opmerkingen',
        type: 'string',
        helpText: 'Eventuele opmerkingen over deze lijst.',
        placeholder: 'Opmerkingen',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'subscribe_notification_email',
        label: 'Aanmeld Notificatie Email',
        type: 'string',
        helpText: 'Eventueel emailadres waar notificaties van een nieuwe relatie op deze lijst naar worden gestuurd.',
        placeholder: 'Aanmeld notificatie e-mail',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'unsubscribe_notification_email',
        label: 'Afmeld Notificatie Email',
        type: 'string',
        helpText: 'Eventueel emailadres waar notificaties van het afmelden van een relatie op deze lijst naar worden gestuurd.',
        placeholder: 'Afmeld notificatie e-mail',
        required: false,
        list: false,
        altersDynamicFields: false,
      },

    ],

    sample: {
      naam: 'Nieuwe lijst',
    },
  },
};
