const moment = require('moment');

module.exports = {
  friendlyName: "Register",

  description: "",

  inputs: {
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
      type: "string",
      required: false,
    },
    currentUser:{
      type: "string",
      
    },
    invited: {
      type: "boolean",
    },
    password: {
      type: "string",
      required: false,
      custom: function (value) {
        return (value.replace(/\s/g, "").length > 0 && value.length > 5)
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
    sails.log.debug(`Running auth/v1/register.js with inputs: ${JSON.stringify(inputs)}
    on time: ${moment().format()}`);
    inputs.header = this.req.headers
    try {
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "POST",
        server: "AUTH",
        endpoint: "register",
        params: inputs,
      });
      this.res.set(headers);
      sails.log.debug(`User registered at auth/v1/register.js with data: ${data}
      on time: ${moment().format()}`);
      return exits.success(data);
    } catch (err) {
      sails.log.error("error calling auth/v1/register", err.message);
      if (
        !_.isUndefined(err.response) &&
        !_.isUndefined(err.response.data) &&
        !_.isUndefined(err.response.status)
      ) {
        let [exitsName, responseData] = await sails.helpers.response.with({
          status: err.response.status,
          data: err.response.data,
        });
        sails.log.debug(`Error at registering user at auth/v1/register.js with respose: ${responseData}
        exit name: ${exitsName}
        on time: ${moment().format()}`);
        return exits[exitsName](responseData);
      }
      sails.log.debug(`Error at registering user at auth/v1/register.js with respose: ${responseData}
        exit name: ${serverError}
        on time: ${moment().format()}`);
      return exits.serverError({
        status: false,
        data: [],
        message: "Unknown server error.",
      });
    }
  },
};
