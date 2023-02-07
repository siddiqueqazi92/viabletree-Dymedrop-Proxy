module.exports = {
    friendlyName: "create",
  
    description: "create user.",
  
    inputs: {
      data: {
        type: 'ref',
      },
      search : {
        type: "string",
        required : false
      },
      filter :{
        type :"ref"
      },
      sort :{
        type :"ref"
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
      sails.log.debug("Running api/v1/users/fans/list.js");
      try {
        inputs.obj = this.req.query;
        const { data, headers } = await sails.helpers.request.with({
          req: this.req,
          type: "GET",
          server: "AUTH",
          endpoint: `admin/fans`,
          params: inputs,
        });
        this.res.set(headers);
        console.log({data});
        return exits.success(data);
        
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
  