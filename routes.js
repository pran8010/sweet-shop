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

  app.route('/api/login')
    .post(passport.authenticate('local', { failureRedirect: '/login' }),(req,res) => {
         res.redirect('/');
    });

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
                          res.redirect('/');
                      } else {
                          next(null, user);
                      }
                  }
                )
            }
        })},
      passport.authenticate('local', { failureRedirect: '/' }),
      (req, res, next) => {
          res.redirect('/');
      }
  );

  app.route('/api/logout')
    .get((req, res) => {
        req.logout();
        res.redirect('/');
    });

  app.use((req, res, next) => {
    res.status(404)
      .type('text')
      .send('Not Found');
  });
  
}