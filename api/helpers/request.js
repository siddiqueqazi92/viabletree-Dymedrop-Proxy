const moment = require('moment');

module.exports = {
  friendlyName: "Request",

  description: "Request something.",

  inputs: {
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

  fn: async function ({ req, type, server, endpoint, params }) {
    sails.log.debug(`Running helpers/request.js with inputs: ${{ req, type, server, endpoint, params }}
    on time: ${moment().format()}}`);
    sails.log({ url: sails.config.auth_url });
    try {
      let url = "";
      switch (server) {
        case "LOGIC":
          url = sails.config.api_url;
          break;
        case "AUTH":
          url = sails.config.auth_url;
          break;
      }
      sails.log.debug("call_to", url + endpoint);
      let options = {
        url: url + endpoint,
        headers: {},
        method: type,
        data: params,
        params: params,
      };
      //console.log(req.headers);
      if (req.headers["authorization"]) {
        const authHeader = req.headers["authorization"];
        options.headers.authorization = authHeader;
        sails.log.debug("API CALL ON AUTH SERVER");
      }

      if (req.headers["staging"]) {
        const staging = req.headers["staging"];
        options.headers.staging = staging;
        sails.log.debug("API CALL ON STAGING SERVER");
      }

      if (req.headers["is_admin"]) {
        const is_admin = req.headers["is_admin"];
        options.headers.is_admin = is_admin;
        sails.log.debug("API CALL BY ADMIN");
      }

      options.req = req;
      //options.headers["Content-Type"] = "multipart/form-data";
      const axios = require("axios");
      //    sails.log({ options });

      // `maxContentLength` defines the max size of the http response content in bytes allowed in node.js
      //options.maxContentLength = 1024 * 1024 * 1024 * 1024;

      // `maxBodyLength` (Node only option) defines the max size of the http request content in bytes allowed
      // options.maxBodyLength = 1024 * 1024 * 1024 * 1024;
      options.maxContentLength= Infinity,
      options.maxBodyLength=Infinity
      const response = await axios(options);
      console.log({ response2222: response });
      if (_.isUndefined(response.data) || _.isUndefined(response.headers)) {
        return response;
      }
      sails.log.debug(`helpers/request.js succesfully executed with response: ${response}
          time: ${moment().format()}`)
      return { serverStatus: 200, status: response.data.status, data: response.data, headers: response.headers };
    } catch (err) {
      sails.log.error("error in helpers/request.js", err, "\nTime: ", moment().format());

      // throw new RequestError(err.response.status, err.response.data);
      throw new RequestError(err.response.status, err.response.data || {status:false,message:"Unauthorized"});

      /*(JSON.parse({
        serverStatus: err.response.status,
        data: {
          status: false,
          data: [],
          message: err.message,
        },
      }));
      return false;*/
    }
  },
};

class RequestError extends Error {
  constructor(serverStatus, data) {
    super();
    this.response = {
      status: data.status,
      data: { serverStatus, ...data },
    }
  }
}