const express = require('express');
const app = express()

app.get('/test1',(req, res)=>{
    res.json({tes:'hi'})
})



app.listen(5000, ()=>console.log(`Server started on port 5000`))
