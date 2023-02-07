const moment = require('moment');

module.exports = {
  friendlyName: "Login",

  description: "",

  inputs: {
    contact: {
      type: "ref",
      custom: function (value) {
        return (
          _.isObject(value) &&
          !_.isUndefined(value.country_code) &&
          !_.isUndefined(value.number)
        );
      },
    },
    email: {
      type: "string",
      isEmail: true
    },
    password: {
      type: "string",
    },
    currentUser: {
      type: "string",
      required: false,
      isIn:["creator","fan"]
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
    sails.log.debug("Running auth/v1/login.js Inputs: ", JSON.stringify(inputs), "\nTime: ", moment().format());
    try {
      const { data, headers } = await sails.helpers.request.with({
        req: this.req,
        type: "POST",
        server: "AUTH",
        endpoint: "login",
        params: inputs,
      });
      this.res.set(headers);
      sails.log(data , "dataishere");
      if (data.status && !_.isUndefined(data.data) && data.data.is_active) {
        console.log("dataishere condition true");
        const {
          data2 = data,
          headers2 = headers,
        } = await sails.helpers.request2.with({
          req: this.req,
          type: "POST",
          server: "LOGIC",
          endpoint: `user/activate`,
          params: { user: data.data },
        });
      }
      // if (data.data.id) {
      //   const response2 = await sails.helpers.request.with({
      //     req: this.req,
      //     type: "GET",
      //     server: "LOGIC",
      //     endpoint: "user/get/profile",
      //     params: { id: data.data.id },
      //   });

      //   // data.data.username = null;
      //   data.data.bio = null;

      //   if (
      //     !_.isUndefined(response2) &&
      //     !_.isUndefined(response2.data) &&
      //     !_.isUndefined(response2.data.data)
      //   ) {
      //     data.data.name = response2.data.data.name;
      //     data.data.username = response2.data.data.username;
      //     data.data.bio = response2.data.data.bio;
      //     data.data.profile_image = response2.data.data.profile_image;
      //     data.data.is_artist = response2.data.data.is_artist;
      //     if (response2.data.data.is_artist) {
      //       data.data.cover_image = response2.data.data.cover_image;
      //       data.data.facebook = response2.data.data.facebook;
      //       data.data.instagram = response2.data.data.instagram;
      //       data.data.tiktok = response2.data.data.tiktok;
      //       data.data.dribble = response2.data.data.dribble;
      //     }
      //   }
      // }
      sails.log.debug("auth/v1/login.js executed succesfully. Data: ", JSON.stringify(data), "\nTime: ", moment().format());
      return exits.success(data);
    } catch (err) {
      sails.log.error("error calling auth/v1/login", err.message);
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
