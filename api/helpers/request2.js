const request = require("request");
module.exports = {
  friendlyName: "Invoke",

  description: "Invoke curl.",

  inputs: {
    // url: {
    //   type: "string",
    //   required: true,
    // },
    // method: {
    //   type: "string",
    //   required: true,
    // },
    // postfields: {
    //   type: "json",
    //   required: false,
    // },
    // headers: {
    //   type: "json",
    //   required: false,
    // },
    req: {
      type: "ref",
      required: true,
    },
    type: {
      type: "string",
      required: true,
    },
    server: {
      type: "string",
      required: true,
    },
    endpoint: {
      type: "string",
      required: true,
    },
    params: {
      type: "ref",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs, exits) {
    let req, type, server, endpoint, params;
    req = inputs.req;
    type = inputs.type;
    server = inputs.server;
    endpoint = inputs.endpoint;
    params = inputs.params;
    sails.log("calling helper request2");
    let url = "";
    switch (server) {
      case "LOGIC":
        url = sails.config.api_url;
        break;
      case "AUTH":
        url = sails.config.auth_url;
        break;
    }
    let data = { response: null, error: null, body: null };
    let api_req = {
      url: url + endpoint,
      method: type,
      json: true, // <--Very important!!!
    };
    if (params) {
      api_req.body = params;
    }
    api_req.headers = {};
    if (req.headers["authorization"]) {
      const authHeader = req.headers["authorization"];
      api_req.headers.authorization = authHeader;
    }
    api_req.headers["content-type"] = "application/json";
    //console.log({req: req});
    request(api_req, function (error, response, body) {
      console.log({ response: response, error: error, body: body });
      //data ={ serverStatus: response.statusCode, status: body.status, data: body, headers: response.headers };
      data.error = error;
      data.response = response;
      data.body = body;
      return exits.success(data);
    });
  },
};
