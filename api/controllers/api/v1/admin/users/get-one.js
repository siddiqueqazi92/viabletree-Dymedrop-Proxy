module.exports = {
  friendlyName: "Get",

  description: "Get users.",

  inputs: {
    id: {
      type: "string",
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
    sails.log.debug("Running api/v1/users/get-one.js");
    try {
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "GET",
        server: "LOGIC",
        endpoint: `admin/users/${inputs.id}`,
        params: inputs,
      });
      this.res.set(headers);
      // if (data.data.id) {
      //   const response2 = await sails.helpers.request.with({
      //     req: this.req,
      //     type: "GET",
      //     server: "AUTH",////////////////////////////////////////////////////////
      //     endpoint: `users/${inputs.user_id}`,
      //     params: { id: inputs.user_id },
      //   });
      //   if (
      //     !_.isUndefined(response2) &&
      //     !_.isUndefined(response2.data) &&
      //     !_.isUndefined(response2.data) &&
      //     response2.data.id
      //   ) {
      //     data.data.contact =
      //       response2.data.country_code + response2.data.contact;
      //     data.data.email = response2.data.email;
      //   }
      // }

      return exits.success(data);
    } catch (err) {
      sails.log.error("error calling api/v1/users/get-one.js", err.message);
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
