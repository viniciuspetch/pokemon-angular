const express = require("express");
const mongo = require("mongodb");
const bodyParser = require("body-parser");

const port = 8001;
const app = express();
const dburl = "mongodb://localhost:27017/pokemon_user";
var mongoClient = mongo.MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

signUp = function (req, res) {
  console.log("signUp");
  var username = req.body.username;
  var password = req.body.password;
  console.log(req.body.username);
  console.log(req.body.password);

  mongoClient
    .connect(dburl, { useUnifiedTopology: true })
    .then((db) => db.db().collection("users").insertOne({ username, password }))
    .then(() => {
      console.log("User created"), res.sendStatus(200);
    })
    .catch((err) => console.log(err));
};

login = function (req, res) {
  console.log("login");
  res.send("login");
};

app.post("/signup", signUp);
app.post("/login", login);

app.listen(port, () => console.log("Working at " + port));
