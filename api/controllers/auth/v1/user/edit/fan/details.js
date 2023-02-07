const moment = require('moment');

module.exports = {
    friendlyName: "Forget Password",

    description: "",

    inputs: {
        first_name: {
            type: 'string',
            required: true
        },
        last_name: {
            type: 'string',
            required: true
        },
        image_url: {
            type: 'string',
        //    required: true
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
        sails.log.debug("Running api/v1/user/accounts/details.js with inputs ", JSON.stringify(inputs), "\nTime: ", moment().format());
        try {
            const { data, headers } = await sails.helpers.request.with({
                req: this.req,
                type: "POST",
                server: "LOGIC",
                endpoint: `user/submit-form-fan`,
                params: { ...inputs },
            });
            this.res.set(headers);
            // const data2 = data
            if (data.status && !_.isUndefined(data.data)) {
                const { body } = await sails.helpers.request2.with({
                    req: this.req,
                    type: "POST",
                    server: "AUTH",
                    endpoint: `user/edit/fan-details`,
                    params: { ...inputs },
                });
                sails.log.debug("api/v1/user/accounts/details.js executed successfully with data: ", JSON.stringify(data), "\nTime: ", moment().format());
                return exits.success({ status: body.status, message: body.message, data: { ...body.data, ...data.data } })
            }
            // delete data.data;
            sails.log.debug("api/v1/user/accounts/details.js executed successfully with data: ", JSON.stringify(data), "\nTime: ", moment().format());
            return exits.success(data);
        } catch (err) {
            sails.log.error("error calling api/v1/user/accounts/details.js", err.message, "\nTime: ", moment().format());
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
