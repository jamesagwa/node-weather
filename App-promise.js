const yargs = require('yargs');
const axios = require('axios');
const fs = require('fs');

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    },
    d: {
        demand: false,
        alias: 'default',
        describe: 'set a default location for the weather search',
        string: true
    }
})
.help()
.alias('help', 'h')
.argv;

// write to file system the default location for the weather app
if (argv.default === undefined) {
    
}
fs.writeFileSync('defaultLocation.txt', argv.default);
let defaultLocation = fs.readFileSync(__dirname + '/defaultLocation.txt');
defaultLocation = defaultLocation.toString();

const encodedAddress = encodeURIComponent(argv.default === undefined ? argv.address : defaultLocation );
const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL).then(response => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }

    const lat = response.data.results[0] && response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0] && response.data.results[0].geometry.location.lng;

    const weatherURL = `https://api.darksky.net/forecast/7b871acffafc1f6a5d929cdf9ad712b3/${lat},${lng}`;
    console.log(response.data.results[0] && response.data.results[0].formatted_address);

    return axios.get(weatherURL);
}).then(response => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`Its currently ${temperature}. Feels like ${apparentTemperature}.`);
}).catch(e => {
    // always play around with error codes when testing out a new library to know what
    // success and errors produced looks like
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    } else {
        console.log(e.message);
    }
});