module.exports = {
  friendlyName: "Personal info",

  description: "Personal info edit.",

  inputs: {
    contact: {
      type: "ref",
      required: true,
      custom: function (value) {
        return (
          _.isObject(value) &&
          !_.isUndefined(value.country_code) &&
          !_.isUndefined(value.number)
        );
      },
    },
    username: {
      type: "string",
    },
    dob: {
      type: "string",
    },
    password: {
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
    sails.log.debug("Running auth/v1/user/edit/personal-info");
    try {
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "POST",
        server: "AUTH",
        endpoint: "user/edit/personal-info",
        params: inputs,
      });
      this.res.set(headers);
      if (data && data.data && data.data.id) {
        this.req.headers["authorization"] = `Bearer ${data.data.access_token}`;
        const response2 = await sails.helpers.request.with({
          req: this.req,
          type: "PUT",
          server: "LOGIC",
          endpoint: "user/edit/personal-info",
          params: inputs,
        });
      }
      return exits.success(data);
    } catch (err) {
      sails.log.error(
        "error calling auth/v1/user/edit/personal-info",
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
