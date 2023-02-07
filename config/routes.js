/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

// const corsPolicy = {
//   allRoutes: true,
//   allowOrigins: "*",
//   allowCredentials: false,
//   allowRequestMethods: "GET, POST, PUT, DELETE, OPTIONS, HEAD",
//   allowRequestHeaders: "*",
// };
// const corsPolicy = {
//   allRoutes: true,
//   allowOrigins: ["http://localhost:3000", "http://localhost:3031"],
//   allowCredentials: true,
//   allowRequestHeaders: "content-type, authorization",
//   allowResponseHeaders: "content-range",
// };

const corsPolicy = {
  allRoutes: true,
  allowOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://dymedrop-f2c20--staging-fiyx4ey7.web.app",
    "https://dymedrop-f2c20--dev-j926rs4b.web.app",
    "https://dymedrop-f2c20.web.app",
    "https://dymedrop-webapp.web.app",
    "https://dymedrop-staging.web.app",
    "https://dymedrop.me",
    "http://dymedrop-proxy-dev-332861340.us-east-1.elb.amazonaws.com",
  ],
  allowCredentials: true,
  allowRequestMethods: "GET, POST, PUT, DELETE, OPTIONS, HEAD",
  allowRequestHeaders: "dataType,content-type,authentication,authorization",
};

