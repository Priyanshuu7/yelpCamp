var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user");

//require routes//
var commentRoutes = require("./routes/comments");
var campgroundsRoutes = require("./routes/campgrounds");
var authRoutes = require("./routes/auth");

//connecting database here//
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//CALLING THE SEED FUNCTION//
//seedDB();

//PASSPORT CONFIGURTION//
app.use(
  require("express-session")({
    secret: "Once again rusty wins the cutest dog!",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//extratxing the currently logged in user//
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", authRoutes);

// TO START THE SERVER//
app.listen(5000, function () {
  console.log("The YelpCamp server has started");
});
