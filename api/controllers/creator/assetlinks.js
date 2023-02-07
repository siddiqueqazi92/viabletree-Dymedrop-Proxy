module.exports = {
  friendlyName: "Well known",

  description: "Well Known.",

  inputs: {},

  exits: {},

  fn: async function (inputs, exits) {
    return this.res.json([
      // {
      //   relation: ["delegate_permission/common.handle_all_urls"],
      //   target: {
      //     namespace: "android_app",
      //     package_name: "com.dymedropfanapp",
      //     sha256_cert_fingerprints: [
      //       "17:87:4B:45:4F:AF:48:B7:90:32:5D:95:C2:A7:FD:6C:31:13:03:A7:50:6C:EF:9E:53:5E:A6:E6:2E:F3:84:32",
      //     ],
      //   },
      // },
      {
        relation: ["delegate_permission/common.handle_all_urls"],
        target: {
          namespace: "android_app",
          package_name: "com.dymedrop",
          sha256_cert_fingerprints: [
            "00:15:11:F3:62:8A:27:AA:4E:02:EA:8C:8C:E2:2D:75:9E:EB:86:8E:26:2B:E1:47:4F:E4:A5:8B:65:3C:5B:0B",
          ],
        },
      },
    ]);
  },
};
