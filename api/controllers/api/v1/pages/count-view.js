const moment = require('moment');

module.exports = {
  friendlyName: "Count view of page",

  description: "",

  inputs: { 
    slug: {
      type: 'string',
      required:true
    }
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
    sails.log.debug("Running api/v1/pages/count-view.js with inputs ", JSON.stringify(inputs), "\nTime: ", moment().format());
    try {
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "POST",
        server: "LOGIC",
        endpoint: `pages/count-view`,
        params: inputs,
      });
      // headers["Access-Control-Allow-Headers"]
      // headers["Origin, X-Requested-With, Content-Type, Accept"]
      this.res.set(headers);
    //  this.res.set()
      sails.log.debug("api/v1/pages/count-view.js executed successfully with data: ", JSON.stringify(data), "\nTime: ", moment().format());
      return exits.success(data);
    } catch (err) {
      sails.log.error("error calling api/v1/pages/count-view.js", err.message, "\nTime: ", moment().format());
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
