const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// mongodb+srv://admin-sujit:0017@city.6yd7q.mongodb.net/cityInformation

mongoose.connect("mongodb://localhost:27017/CityDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const citySchema = {
  name: String ,
  population: Number,
  state: String,
  information: String,
  imageURL: String,
};

const City = mongoose.model("City", citySchema);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", (req, res) => {
  const newCity = new City({
    name: req.body.cityName,
    population: req.body.cityPopulation,
    state: req.body.stateName,
    information: req.body.description,
    imageURL: req.body.imageUrl,
  });
  newCity.save((err) => {
    if (!err) {
      res.send("Successfully added new City.");
    } else {
      res.send(err);
    }
  });
});

app.post("/city", (req, res) => {
  const enterCity = req.body.cityName;

  City.findOne(
    {
      name: enterCity,
    },
    (err, foundCity) => {
      if (foundCity) {
        console.log(foundCity);
        res.render("cityInfo", {
          foundCity: foundCity,
        });
      } else {
        res.send("No City matching that Name was found.");
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
