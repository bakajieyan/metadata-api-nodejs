const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express()
  .set("port", 3002)
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs");

// Static public files
app.use(express.static(path.join(__dirname, "public")));

const leaderboards = [];

app.get("/leaderboards", async function (req, res) {
  let proxy = "https://bpos-cors.herokuapp.com/";
  let url = "https://bpos-api.herokuapp.com/api/token/";
  let supply = "https://bpos-api.herokuapp.com/leaderboards";
  await axios
    .get(proxy + url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => {
      const temp = res.data;

      temp.sort((a, b) => b.score - a.score);
      setLeaderboards(temp);
      setLoading(false);
    });
});

app.post("/leaderboards", async function (req, res) {
  // log request body
  console.log(req.body);
});

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});
