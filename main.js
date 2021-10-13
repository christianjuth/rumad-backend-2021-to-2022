const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.urlencoded({extended: true}));
// app.use(express.json())

let edits = 0
let msg = "blank";
 
app.post('/tweet', function (req, res) {
  const newMsg = req.body.msg
  msg = newMsg
  edits++
  res.send('updated msg');
})

app.get('/tweet', function (req, res) {
  res.send({
    msg,
    edits
  });
})
 
app.listen(3000);