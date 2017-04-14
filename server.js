var express = require('express');
var userCtrl = require('./userCtrl.js');
var bodyParser = require('body-parser')
const port = 8080

var app = express();

app.use(bodyParser.json());

app.get('/api/users', function (req, res, next) {
  var users = userCtrl.readAll()
  var returner;
  if(req.query.favorites) {
    returner = userCtrl.getUsersByFavorite(req.query.favorites)
  } else if (req.query.age) {
    returner = userCtrl.getUsersByAgeLimit(req.query.age)
  } else if (req.query.lastname) {
    returner = userCtrl.findUserByQuery('last_name', req.query.lastname)
  } else if (req.query.email) {
    returner = userCtrl.findUserByQuery('email', req.query.email)
  } else {
    returner = users
  }
  res.status(200).send(returner)
})

app.get('/api/users/:id', function (req, res, next) {
  var user = userCtrl.findUserById(req.params.id)
  if (!user) {
    res.status(404).send();
  } else {
    res.status(200).send(user)
  }
})

app.get('/api/admins', function (req, res, next) {
  var users = userCtrl.getAdmins()
  res.status(200).send(users)
})

app.get('/api/nonadmins', function (req, res, next) {
  var users = userCtrl.getNonAdmins()
  res.status(200).send(users)
})


app.put('/api/users/:id', function (req, res, next) {
  var user = userCtrl.updateUser(req.params.id, req.body)
  res.status(200).send(user);
})

app.post('/api/users', function (req, res, next) {
  var user = userCtrl.createUser(req.body)
  res.status(200).send(user);
})

app.delete('/api/users/:id', function (req, res, next) {
  var user = userCtrl.removeUser(req.params.id)
  res.status(200).send(user);
})









app.listen(port, function () {
  console.log('LISTENING>>>>>>>>>>>>>>>>>>');
})

module.exports = app
