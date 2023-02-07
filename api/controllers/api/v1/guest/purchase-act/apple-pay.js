module.exports = {
    friendlyName: "Purchase Activation Apple Pay",
  
    description: "Purchase Activation using Apple Pay",
  
    inputs: {

      activation_id: {
        type: 'string',
        required: true
      },
      payment_method_id: {
        type:'string'
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
      sails.log.debug("Running api/v1/guest/purchase-act/apple-pay");
      try {
        inputs.header = this.req.headers
        const { data, headers } = await sails.helpers.request.with({
          req: this.req,
          type: "POST",
          server: "LOGIC",
          endpoint: `user/guest/purchase-act/apple-pay`,
          params: inputs,
        });
        this.res.set(headers);
        return exits.success(data);
      } catch (err) {
        sails.log.error("error calling api/v1/guest/purchase-act/apple-pay", err.message);
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