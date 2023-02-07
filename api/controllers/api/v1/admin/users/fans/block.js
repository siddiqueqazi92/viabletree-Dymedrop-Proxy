module.exports = {
    friendlyName: "create",
  
    description: "create user.",
  
    inputs: {
      id :{
        type :"string"
      },
      blocked :{
        type :"boolean",
        required : true
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
      sails.log.debug("Running api/v1/users/fans/block.js");
      try {
        
        const { data, headers } = await sails.helpers.request.with({
          req: this.req,
          type: "PUT",
          server: "AUTH",
          endpoint: `admin/fans/block/${inputs.id}`,
          params: inputs,
        });
        this.res.set(headers);

        return exits.success({
            status : true,
            data : data.data,
            message : "User Created"
        });
        
      } catch (err) {
        sails.log.error("error calling api/v1/users/fans/create.js", err.message);
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
  