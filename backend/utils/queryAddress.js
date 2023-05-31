const request = require('request-promise').defaults({
  gzip: true,
  simple: false,
  resolveWithFullResponse: true
})

async function queryAddress(address) {
  try {
    let options = {
      method: "GET",
      url: `https://maps.googleapis.com/maps/api/geocode/json`,
      json: true,
      qs: {
        address: address,
        key: process.env.MAPS_API_KEY
      }
    };

    let response = await request(options);

    if (response.statusCode !== 200 || response.body.results.length === 0) {
      console.log(response.statusCode);
      console.log(response.body);
      return false;
    };
    return response.body.results[0];
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = queryAddress;