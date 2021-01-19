/*

  Handles creating of a listfield on a Laposta account

 */


/*
  Main module
 */
module.exports = {

  key: 'createListField',
  noun: 'Lijst',
  display: {
    label: 'Aanmaken veld in een lijst',
    description: 'Voegt een nieuw veld toe aan een lijst in je Laposta account.',
    hidden: false,
    important: true,
  },

  operation: {

    perform: async(z, bundle) => {
      let body     = bundle.inputData;
      body.ip      = '0.0.0.0';

      const response = await z.request({
        url: 'https://api.laposta.nl/v2/field',
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
          'text' : 'Tekst',
          'numeric' : 'Getal',
          'date' : 'Datum',
          'select_single' : 'Enkele keus',
          'select_multiple' : 'Meerdere keuzen',
        },
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'defaultvalue',
        label: 'Standaardwaarde',
        type: 'string',
        helpText: "Eventuele standaardwaarde van het nieuwe veld.",
        placeholder: 'Standaardwaarde',
        required: false,
        list: false,
        altersDynamicFields: false,
      },

      // datatype_display:  Alleen voor select_single: de gewenste weergave (select, radio)
      // options:  Welke selectiemogelijkheden zijn er? (Verplicht bij datatypes select_single of select_multiple). De opties kunnen als array worden meegegeven. Bij het antwoord worden de options herhaald, maar is er ook een extra veld options_full. Hierin staan ook de bij de options horende id's genoemd, die eventueel gebruikt kunnen worden om de options later te wijzigen.
      // required (verplicht):  Is dit een verplicht veld?
      // in_form (verplicht):  Is het veld te zien in het aanmeldformulier? (boolean)
      // in_list (verplicht):  Is het veld te zien in het overzicht in Laposta? (boolean)


    ],

    sample: {
      naam: 'Nieuwe lijst',
    },
  },
};
