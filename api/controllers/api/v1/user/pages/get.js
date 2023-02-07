const moment = require('moment');

module.exports = {
  friendlyName: "Get page",

  description: "",

  inputs: {
  },

  exits: {
    invalid: {
      responseType: "badRequest",
    },
    unauthorized: {
      responseType: "unauthorized",
    },
    forbidden: {
      responseType: "forbidden",
    },
    serverError: {
      responseType: "serverError",
    },
    notFound: {
      responseType: "notFound",
    },
  },

  fn: async function (inputs, exits) {
    sails.log.debug("Running api/v1/user/pages/get.js with inputs ", JSON.stringify(inputs), "\nTime: ", moment().format());
    try {
      const { serverStatus, status, data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "GET",
        server: "LOGIC",
        endpoint: "user/pages",
        params: inputs,
      });
      this.res.set(headers);
      console.log({ serverStatus, data, headers });
      sails.log.debug("api/v1/user/pages/get.js executed successfully with data: ", JSON.stringify(data), "\nTime: ", moment().format());

      let [exitsName, responseData] = await sails.helpers.response.with({
        serverStatus,
        data: {
          data: data.data,
          message: data.message
        },
        status: status,
      });

      return exits[exitsName](responseData);

    } catch (err) {
      sails.log.error("error calling api/v1/user/pages/get.js", err.message, "\nTime: ", moment().format());
      if (
        !_.isUndefined(err.response) &&
        !_.isUndefined(err.response.data) &&
        !_.isUndefined(err.response.status)
      ) {
        let [exitsName, responseData] = await sails.helpers.response.with({
          status: err.response.status,
          data: err.response.data,
        });
        return exits[exitsName](responseData);
      }
      return exits.serverError({
        status: false,
        data: [],
        message: "Unknown server error.",
      });
    }
  },
};
