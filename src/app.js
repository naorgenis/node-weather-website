const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { response } = require("express");

const staticViews = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticViews));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "naor genis",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "naor genis" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "naor genis" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you must provide an address" });
  }

  geoCode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    } else {
      forecast(data.lat, data.long, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        } else
          res.send({
            location: data.location,
            address: req.query.address,
            forecast: forecastData,
          });
      });
    }
  });

  //res.send(`your location is: ${req.query.address}`);
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error",
    text: "The article help not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error",
    text: "The page not found",
  });
});

app.listen(3000, () => {
  console.log("port 3000 on the air");
});