module.exports.routes = {
  "GET /ping": { action: "ping" },
  "GET /fan": { action: "ping" },
  "GET /creator": { action: "ping" },
  //Admin Routes

  "POST /fans": "api/v1/admin/users/fans/create",
  "GET /fans": "api/v1/admin/users/fans/list",
  "GET /fans/:id": "api/v1/admin/users/fans/list-one",
  "DELETE /fans/:id": "api/v1/admin/users/fans/delete",
  "PUT /fans/:id": "api/v1/admin/users/fans/update",
  "PUT /fans/block/:id": "api/v1/admin/users/fans/block",

  "GET /api/v1/fans/activations/:id": "api/v1/admin/users/fans/getactivations",

  "POST /creators": "api/v1/admin/users/create",

  "GET /creators": "api/v1/admin/users/get",
  "GET /creators/:id": "api/v1/admin/users/get-one",
  "PUT /creators/:id": "api/v1/admin/users/update",
  "PUT /creators/change-status": "api/v1/admin/users/change-status",

  "GET /pages": "api/v1/admin/pages/get",
  "GET /pages/:id": "api/v1/admin/pages/get-one",
  "GET /activations": "api/v1/admin/pages/activations/activations",
  "GET /activations/:id": "api/v1/admin/pages/activations/getone-activations",

  "POST /templates": "api/v1/admin/templates/create",
  "GET /templates": "api/v1/admin/templates/list",
  "GET /templates/:id": "api/v1/admin/templates/list-one",
  "PUT /templates/:id": "api/v1/admin/templates/update",
  "PUT /templates/active/:id": "api/v1/admin/templates/active",

  "GET /finance": "api/v1/admin/finance/list",
  "GET /guest": "api/v1/admin/finance/guest",
  "GET /transfer": "api/v1/admin/transfer/list",

  "GET /invitee": "api/v1/admin/invitee/list",
  "GET /invitee/:id": "api/v1/admin/invitee/get-one",

  "POST /login": "api/v1/admin/login",

  "POST /auth/v1/refresh-token": "auth/v1/refresh-token",

  "POST /auth/v1/register": { action: "auth/v1/register", cors: corsPolicy },
  "POST /auth/v1/register/resend-otp": {
    action: "auth/v1/register/resend-otp",
    cors: corsPolicy,
  },
  "POST /auth/v1/confirm-otp": {
    action: "auth/v1/confirm-otp",
    cors: corsPolicy,
  },
  "POST /auth/v1/login": { action: "auth/v1/login", cors: corsPolicy },
  "POST /auth/v1/logout": { action: "auth/v1/logout", cors: corsPolicy },
  "POST /auth/v1/forget-password": {
    action: "auth/v1/forget-password",
    cors: corsPolicy,
  },
  "POST /auth/v1/forget-password/confirm-otp": {
    action: "auth/v1/forget-password/confirm-otp",
    cors: corsPolicy,
  },
  "POST /auth/v1/forget-password/change-password": {
    action: "auth/v1/forget-password/change-password",
    cors: corsPolicy,
  },

  // api/controllers/auth/v1/user/edit/details.js
  "POST /auth/v1/user/edit/details": "auth/v1/user/edit/details",
  "POST /auth/v1/user/fan/edit/details": "auth/v1/user/edit/fan/details",

  "POST /auth/v1/user/edit/personal-info": {
    action: "auth/v1/user/edit/personal-info",
    cors: corsPolicy,
  },

  "POST /auth/v1/user/edit/password": { action: "auth/v1/user/edit/password" },
  "POST /auth/v1/user/edit/email": { action: "auth/v1/user/edit/email" },
  "POST /auth/v1/user/edit/contact": { action: "auth/v1/user/edit/contact" },
  "POST /auth/v1/user/edit/contact/confirm-otp": {
    action: "auth/v1/user/edit/contact/confirm-otp",
  },
  /*
  Get-one Page by slug
  */
  "GET /api/v1/pages/:slug": {
    action: "api/v1/pages/get-one",
    cors: corsPolicy,
  },

  "POST /api/v1/user/accounts/deactivate": {
    action: "api/v1/user/accounts/deactivate",
    cors: corsPolicy,
  },
  /*
  Create Page 
  */
  "POST /api/v1/user/pages": {
    action: "api/v1/user/pages/create",
    cors: corsPolicy,
  },
  "GET /api/v1/user/pages": {
    action: "api/v1/user/pages/get",
    cors: corsPolicy,
  },
  "GET /api/v1/user/pages/:id": {
    action: "api/v1/user/pages/get-one",
    cors: corsPolicy,
  },
  "PUT /api/v1/user/pages/:id": {
    action: "api/v1/user/pages/edit",
    cors: corsPolicy,
  },
  "PUT /api/v1/user/pages/change-attributes": {
    action: "api/v1/user/pages/change-attributes",
    cors: corsPolicy,
  },
  "DELETE /api/v1/user/pages/:id": {
    action: "api/v1/user/pages/delete",
    cors: corsPolicy,
  },
  "PUT /api/v1/user/pages/publish": {
    action: "api/v1/user/pages/publish",
    cors: corsPolicy,
  },

  "POST /api/v1/pages/count-view": {
    action: "api/v1/pages/count-view",
    cors: corsPolicy,
  },
  "POST /api/v1/pages/links/count-click": {
    action: "api/v1/pages/links/count-click",
    cors: corsPolicy,
  },

  "GET /api/v1/user/get/profile": {
    cors: corsPolicy,
    action: "api/v1/user/get/profile",
  },
  "GET /api/v1/aws/sign-url": {
    action: "api/v1/aws/sign-url",
    cors: corsPolicy,
  },

  //Guest user Create
  //for app clip
  "POST /api/v1/guest/create": {
    cors: corsPolicy,
    action: "api/v1/guest/create",
  },

  "POST /api/v1/user/guest/purchase-act/apple-pay": {
    cors: corsPolicy,
    action: "api/v1/guest/purchase-act/apple-pay",
  },

  "POST /api/v1/user/guest/purchase-act/confirm-apple-pay": {
    cors: corsPolicy,
    action: "api/v1/guest/purchase-act/confirm-apple-pay",
  },

  ///confirmation of guest user if he exists or not
  "POST /api/v1/user/guest/confirm": {
    cors: corsPolicy,
    action: "api/v1/guest/confirmation",
  },

  // ACTIVATION
  //create act by creator
  "POST /api/v1/activation/create": {
    cors: corsPolicy,
    action: "api/v1/packages/create",
  },

  "DELETE /api/v1/activation/delete": {
    cors: corsPolicy,
    action: "api/v1/packages/delete",
  },

  "PUT /api/v1/activation/edit": {
    cors: corsPolicy,
    action: "api/v1/packages/edit",
  },
  //manages bulk actvations of creator.e.g:create,update,delete
  "POST /api/v1/activation/save": {
    cors: corsPolicy,
    action: "api/v1/packages/save",
  },

  //get actvaitons by page id
  "GET /api/v1/activation/get/:pageId": {
    cors: corsPolicy,
    action: "api/v1/packages/get",
  },

  //verifies QRCODE if its
  "POST /api/v1/generate/voucher": {
    cors: corsPolicy,
    action: "api/v1/packages/voucher",
  },

  // Perfect Pass
  //it converts page into perfect pass
  "POST /api/v1/user/perfectpass": {
    cors: corsPolicy,
    action: "api/v1/packages/enable",
  },

  ///admin routes
  "POST /api/v1/admin/login": {
    cors: corsPolicy,
    action: "api/v1/admin/login",
  },
  "POST /api/v1/admin/users": {
    cors: corsPolicy,
    action: "api/v1/admin/users/create",
  },
  "PUT /api/v1/admin/users/:user_id": {
    cors: corsPolicy,
    action: "api/v1/admin/users/update",
  },
  "GET /api/v1/admin/users": {
    cors: corsPolicy,
    action: "api/v1/admin/users/get",
  },
  "GET /api/v1/admin/users/:user_id": {
    cors: corsPolicy,
    action: "api/v1/admin/users/get-one",
  },
  "PUT /api/v1/admin/users/change-status": {
    cors: corsPolicy,
    action: "api/v1/admin/users/change-status",
  },
  "GET /settings": {
    cors: corsPolicy,
    action: "api/v1/admin/settings/get",
  },
  "GET /settings/:id": {
    cors: corsPolicy,
    action: "api/v1/admin/settings/get-one",
  },
  "PUT /settings/:id": {
    cors: corsPolicy,
    action: "api/v1/admin/settings/update",
  },

  // Creator Verify
  //vaerify creator's email
  "POST /api/v1/user/creator/verify": {
    cors: corsPolicy,
    action: "api/v1/user/creator/verify",
  },

  //Payment
  //get payment details of creator's activations
  "POST /api/v1/user/payment/status": {
    cors: corsPolicy,
    action: "api/v1/payment/status",
  },

  //Invitation
  //sends invitation of specific page to invitee or creator
  "POST /api/v1/user/send/invite/:id": {
    cors: corsPolicy,
    action: "api/v1/user/invite/invite",
  },

  //accepts invitation by invitee
  "POST /api/v1/user/invite/accept/:id": {
    cors: corsPolicy,
    action: "api/v1/user/invite/accept",
  },

  //get all invitations of a page by ID
  "GET /api/v1/user/get/invite/:id": {
    cors: corsPolicy,
    action: "api/v1/user/invite/list",
  },

  //verifies if invitation is accepted or not
  "GET /api/v1/user/invite/confirm/:id": {
    cors: corsPolicy,
    action: "api/v1/user/invite/confirm",
  },

  //verifies if fan exists or not
  "POST /api/v1/fan/verify": {
    cors: corsPolicy,
    action: "api/v1/fan/verify",
  },

  // Perfect Pass

  "POST /api/v1/user/perfectpass": {
    cors: corsPolicy,
    action: "api/v1/passes/enable",
  },

  ///verifies user's status if he is approved or not
  "GET /api/v1/user/verify-user": {
    cors: corsPolicy,
    action: "api/v1/user/verify",
  },
  //updates user's profile umage
  "PUT /auth/v1/profile-image": {
    cors: corsPolicy,
    action: "auth/v1/profile-image-upload",
  },

  //fan app
  //purchases activations by fan. using card
  "POST /api/v1/user/fan/purchase-act": {
    cors: corsPolicy,
    action: "api/v1/fan/purchase-act",
  },

  //purchases activations by fan. using apple pay
  "POST /api/v1/user/fan/purchase-act/apple-pay": {
    cors: corsPolicy,
    action: "api/v1/fan/purchase-act/apple-pay",
  },

  //creating customer on stripe
  "POST /api/v1/user/fan/create-customer/apple-pay": {
    cors: corsPolicy,
    action: "api/v1/fan/purchase-act/create-customer",
  },
  //confirmation payment using apple pay
  "POST /api/v1/user/fan/purchase-act/confirm-apple-pay": {
    cors: corsPolicy,
    action: "api/v1/fan/purchase-act/confirm-apple-pay",
  },

  //QRCODE

  ///generates QRCODE
  "GET /api/v1/generate/qrcode": "api/v1/qrcode/create",

  //get published activations by page ID
  "GET /api/v1/user/fan/publish-activations/:page_id": {
    cors: corsPolicy,
    action: "api/v1/fan/get-publish-act",
  },

  //get published activations in appclip by page ID
  "GET /api/v1/user/fan/publish-activations-appclip/:page_id": {
    cors: corsPolicy,
    action: "api/v1/fan/get-publish-act-appclip",
  },

  ///gets purchased activations of fan
  "GET /api/v1/user/fan/get-activations": {
    cors: corsPolicy,
    action: "api/v1/fan/get-activations",
  },

  ///gets pages of purchased activations of fan
  "GET /api/v1/user/fan/get-purchased-pages": {
    cors: corsPolicy,
    action: "api/v1/fan/get-purchased-pages",
  },

  //get fan details
  "GET /api/v1/user/fan/get-one/:id": {
    cors: corsPolicy,
    action: "api/v1/fan/get-one",
  },
  "GET /api/v1/user/fan/get-one-appclip/:id/:device_id": {
    cors: corsPolicy,
    action: "api/v1/fan/get-one-appclip",
  },

  "GET /api/v1/user/creator/account": {
    cors: corsPolicy,
    action: "api/v1/stripe",
  },

  //CARD

  "POST /api/v1/user/card/add": {
    cors: corsPolicy,
    action: "api/v1/user/card/add",
  },

  "GET /api/v1/user/account/card/list": {
    cors: corsPolicy,
    action: "api/v1/user/card/list",
  },

  "POST /api/v1/user/account/login": {
    cors: corsPolicy,
    action: "api/v1/user/card/login",
  },

  "POST /api/v1/user/account/success": {
    cors: corsPolicy,
    action: "api/v1/user/card/success",
  },

  // ----------------------------

  "POST /api/v1/user/fan/cancel-subs/:id": {
    cors: corsPolicy,
    action: "api/v1/fan/cancel-subs",
  },
  "GET /api/v1/user/fan/recent-acts/:page_id": {
    cors: corsPolicy,
    action: "api/v1/fan/recent-act",
  },
  "POST /api/v1/user/fan/qr-code-scan": {
    cors: corsPolicy,
    action: "api/v1/fan/qr-code-scan",
  },
  "POST /api/v1/test-payment": {
    cors: corsPolicy,
    action: "api/v1/test-payment",
  },

  //cancels purchased activation by Fan
  "POST /api/v1/user/fan/cancel-act": {
    cors: corsPolicy,
    action: "api/v1/fan/cancel-act",
  },

  //stripe webhook, receives different events from stripe . e.g: customer.subscription.created
  "POST /api/v1/stripe/webhook": {
    cors: corsPolicy,
    action: "api/v1/stripe/webhook",
  },

  // "POST /api/v1/test-payment": function (req, res) {
  //   res.send({ status: "Alive" });
  // },
  // "GET /fan/.well-known/apple-app-site-association": { action: "fan/well-known" },
  // "GET /.well-known/apple-app-site-association": {
  //   action: "creator/well-known",
  // },
  // "GET /.well-known/assetlinks.json": { action: "creator/assetlinks" },
  // "GET /fan/.well-known/assetlinks.json": { action: "fan/assetlinks" },
  "GET /": { action: "ping" },

  // ///admin routes
  // "POST /api/v1/admin/login": {
  //   cors: corsPolicy,
  //   action: "api/v1/admin/login",
  // },
  // "POST /api/v1/admin/users": {
  //   cors: corsPolicy,
  //   action: "api/v1/admin/users/create",
  // },
  // "PUT /api/v1/admin/users/:user_id": {
  //   cors: corsPolicy,
  //   action: "api/v1/admin/users/update",
  // },
  // "GET /api/v1/admin/users": {
  //   cors: corsPolicy,
  //   action: "api/v1/admin/users/get",
  // },
  // "GET /api/v1/admin/users/:user_id": {
  //   cors: corsPolicy,
  //   action: "api/v1/admin/users/get-one",
  // },
  // "PUT /api/v1/admin/users/change-status": {
  //   cors: corsPolicy,
  //   action: "api/v1/admin/users/change-status",
  // },

  //creates stripe payout, transfers amount from creator's connected account to his bank account
  "POST /api/v1/user/payouts": {
    cors: corsPolicy,
    action: "api/v1/user/payouts/create",
  },
  //saves device token of user that is used to send data message to user
  "POST /api/v1/user/device-tokens": {
    cors: corsPolicy,
    action: "api/v1/user/device-tokens/save",
  },
};
