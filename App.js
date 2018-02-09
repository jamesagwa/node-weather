const yargs = require('yargs');

const weather = require('./weather');
const geocodeAddress = require('./geocodeAddress');

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.alias('help', 'h')
.argv;

geocodeAddress(argv.address, (errorMessage, result) => {
    if(errorMessage){
        console.log(errorMessage);
    } else {
        console.log(result.address);
        weather(result.latitude, result.longitude, (errorMsg, weatherResult) => {
            if (errorMsg) {
                console.log(errorMsg);
            } else {
                console.log(`Its currently ${weatherResult.temperature}. It feels like ${weatherResult.apparentTemperature}`);
            }
        });
    }
});

