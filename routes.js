const passport    = require('passport');
const bcrypt      = require('bcrypt');
const fileUpload = require('express-fileupload');
const ObjectID = require('mongodb').ObjectID

module.exports = function (app, db) {
      
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send('Not Logged In')
  };

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
                  {
                    email: req.body.email,
                    password: hash,
                    cart: [],
                    orders:[]
                  },
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
        console.log('logged out')
        res.send('out');
    });


  // -------------------------- ADMIN acesss Only --------------------------

  app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/img/'
  }));

  app.post('/admin/api/addItems', (req, res) => {
    if (req.files === null) return res.send('no file')
    const img = req.files.image
    img.mv(`${__dirname}/client/public/uploads/${req.body.name}.jpg`, (err)=>{
      if(err) return res.send('serverERR')
    })

    let sweet = req.body
    console.log(sweet)

    db.collection('sweets').findOne({ name: sweet.name, branch: sweet.branch }, function (err, doc) {
        if(err) {
            next(err);
        } else if (doc) {
            console.log('repeat')
            res.send('Sweet already available try updating')
            // res.redirect('/home');
            return;
        } else {
          sweet.quantity = parseFloat(sweet.quantity)
          db.collection('sweets').insertOne(
            sweet,
            (err, doc) => {
                if(err) {
                    res.send('error');
                } else {
                    res.send('success');
                }
            }
          )
      }
    })
  })

  app.post('/admin/api/updateItems', (req, res) => {
    if (req.files !== null) {
      const img = req.files.image
      img.mv(`${__dirname}/client/public/uploads/${req.body.name}.jpg`, (err)=>{
        if(err) return res.send('serverERR')
      })
    }

    let sweet = req.body
    console.log(sweet)

    db.collection('sweets').findOne({ name: sweet.name, branch: sweet.branch }, function (err, doc) {
        if(err) {
            next(err);
        } else if (!doc) {
            console.log('repeat')
            res.send('Sweet does not exist try unchecking update option')
            // res.redirect('/home');
            return;
        } else {
          var quantity = parseFloat(sweet.quantity)
          delete sweet.quantity
          db.collection('sweets').findOneAndUpdate({ name: sweet.name, branch: sweet.branch },
            {
              $inc: { quantity: quantity},
              $set: {... sweet}
            },
            { new: true },(err, doc)=>{
            if(err) {
              res.send('Error')
              console.log(err)
            }
            else res.send('Update success')
          })
        }
    })
  })


  // --------------- catalogue mangement ------------------

  app.get('/api/catalogue', (req,res)=>{
    db.collection('sweets').find().toArray().then((docs)=>{
      console.log(docs)
      res.json(docs)
    })
  })

  app.post('/api/user/addCart', ensureAuthenticated, (req, res)=>{
    var user = req.user
    var obj = req.body
    // console.log(req.user)
    console.log(obj)
    db.collection('users').findOneAndUpdate(user,{
      $push: { cart: obj }
    },
    { new: true }, (err, doc)=>{
      if(err) {
        res.send('Error')
        console.log(err)
      }
      else{
        res.send('Success')
        console.log(doc)
      }
    } )

  })

  app.get('/api/users/cart', ensureAuthenticated, (req, res, next)=>{
    var user = req.user
    db.collection('users').findOne(user,(err,doc)=>{
      if (err) return res.send('Error')
      else{
        console.log(doc.cart)
        return res.json(doc.cart)
      }
    })
  })

  app.get('/api/getSweet/:ID', (req, res)=>{
    var ID =  new ObjectID(req.params.ID)
    db.collection('sweets').findOne({_id: ID}, (err, doc)=>{
      if(err) return res.send('Error')
      else{
        return res.json(doc)
      }
    })
  })

// ------------------- listening port ---------------------

  app.use((req, res, next) => {
    res.status(404)
      .type('text')
      .send('Not Found');
  });
  
}