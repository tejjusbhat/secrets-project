//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var encrypt = require("mongoose-encryption");

const app = express();
dotenv.config({path: "secrets.env"});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(process.env.URL+'secretsDB');

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const encryption_key = process.env.KEY;
userSchema.plugin(encrypt, {secret: encryption_key, encryptedFields: ["password"]});

const User = mongoose.model("User", userSchema);

app.route("/")
    .get(async (req, res) => {
        res.render("home", {});
    });

app.route("/login")
    .get(async (req, res) => {
        res.render("login", {});
    })
    .post(async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        User.findOne({email: username}).exec()
            .then(user => {
                if (user) {
                    if (user.password === password){
                        res.render("secrets");
                    }
                }
            })
            .catch(err => console.log(err));
    });

app.route("/register")
    .get(async (req, res) => {
        res.render("register", {});
    })
    .post(async (req, res) => {
        const user = new User({
            email: req.body.username,
            password: req.body.password
        });

        user.save()
            .then(() => res.render("secrets"))
            .catch(err => console.log(err));
    });


app.listen(3000, function() {
    console.log("Server started on port 3000");
  });