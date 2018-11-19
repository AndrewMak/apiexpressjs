const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const produtoService = require('./produtoService')
const app = express();

//bodyparser Middleware
app.use(bodyParser.json());

// db config
const db = require('./keys').mongoURI;

// conectar ao mongodb
mongoose
  .connect(db, {useNewUrlParser: true}) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/produto', produtoService);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('sever started'))