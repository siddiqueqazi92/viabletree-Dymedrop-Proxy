module.exports = {
  friendlyName: "Well known",

  description: "Well Known.",

  inputs: {},

  exits: {},

  fn: async function (inputs, exits) {
    return this.res.json({
      "applinks": {
        "apps": [],
        "details": [
          {
            "appID": "N3LF3W25F8.com.dymedropFanApp.app",
            // "paths": [`${sails.config.base_url}fans/*`],
            "paths": ["*"]
          }
        ]
      },
    });
  },
};
