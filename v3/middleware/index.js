//ALL THE MIDDLE WARE GOES HERE//
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id)
      .then((foundCampground) => {
        // does the user own thge campground//
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        }
      })
      .catch((err) => {
        res.redirect("back");
      });
  } else {
    res.redirect("back");
  }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id)
      .then((foundComment) => {
        // does the user own thge campground//
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        }
      })
      .catch((err) => {
        res.redirect("back");
      });
  } else {
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please login first");
  res.redirect("/login");
};
module.exports = middlewareObj;
