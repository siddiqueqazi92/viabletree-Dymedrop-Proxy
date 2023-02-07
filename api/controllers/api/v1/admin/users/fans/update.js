module.exports = {
    friendlyName: "create",
  
    description: "create user.",
  
    inputs: {
      data: {
        type: 'ref',
      },
      id : {
        type : 'string'
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
      sails.log.debug("Running api/v1/users/fans/update.js");
      try {
        let obj = {
          data: inputs.data
        };
        const { data, headers } = await sails.helpers.request.with({
          req: this.req,
          type: "PUT",
          server: "AUTH",
          endpoint: `admin/fans/${inputs.id}`,
          params: obj,
        });

        // sails.log(...data);
        this.res.set(headers);
        if (data.status && !_.isUndefined(data.data.id)) {
        //   inputs.user_id = inputs.id;
          let response2 = await sails.helpers.request2.with({
            req: this.req,
            type: "PUT",
            server: "LOGIC",
            endpoint: `create/users/${inputs.id}`,
            params: { ...data.data },
          });

          console.log({response2});

          return exits.success({
            status : true,
            data : data.data,
            message : "User Updated"
          });
        }
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
  