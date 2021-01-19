/*

  Handles creating of a list with fields on a Laposta account

 */


/*
  Main module
 */
module.exports = {

  key: 'createListFields',
  noun: 'Lijst',
  display: {
    label: 'Aanmaken van lijst met velden',
    description: 'Maak een nieuwe lijst met bijbehorende velden aan.',
    hidden: false,
    important: true,
  },

  operation: {

    perform: async(z, bundle) => {
      let body     = bundle.inputData;

      // Maak lijst aan
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

      let list_id = response.data.list.list_id;
      z.console.log('LIST_ID',list_id);

      // Voeg velden toe
      let fields = bundle.inputData.fields;
      for (var i = 0; i < fields.length; i++) {
        let field = fields[i];
        let body = field;
        body.list_id = list_id;
        let responseField = await z.request({
          url: 'https://api.laposta.nl/v2/field',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
          body: body,
          removeMissingValuesFrom: {},
        });
        z.console.log('FIELD:',responseField);
      }

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
        // type: 'string',
        // helpText: 'Velden van de nieuwe lijst',
        // placeholder: 'Velden van de nieuwe lijst',
        // required: true,
        // list: false,
        // altersDynamicFields: false,
      // VELDEN
      {
        key: 'fields',
        label: 'Velden',
        children: [
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
          {
            key: 'name',
            label: 'Naam',
            type: 'string',
            helpText: "De naam van het nieuwe veld in je lijst.",
            placeholder: 'Naam van nieuwe veld',
            required: true,
            list: false,
            altersDynamicFields: false,
          },
          {
            key: 'datatype',
            label: 'Type veld',
            type: 'string',
            helpText: "Type veld (text, numeric, date, select_single of select_multiple).",
            placeholder: 'Type van het nieuwe veld.',
            choices: {
              'text'     : 'Tekst',
              'numeric'  : 'Getal',
              'date'     : 'Datum',
              'select_single'   : 'Keuze',
              'select_multiple' : 'Meerdere keuzen',
            },
            required: true,
            list: false,
            altersDynamicFields: true,
          },
          // function (z, bundle) {
          //   if (bundle.inputData.datatype === 'select_single') {
          //     return [{
          //       key: 'datatype_display',
          //       label: 'Weergave',
          //       type: 'string',
          //       helpText: "Weergave van deze optie als dropdown of als radiobuttons",
          //       placeholder: 'Weergave',
          //       choices: {
          //         'select' : 'Dropdown',
          //         'radio' : 'Radiobuttons',
          //       },
          //       required: true,
          //       list: false,
          //       altersDynamicFields: false,
          //     }];
          //   }
          //   return [];
          // },
          // // options:  Welke selectiemogelijkheden zijn er? (Verplicht bij datatypes select_single of select_multiple). De opties kunnen als array worden meegegeven. Bij het antwoord worden de options herhaald, maar is er ook een extra veld options_full. Hierin staan ook de bij de options horende id's genoemd, die eventueel gebruikt kunnen worden om de options later te wijzigen.
          // function (z, bundle) {
          //   if (bundle.inputData.datatype === 'select_single' || bundle.inputData.datatype === 'select_multiple') {
          //     return [{
          //       key: 'options',
          //       label: 'Opties',
          //       type: 'text',
          //       helpText: "Welke opties zijn er mogelijk bij dit veld?",
          //       placeholder: 'Opties',
          //       required: true,
          //       list: false,
          //       altersDynamicFields: false,
          //     }];
          //   }
          //   return [];
          // },
          // {
          //   key: 'defaultvalue',
          //   label: 'Standaardwaarde',
          //   type: 'string',
          //   helpText: "Eventuele standaardwaarde van het nieuwe veld.",
          //   placeholder: 'Standaardwaarde',
          //   required: false,
          //   list: false,
          //   altersDynamicFields: false,
          // },
          {
            key: 'required',
            label: 'Verplicht',
            type: 'boolean',
            helpText: "Is dit een verplicht veld?",
            placeholder: 'Verplicht',
            required: true,
            list: false,
            altersDynamicFields: false,
          },
          {
            key: 'in_form',
            label: 'Aanmeldformulier',
            type: 'boolean',
            helpText: "Is het veld te zien in het aanmeldformulier?",
            placeholder: 'Aanmeldformulier',
            required: true,
            list: false,
            altersDynamicFields: false,
          },
          {
            key: 'in_list',
            label: 'Overzicht',
            type: 'boolean',
            helpText: "Is het veld te zien in het overzicht in Laposta?",
            placeholder: 'Overzicht',
            required: true,
            list: false,
            altersDynamicFields: false,
          },
        ],
      },

    ],

    sample: {
      naam: 'Nieuwe lijst',
    },


    // sample: {
    //   naam: 'Nieuwe lijst',
    // },
  },
};
