const request = require('request')


const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a195175baf04041445591370c16b1585&query='+ latitude +','+ longitude + '&units=m';

    request({url, json:true}, (error,{body}) =>{
        if (error){
            callback('Unable to connect to weather service')
        } else if (body.error){
            callback('Unable to find location')
    
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is ' + body.current.temperature + ' deg and there it feels like ' + body.current.feelslike + '.')
        }
    })
}

module.exports = forecast

