module.exports = {
  friendlyName: "Get",

  description: "Get signed url.",

  inputs: {
    folder: {
      type:'string'
    }
  },

  exits: {},

  fn: async function (inputs, exits) {
    sails.log.debug(
      "Running api/v1/aws/signed-url.js with inputs " + JSON.stringify(inputs)
    );
    try {
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "GET",
        server: "LOGIC",
        endpoint: "aws/sign-url",
        params: inputs,
      });
      this.res.set(headers);
      return exits.success(data);
    } catch (err) {
      sails.log.error("error calling auth/v1/aws/signed-url", err.message);
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
