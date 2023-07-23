//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const app = express();
dotenv.config({path: "secrets.env"});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
    secret: "The coconut nut is a big big nut",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.URL+'secretsDB');

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
    done(null, user);
});
  
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.route("/")
    .get(async (req, res) => {
        res.render("home", {});
    });

app.route("/login")
    .get(async (req, res) => {
        res.render("login", {});
    })
    .post(async (req, res) => {
        const user = new User({
            email: req.body.username,
            password: req.body.password
        })

        req.login(user, function (err){
            if (err) {
                console.log(err);
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/secrets");
                });
            }
        });
    });

app.route("/register")
    .get(async (req, res) => {
        res.render("register", {});
    })
    .post(async (req, res) => {
        User.register({username: req.body.username}, req.body.password)
        .then(() => {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets");
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect("/register");
        });
    });

app.route("/secrets")
    .get(async (req, res) => {
        if (req.isAuthenticated()){
            res.render("secrets", {});
        } else {
            res.redirect("/login");
        }
    });

app.route("/logout")
    .get(async (req, res) => {
        req.logout(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    });

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });