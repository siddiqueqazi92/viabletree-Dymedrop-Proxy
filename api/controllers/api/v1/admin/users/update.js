const { head } = require("request");

module.exports = {
  friendlyName: "Update",

  description: "Update user.",

  inputs: {
    id: {
      type: 'string'
    },
    data: {
      type: 'ref',
      required: true
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
    sails.log.debug("Running api/v1/users/update.js");
    try {
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "PUT",
        server: "AUTH",
        endpoint: `users/${inputs.id}`,
        params: { ...inputs.data },
      });
      this.res.set(headers);
      if (data.status && !_.isUndefined(data.data.id)) {
        let responseLogic = await sails.helpers.request2.with({
          req: this.req,
          type: "PUT",
          server: "LOGIC",
          endpoint: `update/users/${inputs.id}`,
          params: { ...inputs.data },
        });
        sails.log.debug("api/v1/users/update.js executed");
        return exits.success(responseLogic.body);
      }
    } catch (err) {
      sails.log.error("error calling api/v1/users/create.js", err.message);
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
