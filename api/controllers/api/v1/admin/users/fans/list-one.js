module.exports = {
    friendlyName: "create",
  
    description: "create user.",
  
    inputs: {
      user: {
        type: 'ref',
      },
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
      sails.log.debug("Running api/v1/users/fans/listOne.js");
      try {
     
        const { data, headers } = await sails.helpers.request.with({
          req: this.req,
          type: "GET",
          server: "AUTH",
          endpoint: `admin/fans/${inputs.id}`,
          params: {},
        });
        this.res.set(headers);

        return exits.success({
            status : true,
            data : data.data,
            message :data.message
        });
        
      } catch (err) {
        sails.log.error("error calling api/v1/users/fans/list.js", err.message);
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
  