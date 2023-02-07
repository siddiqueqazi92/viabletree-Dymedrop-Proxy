module.exports = {
  friendlyName: "Ping",

  description: "Ping something.",

  inputs: {},

  exits: {},

  fn: async function (inputs, exits) {
    // sails.log("Action ping started");
    // sails.log("Action ping ended");
    return exits.success({email:'saadalam804@gmail.com',password:'123456',username:"saad",fullname:"Saad"});
  },
};
