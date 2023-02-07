module.exports = {
  friendlyName: "create",

  description: "create user.",

  inputs: {
    data: {
      type: 'ref',
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
    sails.log.debug("Running api/v1/users/create.js");
    try {
      let obj = {
        // id: inputs.id,
        // name: inputs.name,
        // username: inputs.username,
        // contact: inputs.contact,
        // email: inputs.email,
        data: inputs.data
      };
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "POST",
        server: "AUTH",
        endpoint: `admin/users`,
        params: obj,
      });
      this.res.set(headers);
      if (data.status && !_.isUndefined(data.data.id)) {
        inputs.user_id = data.data.id;
        let response2 = await sails.helpers.request2.with({
          req: this.req,
          type: "PUT",
          server: "LOGIC",
          endpoint: `create/users/${inputs.user_id}`,
          params: { ...obj.data , full_name : data.data.full_name },
        });
        return exits.success(response2.body);
      }
    } catch (err) {
      sails.log.error("error calling api/v1/users/create.js", err.message);
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
