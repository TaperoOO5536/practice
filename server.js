const express = require("express");
const fs = require("fs");
const { url } = require("inspector");

const app = express();
const jsonParser = express.json();

const filePath = "keywords.json";

app.use(express.static(__dirname + "/static"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/static/index.html");
});

app.get("/api/keywords", function (req, res) {
  const content = fs.readFileSync(filePath, "utf8");
  const keywords = JSON.parse(content);
  res.send(keywords);
});

app.get("/api/keywords/:keyword", function (req, res) {
  const keyword = req.params.keyword;
  const content = fs.readFileSync(filePath, "utf8");
  const keywords = JSON.parse(content);
  let urls = null;
  for (let i = 0; i < keywords.length; i++) {
    if (keywords[i].keyword == keyword) {
      urls = keywords[i].urls;
      break;
    }
  }
  console.log(urls);
  if (urls) {
    res.send(urls);
  } else {
    res.status(404).send("Ключевое слово не найдено");
  }
});

app.listen(3000);
