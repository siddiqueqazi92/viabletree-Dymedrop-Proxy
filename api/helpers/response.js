let moment = require('moment');

module.exports = {


  friendlyName: 'Response',


  description: 'Response something.',


  inputs: {
    serverStatus: {
      type: 'number'
    },
    data: {
      type: 'ref'
    },
    status: {
      type: 'boolean',
      defatltsTO: false
    },
  },


  exits: {


  },


  fn: async function ({ serverStatus, data, status }) {
    sails.log.debug('calling helper/response', { data, status }, "\nTime: ", moment().format());
    if (_.isUndefined(serverStatus)) {
      serverStatus = data.serverStatus;
      delete data.serverStatus;
    }
    switch (serverStatus) {
      case 200:
        return ['success', {
          status: status,
          message: data.message,
          data: data.data
        }];
      case 400:
        return ['invalid', {
          status: status,
          message: data.message,
          data: data.data
        }];
      case 401:
        return ['unauthorized', {
          status: status,
          message: data.message,
          data: data.data
        }];
      case 403:
        return ['forbidden', {
          status: status,
          message: data.message,
          data: data.data
        }];
      case 404:
        return ['notFound', {
          status: status,
          message: data.message || data,
          data: data.data || []
        }];
      default:
        return ['serverError', {
          status: status,
          message: data.message,
          data: data.data
        }];
      // return exits.invalid({
      //   status: false,
      //   message: data.message,
      //   data: data.data
      // });
    }
  }


};

