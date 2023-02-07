module.exports = {
  friendlyName: "Get",

  description: "Get users.",

  inputs: {
    user_id: {
      type: "string",
      required: true,
    },
    is_blocked: {
      type: "boolean",
      required: true,
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
    sails.log.debug("Running api/v1/admin/users/change-status.js");
    try {
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "PUT",
        server: "LOGIC",
        endpoint: `admin/users/change-status`,
        params: inputs,
      });
      this.res.set(headers);
      const {
        data2 = data,
        headers2 = headers,
      } = await sails.helpers.request.with({
        req: this.req,
        type: "PUT",
        server: "AUTH",
        endpoint: `users/change-status`,
        params: inputs,
      });
      return exits.success(data);
    } catch (err) {
      sails.log.error(
        "error calling api/v1/admin/users/change-status.js",
        err.message
      );
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
