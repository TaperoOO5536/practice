const express = require("express");
const fs = require("fs");
const needle = require("needle");
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

app.get("/api/:keyword/:url", async function (req, res) {
  const keyword = req.params.keyword;
  const url = req.params.url;
  const content = fs.readFileSync(filePath, "utf8");
  const keywords = JSON.parse(content);
  let urls = null;
  for (let i = 0; i < keywords.length; i++) {
    if (keywords[i].keyword == keyword) {
      urls = keywords[i].urls;
      break;
    }
  }
  // let page = (await axios.get(`${urls[url]}}`)).data;
  const response = await needle("get", urls[url]);
  const page = response.body;
  res.set({ "content-type": "application/json; charset=utf-8" });
  res.send(JSON.stringify(page));
});

app.listen(3000);
