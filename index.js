const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");
const config = require('./config/key')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect( config.mongoURI , {})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('새해복!111')
})


app.post('/register',(req,res) => {
    const user = new User(req.body)

    //mongoDB 메서드, user모델에 저장
    const result = user.save().then(()=>{
        res.status(200).json({
        success: true
        })
    }).catch((err)=>{
        res.json({ success: false, err })
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})