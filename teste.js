//js para verificar a conexao com o mongo
const mongoose = require('mongoose');

mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});


// const mongoURI = 'mongodb://localhost:27017/test';
// const mongoURI = 'mongodb://user123:password123@ds125932.mlab.com:25932/dbtest';
const mongoURI = 'mongodb://teste:teste123@ds261302.mlab.com:61302/aprendendomern';

const db = mongoose.connect(mongoURI, { useNewUrlParser: true });