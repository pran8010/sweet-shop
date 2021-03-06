const session     = require('express-session');
const passport    = require('passport');
const ObjectID    = require('mongodb').ObjectID;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt      = require('bcrypt');
const cookieParser = require('cookie-parser')

module.exports = function (app,db) {
  
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
      db.collection('users').findOne(
          {_id: new ObjectID(id)},
          (err, doc) => {
              done(null, doc);
          }
      );
  });

  passport.use(new LocalStrategy({
    usernameField: 'email'
  },
    function(email, password, done) {
      console.log('try')
      db.collection('users').findOne({ email: email }, function (err, user) {
        console.log('User '+ email +' attempted to log in.');
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!bcrypt.compareSync(password, user.password)) { return done(null, false); }
        //if (password !== user.password) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
  
}