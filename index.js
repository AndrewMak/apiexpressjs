const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const produtoService = require('./produtoService')
const usuarioService = require('./usuarioService')


const app = express();
var cors = require('cors');


//bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
//middleware de acors
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
}
app.use(allowCrossDomain)



// db config
const db = require('./keys').mongoURI;

// conectar ao mongodb
mongoose
  .connect(db, {useNewUrlParser: true}) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/produto', produtoService);
app.use('/api/usuario', usuarioService);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(('api server listening on port ' + port)))