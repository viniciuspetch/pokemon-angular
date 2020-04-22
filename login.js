const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const port = 8001;
const app = express();
const dburl = "mongodb://localhost:27017";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

signUp = function (req, res) {
  console.log("signUp");
  var username = req.body.username;
  var password = req.body.password;
  var hash = bcrypt.hashSync(password, 5);

  const client = new MongoClient(dburl, { useUnifiedTopology: true });
  client
    .connect()
    .then((client) =>
      client
        .db("pokemon_user")
        .collection("users")
        .insertOne({ username, hash })
    )
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => console.log(err))
    .finally(() => client.close());
};

login = function (req, res) {
  console.log("login");
  var username = req.body.username;
  var password = req.body.password;

  const client = new MongoClient(dburl, { useUnifiedTopology: true });
  client
    .connect()
    .then((client) =>
      client
        .db("pokemon_user")
        .collection("users")
        .findOne({ username: username })
    )
    .then((docs) => {
      if (docs.hash && bcrypt.compareSync(password, docs.hash)) {
        console.log("Correct input");
        res.json({ token: jwt.sign({ username }, "pokemon") });
      } else {
        console.log("Wrong input");
        res.json({ token: "" });
      }
    })
    .catch((err) => console.log(err))
    .finally(() => client.close());
};

app.post("/signup", signUp);
app.post("/login", login);

app.listen(port, () => console.log("Working at " + port));
