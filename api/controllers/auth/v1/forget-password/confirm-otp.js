const moment = require('moment')
module.exports = {
  friendlyName: "Confirm Otp",

  description: "",

  inputs: {
    otp: {
      type: "string",
    },
    contact: {
      type: "ref",
      required: false,
      custom: function (value) {
        return (
          _.isObject(value) &&
          !_.isUndefined(value.country_code) &&
          !_.isUndefined(value.number)
        );
      },
    },
    email: {
      type: 'string',
      required: false,
      isEmail: true
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
  },

  fn: async function (inputs, exits) {
    sails.log.debug("Running auth/v1/forget-password/confirm-otp.js with inputs ", JSON.stringify(inputs), "\nTime: ", moment().format());
    if (!inputs.email && !inputs.contact) {
      sails.log.error("Error at auth/v1/forget-password/confirm-otp.js with reason: '!inputs.email && !inputs.contact'\nTime: ", moment().format());
      return exits.notFound({ status: false, data: [], message: "Email/contact is required" });
    }
    try {
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "POST",
        server: "AUTH",
        endpoint: "forget-password/confirm",
        params: inputs,
      });
      this.res.set(headers);
      sails.log.debug("auth/v1/forget-password/confirm-otp.js executed successfully with data: ", JSON.stringify(data), "\nTime: ", moment().format());
      return exits.success(data);
    } catch (err) {
      sails.log.error("error calling auth/v1/send-otp", err.message), "\nTime: ", moment().format();
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
