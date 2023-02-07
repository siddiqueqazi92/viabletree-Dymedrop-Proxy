const moment = require('moment');

module.exports = {
  friendlyName: "Forget Password",

  description: "",

  inputs: {
    permanently_delete: {
      type: "boolean",
      required: true,
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
    sails.log.debug("Running api/v1/user/accounts/deactivate.js with inputs ", JSON.stringify(inputs), "\nTime: ", moment().format());
    try {
      // const data = await sails.helpers.request.with({
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "POST",
        server: "LOGIC",
        endpoint: `user/deactivate`,
        params:inputs,
      });
      this.res.set(headers);
      if (data.status && !_.isUndefined(data.data)) {
        let { body } = await sails.helpers.request2.with({
          req: this.req,
          type: "POST",
          server: "AUTH",
          endpoint: "user/accounts/deactivate",
          // params:  data.data,
          params : inputs
        });
        return exits.success(body);
      }
      // if req fails on 1st api call
      return exits.success(data);

    } catch (err) {
      sails.log.error("error calling api/v1/user/accounts/deactivate.js", err.message, "\nTime: ", moment().format());
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
