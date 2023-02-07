const moment = require('moment');

module.exports = {
  friendlyName: "change attributes page",

  description: "",

  inputs: {
    id: {
      type: 'number',
      required:true
    },   
    perfect_pass: {
      type: 'boolean',      
      required:true
    },
    
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
    sails.log.debug("Running api/v1/user/pages/change-attributes.js with inputs ", JSON.stringify(inputs), "\nTime: ", moment().format());
    try {
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "PUT",
        server: "LOGIC",
        endpoint: `user/pages/change-attributes`,
        params: inputs,
      });
      this.res.set(headers);
      sails.log.debug("api/v1/user/pages/change-attributes.js executed successfully with data: ", JSON.stringify(data), "\nTime: ", moment().format());
      return exits.success(data);
    } catch (err) {
      sails.log.error("error calling api/v1/user/pages/change-attributes.js", err.message, "\nTime: ", moment().format());
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
