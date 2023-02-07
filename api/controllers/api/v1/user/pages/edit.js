const moment = require('moment');

module.exports = {
  friendlyName: "Edit page",

  description: "",

  inputs: {
    id: {
      type: 'number',
      required:true
    },
    title: {
      type: 'string',
      required:true
    },
    description: {
      type:'string'
    },
    screenshot: {
      type:'string'
    },
    image: {
      type:'string'
    },
    image_id: {
      type:'number'
    },    
    contact_buttons: {
      type: 'ref',
      
    },
    links: {
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
    sails.log.debug("Running api/v1/user/pages/edit.js with inputs ", JSON.stringify(inputs), "\nTime: ", moment().format());
    try {
      const { body, error,response } = await sails.helpers.request2.with({
        req: this.req,
        type: "PUT",
        server: "LOGIC",
        endpoint: `user/pages/${inputs.id}`,
        params: inputs,
      });
      this.res.set(response.headers);
      sails.log.debug("api/v1/user/pages/edit.js executed successfully with data: ", JSON.stringify(response.body), "\nTime: ", moment().format());
      let [exitsName, responseData] = await sails.helpers.response.with({
        serverStatus:response.statusCode,
        data: {
          data: response.body.data,
          message: response.body.message
        },
        status: response.body.status,
      });

      return exits[exitsName](responseData);
    } catch (err) {
      sails.log.error("error calling api/v1/user/pages/edit.js", err.message, "\nTime: ", moment().format());
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
