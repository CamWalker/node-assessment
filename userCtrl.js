var export1 = module.exports = {};
var users = require('./users.js')

export1.readAll = function () {
  return users.find()
}

export1.findUserById = function (userId) {
  var person = users.findOne('id', userId);
  return (person) ? person : null;
}

export1.getAdmins = function () {
  var people = users.find('type', 'admin');
  return (people) ? people : null;
}

export1.getNonAdmins = function () {
  var people = users.find('type', 'user');
  return (people) ? people : null;
}

export1.getUsersByFavorite = function (favorite) {
  var people = users.find();
  people = people.filter(v => v.favorites.indexOf(favorite) > -1)
  return (people) ? people : null;
}


export1.getUsersByAgeLimit = function (age) {
  var people = []
  while (age > 0) {
    var peeps = users.find('age', age)
    if(peeps) {
      people = people.concat(peeps);
    }
    age--
  }
  if (people[0]) {
    return people;
  } else {
    return null;
  }
}

export1.findUserByQuery = function (term, value) {
  if(term) {
    term = term.toLowerCase()
  }
  if(value) {
    value = value.toLowerCase()
  }
  switch (term) {
    case 'last_name':
      if (value) {
        value = value[0].toUpperCase() + value.slice(1)
      }
      return users.find('last_name', value) ? users.find('last_name', value) : null;
      break;
    case 'email':
      return users.find('email', value) ? users.find('email', value) : null;
      break;
    case 'state':
      if (value) {
        value = value[0].toUpperCase() + value.slice(1)
      }
      return users.find('state', value) ? users.find('state', value) : null;
      break;
  }
}

export1.createUser = function (newUser) {
  var answer = users.add(newUser);
  if (answer) {
    return answer;
  } else {
    return null;
  }

}

export1.updateUser = function (userId, propertiesToChange) {
  var person = users.update('id', userId, propertiesToChange);
  return person;
}

export1.removeUser = function (userId) {
  var person = users.remove('id', userId)
  return person;
}
