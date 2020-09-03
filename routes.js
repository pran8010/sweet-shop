const passport    = require('passport');
const bcrypt      = require('bcrypt');
const fileUpload = require('express-fileupload');
const ObjectID = require('mongodb').ObjectID

module.exports = function (app, db) {
      
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else res.send('Not Logged In')
  };

  function ensureAdmin(req, res, next){
    if (req.user.email === 'admin777@sweetShop.admn'){
      req.type = 'ADMIN'
      return next()
    }
    else{
      db.collection('supplier').findOne({email: req.user.email}, (err, doc)=>{
        if (err) return res.send('Error')
        else if (!doc){
          console.log('NOT AN ADMIN')
          return res.send('Not an admin')
        }
        else{
          console.log('SUPPLIER')
          req.type = 'SUPPLIER'
          req.supplier = doc
          return next()
        }
      })
    }
  }

app.get('/api/checkAuth', (req, res)=>{
  if (req.isAuthenticated()){
    res.send('yes')
  }
  else {
    res.send('no')
  }
})

app.get('/api/test2',ensureAuthenticated,(req, res)=>{
  console.log(req.user)
  res.json(req.user)
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
                          res.send('Error');
                      } else {
                          next()
                      }
                  }
                )
            }
        })},
      passport.authenticate('local'),
      (req, res, next) => {
        res.send('success')
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
  

  app.get('/api/admin/checkIfAdmin', ensureAuthenticated, ensureAdmin, (req, res)=>{
    console.log('type: ', req.type)
    if (req.type==='SUPPLIER') res.send('SUPPLIER')
    else res.send('ADMIN')
  })

  app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/img/'
  }));
  app.post('/admin/api/addItems',ensureAuthenticated, ensureAdmin, (req, res) => {

    if (req.files === null) return res.send('no file')
    const img = req.files.image
    img.mv(`${__dirname}/client/public/uploads/${req.body.name}.jpg`, (err)=>{
      if(err) return res.send('serverERR')
    })

    let sweet = req.body
    console.log(sweet)

    let supplier
    if (req.type ==='SUPPLIER'){
      supplier = req.supplier.name
    }
    else supplier = sweet.supplier

    db.collection('sweets').findOne({ name: sweet.name, supplier }, function (err, doc) {
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
            { ...sweet, supplier },
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

  app.post('/admin/api/updateItems',ensureAuthenticated, ensureAdmin, (req, res) => {

    if (req.files !== null) {
      const img = req.files.image
      img.mv(`${__dirname}/client/public/uploads/${req.body.name}.jpg`, (err)=>{
        if(err) return res.send('serverERR')
      })
    }

    let sweet = req.body
    console.log(sweet)

    let supplier
    if (req.type ==='SUPPLIER'){
      supplier = req.supplier.name
    }
    else supplier = sweet.supplier

    db.collection('sweets').findOne({ name: sweet.name, supplier }, function (err, doc) {
        if(err) {
            next(err);
        } else if (!doc) {
            console.log('repeat')
            res.send('Sweet does not exist try unchecking update option')
            // res.redirect('/home');
            return;
        } else {
          var quantity = sweet.quantity ? parseFloat(sweet.quantity) : 0.0
          delete sweet.quantity
          db.collection('sweets').findOneAndUpdate({ name: sweet.name, supplier: sweet.supplier },
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

  app.get('/api/admin/deleteProduct/:ID', ensureAuthenticated, ensureAdmin, (req, res)=>{
    var ID = new ObjectID(req.params.ID)
    let query;
    if (req.type==='SUPPLIER') query = { _id: ID, supplier: req.supplier.name }
    else query = { _id: ID }
    db.collection('sweets').deleteOne(query, (err, doc)=>{
      if (err) return res.send(err)
      console.log(doc)
      if ( doc.deletedCount === 0 ) res.send('Please use correct product ID')
      else return res.send('Success')
    })
  })


  app.get('/api/admin/suppliers',ensureAuthenticated, ensureAdmin, (req, res)=>{
    db.collection('supplier').find({}).project({name: 1}).toArray().then((docs)=>{
      res.json(docs)
    }).catch((err)=> res.send(err))
  })

  app.post('/api/admin/addSupplier',ensureAuthenticated, ensureAdmin, (req, res)=>{
    let sup = req.body
    db.collection('supplier').findOne({email: sup.email},(err, doc)=>{
      if (err) res.send(err)
      else if (doc) res.send('Supplier already exists')
      else {
        db.collection('supplier').insertOne(sup, (err, doc)=>{
          if (err) res.send(err)
          else res.send('Success')
        })
      }
    })
  })


  app.post('/api/supplier/address', ensureAuthenticated, ensureAdmin, (req, res)=>{
    var address = req.body
    db.collection('supplier').findOneAndUpdate({email: req.user.email}, {
      $set: { address, name: address.name }
    }, { new: true }, (err, doc)=>{
      if (err) res.error(err)
      else res.send('Success')
    })
  })

  app.get('/api/supplier/address', ensureAuthenticated, ensureAdmin, (req, res)=>{
    db.collection('supplier').findOne({email: req.user.email}, (err, doc)=>{
      if (err) res.send('Error')
      else if (!doc) res.send('no address')
      else res.json(doc.address)
    })
  })


  // --------------- catalogue mangement ------------------

  app.get('/api/catalogue/:type', (req,res)=>{
    db.collection('sweets').find({type: req.params.type}).toArray().then((docs)=>{
      console.log(docs)
      res.json(docs)
    })
  })

  app.get('/api/display/:type', (req, res)=>{
    db.collection('sweets').find({type: req.params.type}).limit(4).toArray()
    .then(docs =>{
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

  app.get('/api/users/removeCart/:ID' ,ensureAuthenticated, (req, res)=>{
    var user = req.user
    var ID = req.params.ID
    // console.log(ID)
    db.collection('users').findOneAndUpdate({ email: user.email, 'cart.prod_id': ID }, {
      $pull: { 'cart': { prod_id: ID } }
    }, { new: true }, (err, doc)=>{
      if (err) {
        console.log(err)
        return res.send(err)
      }
      else{
        console.log(doc.cart)
        res.send('Success')
      }
    })
  })

  app.get('/api/users/cart', ensureAuthenticated, (req, res, next)=>{
    var user = req.user
    res.json(user.cart)
    // db.collection('users').findOne(user,(err,doc)=>{
    //   if (err) return res.send('Error')
    //   else{
    //     console.log(doc.cart)
    //     return res.json(doc.cart)
    //   }
    // })
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

  app.get('/api/users/cartCheck/:ID', ensureAuthenticated, (req, res)=>{
    let ID = req.params.ID
    let avail = req.user.cart.find(({ prod_id }) => prod_id === ID )
    if (avail) return res.send('Found')
    else return res.send('Nope')
  })

  // ------------------- cart mgmt ----------------------

  app.post('/api/users/address', ensureAuthenticated, (req, res)=>{
    var address = req.body
    var user = req.user
    db.collection('users').findOneAndUpdate(user,{
      $set: {address}
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
    })
  })

  app.get('/api/users/address', ensureAuthenticated, (req, res)=>{
    var user = req.user
    // db.collection('users').findOne(user, (err, doc)=>{
    //   if(err) return res.send('Error')
    //   else if (!doc.address) return res.send('no address')
    //   else return res.json(doc.address)
    // })
    if (!user.address) return res.send('no address')
    return res.json(user.address)
  })

// ------------------- listening port ---------------------

  app.use((req, res, next) => {
    res.status(404)
      .type('text')
      .send('Not Found');
  });
  
}