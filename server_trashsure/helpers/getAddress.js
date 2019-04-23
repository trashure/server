const axios = require('axios')
module.exports = (lat, lng) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://geocodeapi.p.rapidapi.com/GetNearestCities?latitude=${lat}&longitude=${lng}&range=0`,
            {
                headers: {
                    "X-RapidAPI-Host": "geocodeapi.p.rapidapi.com",
                    "X-RapidAPI-Key": "zcT6yndppmmshx7i8hQqIaxawFbwp1v5yEOjsnVzSFWtQsmoC2"
                }
            })
            .then(({ data }) => {
                resolve(data[0].City + ', ' + data[0].Country);

            })
            .catch(err => {
                reject(err);
            })
    })
}