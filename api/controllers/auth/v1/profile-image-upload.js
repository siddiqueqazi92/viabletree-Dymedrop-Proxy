module.exports = {


    friendlyName: 'upload profile image',
  
  
    description: '',
  
  
    inputs: {
      
      image_url: {
        type: 'string',
      }

    },
  
    exits: {
      invalid: {
        responseType: 'badRequest',
      },
      unauthorized: {
        responseType: 'unauthorized'
      },
      forbidden: {
        responseType: 'forbidden',
      },
      serverError: {
        responseType: 'serverError',
      },
      notFound:{
        responseType: 'notFound',
  
      }
    },
  
    fn: async function (inputs,exits) {
      sails.log.debug('Running auth/v1/profile-image-upload with inputs '+JSON.stringify(inputs));
      try{
        const {data,headers} = await sails.helpers.request.with({
          req: this.req,
          type: 'PUT',
          server: 'AUTH',
          endpoint: 'user/profile-image-upload',
          params: inputs
        });
        this.res.set(headers);
        const response2 = await sails.helpers.request.with({
          req: this.req,
          type: 'PUT',
          server: 'LOGIC',
          endpoint: 'user/profile-image-upload',
          params: inputs
        });
        return exits.success(data);
      }
      catch(err){
        sails.log.error('error calling Running auth/v1/profile-image-upload',  err.message);
        if(!_.isUndefined(err.response) && !_.isUndefined(err.response.data) && !_.isUndefined(err.response.status)){
          let [exitsName, responseData] = await sails.helpers.response.with({
            status: err.response.status,
            data: err.response.data
          });
          return exits[exitsName](responseData);
  
        }
        return exits.serverError({status: false, data:[], message: 'Unknown server error.'});
      }
    }
  };
  