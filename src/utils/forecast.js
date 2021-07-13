const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `https://api.tomorrow.io/v4/timelines?location=${lat},${long}&fields=temperature&timesteps=1h&units=metric&apikey=cxCwtaqYN9DztfFwWpDB5COjI9vdQLyF`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Internet connection", undefined);
    } else if (response.body.error) {
      callback("Cant reach to the Weather", undefined);
    } else {
      callback(
        undefined,
        `The weather is: ${response.body.data.timelines[0].intervals[0].values.temperature}`
      );
    }
  });
};

module.exports = forecast;
