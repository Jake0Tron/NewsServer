const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 8080;
const fs = require("fs");

fs.readFile("./NEWS_API_KEY.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
  NEWS_API_KEY = data;
});

// * https://openweathermap.org/api/geocoding-api
// app.get("", (req, res) => {});

//================================
// NEWS
//================================
app.get("/news", async (req, res) => {
  // TODO: Look into search parameters
  const { topics } = req.query;
  console.log(`fetching news for ${topics}`);

  const date = new Date(); // TODO

  var url =
    "https://newsapi.org/v2/everything?" +
    `q=${topics}&` +
    // "from=2022-12-07&" +
    "language=en&" +
    "sortBy=popularity&" +
    `apiKey=${NEWS_API_KEY}`;

  const response = await fetch(url).catch((e) => {
    console.error(e);
    res.send(e);
  });

  const data = await response.json();

  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
