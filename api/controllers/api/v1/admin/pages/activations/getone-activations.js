module.exports = {
    friendlyName: "Login",
  
    description: "",
  
    inputs: {
      id :{
        type:"string"
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
      notFound: {
        responseType: "notFound",
      },
    },
  
    fn: async function (inputs, exits) {
      sails.log.debug("Running auth/v1/admin/pages/activations/getone-activations.js");
      try {
        ///this is temporary ,need to remove it later
        const { data, headers } = await sails.helpers.request.with({
          req: this.req,
          type: "GET",
          server: "LOGIC",
          endpoint: `admin/activations/${inputs.id}`,
          params: {},
        });
        this.res.set(headers);
        return exits.success(data);
      } catch (err) {
        sails.log.error("error auth/v1/admin/pages/activations/getone-activations.js ", err.message);
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
  