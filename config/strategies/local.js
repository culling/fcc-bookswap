var passport        =   require('passport');
var LocalStrategy   =   require('passport-local').Strategy;
var mongo           =   require("./../mongo");
//var User            =   mongo.users ;

var User            =   mongo.users.UserModel;

module.exports = function(){
    passport.use (new LocalStrategy(function (username, password, done){
        User.findOne({
            username:   username
        }, function(err, user){
            if (err){
                return done(err);
            }

            if(!user){
                return done (null, false, {
                    message:    'Unknown user'
                });
            }

                if(!user.authenticate(password)){
                return done(null, false, {
                    message:    'Invalid password'
                });
            }

        return done(null, user);
        });
    }));
};


/*var passport        =   require('passport');
var LocalStrategy   =   require('passport-local').Strategy;
var mongo           =   require("./../mongo");

module.exports = function(){
    passport.use(new LocalStrategy(
    function(username, password, cb) {
        console.log("local strategy called");
        mongo.users.findByUsername(username, function(err, user) {
        console.log(user);
        if (err) {
            return cb(err);
        }
        if (!user) {
            return cb(null, false, { message: 'Incorrect username.' });
        }
        if (user.password != password) {
            return cb(null, false,  { message: 'Incorrect Password.' });
        }

        return cb(null, user);
        });
    }));
};
*/