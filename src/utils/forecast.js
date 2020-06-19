const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f5837968493892b911f4243397f240d0&query='+latitude+','+longitude

    request( {url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find lcation.', undefined)
        } else {
            callback(undefined, 'It is currently ' + response.body.current.temperature + ' degrees out. It feels like '+ response.body.current.feelslike + ' degrees out.')
        }

    })
}

module.exports = forecast


