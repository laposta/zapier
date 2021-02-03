module.exports = {

  key: 'getLists',
  noun: 'Lijsten',
  display: {
    label: 'Haal lijsten op',
    description: 'Haal lijsten op',
    hidden: true,
  },
  operation: {
    perform: async(z, bundle) => {
      const response = await z.request({
        url: 'https://api.laposta.nl/v2/list',
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        removeMissingValuesFrom: {},
      });
      let data = response.data.data;
      let convertedData = data.map(l => {
        let list = {
          id         : l.list.list_id,
          list_id    : l.list.list_id,
          name       : l.list.name,
        };
        return list;
      });
      return convertedData;
    },
    inputFields: [],
  },

};
