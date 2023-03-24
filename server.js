const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


const apiKey = "a86c7fb477a83a18386576e69eedb0b2";


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;

  if (query.value == "") {
    console.log("if")
    // alert("Please enter city!!");
    // return;
  }
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=metric&appid=" +
    apiKey;
  https.get(url, function (response) {
    response.on("data", function (data) {


      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      const country = weatherData.sys.country;
      const real_feel = weatherData.main.feels_like;
      const pressure = weatherData.main.pressure;
      const humidity = weatherData.main.humidity;
      const visibility = parseInt(weatherData.visibility) / 1000;
      const wind_speed = weatherData.wind.speed;







      res.render('result', {
        weatherDescription: weatherDescription,
        query: query,
        temperature: temperature,
        imageUrl: imageUrl,
        country: country,
        real_feel: real_feel,
        pressure: pressure,
        humidity: humidity,
        visibility: visibility,
        wind_speed: wind_speed

      });
      // res.write("<p>The weather is currently " + weatherDescription + "</p>");
      // res.write(
      //   "<h1>The Current Temperature in "+query+" is: " +
      //     temperature +
      //     " degrees Celcius.</h1>"
      // );
      // res.write("<img src=" + imageUrl + ">");
      // res.send();
    });
  });
});

app.listen(port, () => {
  console.log('Server is up and runnig on port 3000.');
});
