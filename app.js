//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
                    bcrypt.compare(password, user.password)
                        .then(result => {
                            if (result){
                                res.render("secrets");
                            }
                        })
                        .catch(error => console.error(error));
                }
            })
            .catch(err => console.log(err));
    });

app.route("/register")
    .get(async (req, res) => {
        res.render("register", {});
    })
    .post(async (req, res) => {
        bcrypt.hash(req.body.password, saltRounds)
            .then(hash => {
                const user = new User({
                    email: req.body.username,
                    password: hash
                });
        
                user.save()
                    .then(() => res.render("secrets"))
                    .catch(err => console.log(err));
            });
    });


app.listen(3000, function() {
    console.log("Server started on port 3000");
  });