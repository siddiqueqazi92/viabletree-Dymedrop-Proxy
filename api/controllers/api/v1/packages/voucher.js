const moment = require("moment");

module.exports = {
  friendlyName: "Edit Package",

  description: "Edit Package",

  inputs: {
    user: {
        type: "ref",
      },
      code: {
        type: "string",
        required: true,
      },
      voucher_id: {
        type: "string",
       // required: true,
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
    sails.log.debug(
      "Running api/v1/packages/voucher.js with inputs ",
      JSON.stringify(inputs),
      "\nTime: ",
      moment().format()
    );

    try {
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "POST",
        server: "LOGIC",
        endpoint: `generate/voucher`,
        params: inputs,
      });
      this.res.set(headers);
      sails.log.debug(
        "api/v1/packages/voucher.js executed successfully with data: ",
        JSON.stringify(data),
        "\nTime: ",
        moment().format()
      );
      return exits.success(data);
    } catch (err) {
      sails.log.error(
        "error calling api/v1/packages/voucher.js",
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
    return exits.success();
  },
};
