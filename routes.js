const passport    = require('passport');
const bcrypt      = require('bcrypt');

module.exports = function (app, db) {
      
//   function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/');
//   };

app.get('/api/checkAuth', (req, res)=>{
  if (req.isAuthenticated()){
    res.send('yes')
  }
  else {
    res.send('no')
  }
})

  // app.route('/api/login')
  //   .post(
  //     passport.authenticate('local', { failureRedirect: 'http://localhost:3000/login' }),(req,res) => {
  //         // console.log('req')
  //        res.send('success');
  //   });

  app.post('/api/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      console.log(user)//
      if (err) { return next(err); }
      if (!user) { return res.send('noUser') }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send('success');
      });
    })(req, res, next);
  });

  // app.post('/api/login', function(req, res, next) {
  //   passport.authenticate('local', function(err, user, info) {
  //     console.log(err)
  //     console.log(user)
  //     console.log(info)
  //   })(req, res, next);
  // });

//   app.route('/profile')
//     .get(ensureAuthenticated, (req, res) => {
//          res.render(process.cwd() + '/views/pug/profile', {username: req.user.username});
//     });

  app.route('/api/register')
    .post((req, res, next) => {
        console.log(req.body)
        var hash = bcrypt.hashSync(req.body.password, 8);
        db.collection('users').findOne({ email: req.body.email }, function (err, user) {
            if(err) {
                next(err);
            } else if (user) {
                console.log('repeat')
                res.send('user already registered')
                // res.redirect('/home');
                return;
            } else {
                db.collection('users').insertOne(
                  {email: req.body.email,
                   password: hash},
                  (err, doc) => {
                      if(err) {
                          res.redirect('/home');
                      } else {
                          next(null, req.body);
                      }
                  }
                )
            }
        })},
      passport.authenticate('local', { failureRedirect: '/test1' }),
      (req, res, next) => {
          // res.redirect('/home');
      }
  );

  app.route('/api/logout')
    .get((req, res) => {
        req.logout();
        res.redirect('/home');
    });

  app.use((req, res, next) => {
    res.status(404)
      .type('text')
      .send('Not Found');
  });
  
}