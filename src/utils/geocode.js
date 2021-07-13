const request = require("request");

const geoCode = (adrress, callback) => {
  const urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adrress
  )}.json?access_token=pk.eyJ1IjoibmFvcmciLCJhIjoiY2txeTZyODVvMDdzaTJ3czZoNmtpZmQwOCJ9.Yrat4mzinBkgvl2B7G9Bgw`;
  request({ url: urlMapBox, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to service geolocaion", undefined);
    } else if (response.body.features.length === 0) {
      callback("unable to find location, try another location", undefined);
    } else
      callback(undefined, {
        lat: response.body.features[0].center[0],
        long: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
  });
};

module.exports = geoCode;
