const moment = require("moment");

module.exports = {
  friendlyName: "Ping",

  description: "Ping something.",

  inputs: {
    user: {
      type: "ref",
    },
    activationName: {
      type: "string",
      required: true,
    },
    activationPrice: {
      type: "number",
      required: true,
    },
    activationFrequency: {
      type: "string",
      required: true,
    },
    activationDescription: {
      type: "string",
      required: true,
    },
    activationScanlimit: {
      type: "string",
      required: true,
    },
    activationFanlimit: {
      type: "string",
      required: true,
    },
    activationPromocode: {
      type: "string",
      required: false,
    },
    activationPublished :{
        type: "number",
        required: false,
    }
  },

  exits: {},

  fn: async function (inputs, exits) {
    sails.log.debug(
      "Running api/v1/packages/create.js with inputs ",
      JSON.stringify(inputs),
      "\nTime: ",
      moment().format()
    );

    try {
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "POST",
        server: "LOGIC",
        endpoint: "activation/create",
        params: inputs,
      });
      this.res.set(headers);
      sails.log.debug(
        "api/v1/packages/create.js executed successfully with data: ",
        JSON.stringify(data),
        "\nTime: ",
        moment().format()
      );
      return exits.success(data);
    } catch (err) {
      sails.log.error(
        "error calling api/v1/packages/create.js",
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
