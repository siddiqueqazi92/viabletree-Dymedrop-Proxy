module.exports = {
    friendlyName: "Get Published Activation",
  
    description: "Get Published Activation",
  
    inputs: {

      page_id: {
        type: 'string',
        required: true
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
      sails.log.debug("Running api/v1/fan/get-publish-act-appclip with inputs", inputs);
      try {
        const { data, headers } = await sails.helpers.request.with({
          req: this.req,
          type: "GET",
          server: "LOGIC",
          endpoint: `user/fan/get-publish-pages-appclip/${inputs.page_id}`,
          params: inputs,
        });
        this.res.set(headers);
        return exits.success(data);
      } catch (err) {
        sails.log.error("error calling api/v1/fan/get-publish-act", err.message);
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