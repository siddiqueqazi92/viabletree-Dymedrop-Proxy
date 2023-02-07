module.exports = {
    friendlyName: "Get profile",
  
    description: "Get profile.",
  
    inputs: {
        device_id : {
            type : "string"
        },
        user_id :{
            type :"string"
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
      sails.log.debug("Running api/v1/guest/confirm with inputs" + JSON.stringify(inputs ) );
      try {
        inputs.header = this.req.headers
        const { data, headers } = await sails.helpers.request.with({
          req: this.req,
          type: "POST",
          server: "LOGIC",
          endpoint: `user/guest/confirm`,
          params: inputs,
        });
        this.res.set(headers);
        return exits.success(data);
      } catch (err) {
        sails.log.error("error calling api/v1/guest/confirm", err.message);
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