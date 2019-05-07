const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Usuario Model

const Usuario = require('./usuario')

const secretKey = require('./keys').secretKey;

router.post('/register', function (req, res) {
  const newUsuario = new Usuario({
    name: req.body.name,
    email: req.body.email,
    user_pass: bcrypt.hashSync(req.body.user_pass, 8),
  });

  newUsuario.save().then(function (Usuario) {
    let token = jwt.sign({
      id: Usuario._id
    }, secretKey, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({
      auth: true,
      token: token,
      user: Usuario
    });
  });
});

router.post('/register-admin', function (req, res) {
  const newUsuario = new Usuario({
    name: req.body.name,
    email: req.body.email,
    user_pass: bcrypt.hashSync(req.body.user_pass, 8),
    is_admin: req.body.is_admin
  });

  newUsuario.save().then(function (Usuario) {
    let token = jwt.sign({
      id: Usuario._id
    }, secretKey, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({
      auth: true,
      token: token,
      user: Usuario
    });
  });
});

router.get('/me', function (req, res) {
  let token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({
    auth: false,
    message: 'No token provided.'
  });

  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) return res.status(500).send({
      auth: false,
      message: 'Failed to authenticate token.'
    });

    res.status(200).send(decoded);
  });
});

router.post('/login', (req, res) => {
  Usuario.findOne({ email: req.body.email})
    .then(function (usuario) {
    if (!usuario) return res.status(404).send('No user found.');
    let passwordIsValid = bcrypt.compareSync(req.body.password, usuario.user_pass);
    if (!passwordIsValid) return res.status(401).send({
      auth: false,
      token: null
    });
    let token = jwt.sign({
      id: usuario._id
    }, secretKey, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({
      auth: true,
      token: token,
      user: usuario
    });
    });
})
module.exports = router;