const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session')
const mongo = require('mongodb').MongoClient;
const cors = require('cors')
require('dotenv').config();
const routes = require('./routes.js')
const auth = require('./auth.js')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/test1',(req, res)=>{
    res.json({tes:'hi'})
})

mongo.connect(process.env.DATABASE,{ useUnifiedTopology: true }, (err, client) => {
    var db = client.db
    if(err) {
        console.log('Database error: ' + err);
    } else {
        console.log('Successful database connection');

        auth(app, db);
      
        routes(app, db);


    app.listen(5000, ()=>console.log(`Server started on port 5000`))
}});