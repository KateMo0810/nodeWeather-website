const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/46100d338ef5158bb22edb09bb707108/' + lat + ',' + lon + '?units=si'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast