const moment = require('moment');

module.exports = {
  friendlyName: "create",

  description: "Create payouts stripe",

  inputs: {   
    available_amount: {
      type: 'number',
      required:false
  }
  },

  exits: {
    ok: {
      responseType: "ok",
    },
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
    sails.log.debug("Running api/v1/user/payouts/create.js with inputs ", JSON.stringify(inputs), "\nTime: ", moment().format());
    try {
      // const data = await sails.helpers.request.with({
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "POST",
        server: "LOGIC",
        endpoint: `user/payouts`,
        params:inputs,
      });
      this.res.set(headers);     
      // if req fails on 1st api call
      return exits.success(data);

    } catch (err) {
      sails.log.error("error calling api/v1/user/payouts/create.js", err.message, "\nTime: ", moment().format());
      if (
        !_.isUndefined(err.response) &&
        !_.isUndefined(err.response.data) &&
        !_.isUndefined(err.response.status)
      ) {
        let [exitsName, responseData] = await sails.helpers.response.with({
          status: err.response.status,
          data: err.response.data
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
