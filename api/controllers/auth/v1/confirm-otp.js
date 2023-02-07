module.exports = {
  friendlyName: "Confirm Otp",

  description: "",

  inputs: {
    image: {
      type: "string",
    },
    email: {
      type: "string",
    },
    currentUser: {
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
    name: {
      type: "string",
    },
    password: {
      type: "string",
    },
    otp: {
      type: "string",
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
    sails.log.debug("Running auth/v1/confirm-otp.js ");
    try {
      inputs.header = this.req.headers
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "POST",
        server: "AUTH",
        endpoint: "auth/confirmOtp",
        params: inputs,
      });
      this.res.set(headers);
      if (data.status && !_.isUndefined(data.data.id)) {
        inputs.user_id = data.data.id;
       
        let response2 = await sails.helpers.request2.with({
          req: this.req,
          type: "PUT",
          server: "LOGIC",
          endpoint: `users/create/${data.data.id}`,
          params: { ...data.data },
        });
      }
      return exits.success(data);
    } catch (err) {
      sails.log.error("error calling auth/v1/confirm-otp", err.message);
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
