const url           = require("url");
const querystring   = require('querystring');

//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

var passport    = require("passport");
//var users       = require("./../controllers/user.controller.server");


// 
var http = require("http");
/*
router.route("/login")
    .get(
      function(req, res, next){
        if(!req.user){
            res.render('login', {
                title:      "Log In",
                messages:   req.flash('error') || req.flash('info')
            });
        }else{
            return res.redirect('/');
        }
    })
    .post(passport.authenticate('local', {
        successRedirect:    '/',
        failureRedirect:    '/login',
        failureFlash:       true
    } ));
*/


router.post('/login', 
  passport.authenticate('local'),
  function(req, res) {
    var status = 202;
    res.status(status).end(http.STATUS_CODES[status]);
    //res.redirect('/');
});


/*
router.post("/login", function(req, res){
    passport.authenticate("local", function(err, user, info){
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }

      req.logIn(user, function(err) {
      if (err) { return next(err); }
      //return       res.status(202).end();
      var status = 202;
      res.status(status).end(http.STATUS_CODES[status]);
      //res.redirect('/users/' + user.username);
      });
    })//(req, res, next);
  }
)
*/


router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

/*
 router.get('/signup',
  function(req, res){
    res.render('signup', {
        title:      "Sign Up",
        messages:   req.flash('error') || req.flash('info')
    } );
  });

router.post("/signup",
  function(req, res){
    users.signup(req, res);
  });
*/

module.exports = router;

