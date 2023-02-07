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
      sails.log.debug("Running api/v1/users/fans/create.js");
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
          endpoint: `admin/fans`,
          params: obj,
        });

        sails.log(data.data)
        this.res.set(headers);
        if (data.status && !_.isUndefined(data.data.id)) {
          inputs.user_id = data.data.id;
          let response2 = await sails.helpers.request2.with({
            req: this.req,
            type: "PUT",
            server: "LOGIC",
            endpoint: `create/users/${inputs.user_id}`,
            params: { ...obj.data  , currentUser  : data.data.currentUser , full_name : data.data.full_name},
          });

          sails.log(response2);
          return exits.success({
            status : true,
            data : response2.body.data,
            message : "Fans Created"
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
  