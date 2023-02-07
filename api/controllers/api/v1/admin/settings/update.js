module.exports = {
  friendlyName: "Update one",

  description: "Update setting.",

  inputs: {
    id: {
      type: "number",
      required: true,
    },
    data: {
      type: "ref",
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
    sails.log.debug("Running api/v1/admin/settings/update.js");
    try {
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "PUT",
        server: "LOGIC",
        endpoint: `admin/settings/${inputs.id}`,
        params: inputs,
      });
      this.res.set(headers);    

      return exits.success(data);
    } catch (err) {
      sails.log.error("error calling api/v1/admin/settings/update.js", err.message);
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
