const request = require('request');


const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        // resolve and reject only takes one arguement
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
            json: true
        }, (error, Response, body) => {
            if (error) {
                reject('Unable to connect to the Google servers');
            } else if(body.status === 'ZERO_RESULTS'){
                reject('Unable to locate that address');
            } else if(body.status === 'OK'){
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });

    })
};

geocodeAddress('++').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (error) => {
    console.log(error);
});