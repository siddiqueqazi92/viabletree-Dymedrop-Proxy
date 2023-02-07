module.exports = {
  friendlyName: "Well known",

  description: "Well Known.",

  inputs: {},

  exits: {},

  fn: async function (inputs, exits) {
    return this.res.json({
      applinks: {
        apps: [],
        details: [
          // {
          //   appID: "N3LF3W25F8.com.dymedropFanApplication.app",
          //   "paths": [`${sails.config.base_url}fans/*`],
          //   paths: ["/fan/*"],
          // },
          {
            appID: "N3LF3W25F8.com.dymedrop.app",
            // "paths": [`${sails.config.base_url}creator/*`],
            paths: ["*"],
          },
        ],
      },
    });
  },
};
