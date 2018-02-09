const request = require('request');

const weather = (lat, lng, callback) => {

    request({
        url: `https://api.darksky.net/forecast/7b871acffafc1f6a5d929cdf9ad712b3/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to the forcast.io server.');
        } else if (!error && response.statusCode === 200) {
        callback(undefined,  {
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
        });        
    } else {
        callback('Unable to fetch weather.');
    }
});

};


module.exports = weather;