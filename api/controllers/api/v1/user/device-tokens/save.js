const moment = require("moment");

module.exports = {
  friendlyName: "Forget Password",

  description: "",

  inputs: {
    device_token: {
      type: "string",
      required: true,
    },
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
    sails.log.debug(
      "Running api/v1/user/device-tokens.js with inputs ",
      JSON.stringify(inputs),
      "\nTime: ",
      moment().format()
    );
    try {
      // const data = await sails.helpers.request.with({
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "POST",
        server: "LOGIC",
        endpoint: `user/device-tokens`,
        params: inputs,
      });
      this.res.set(headers);

      return exits.success(data);
    } catch (err) {
      sails.log.error(
        "error calling api/v1/user/device-tokens.js",
        err.message,
        "\nTime: ",
        moment().format()
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
