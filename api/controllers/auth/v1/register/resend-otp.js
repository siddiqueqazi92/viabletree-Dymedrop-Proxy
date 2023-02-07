const moment = require('moment');

module.exports = {
  friendlyName: "Resend OTP",

  description: "",

  inputs: {
    email: {
      type: "string",
      required: false,
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
    sails.log.debug(`Running auth/v1/register/resend-otp.js. Inputs: ${inputs}
    Time: ${moment().format()}`);

    try {
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "POST",
        server: "AUTH",
        endpoint: "register/resend-otp",
        params: inputs,
      });
      this.res.set(headers);
      sails.log.debug(`Successfully executed auth/v1/register/resend-otp.js. data: ${data}
      Headers: ${headers}
      Time: ${moment().format()}`);
      return exits.success(data);
    } catch (err) {
      sails.log.error("error calling auth/v1/register/resend-otp", err.message, "\nTime: ", moment().format());
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
      sails.log.error("error calling auth/v1/register/resend-otp", err.message, "\nTime: ", moment().format());
      return exits.serverError({
        status: false,
        data: [],
        message: "Unknown server error.",
      });
    }
  },
};
