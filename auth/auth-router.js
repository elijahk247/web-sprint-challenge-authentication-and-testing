const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const Users = require('../users/user-model.js');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = brcypt.hasySync(user.password, 10);

  user.password = hash;

  Users.add(user)
    .then(newUser => {
      res.status(201).json({ data: newUser });
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not add new user' });
    })
});

router.post('/login', (req, res) => {
  // implement login
  let data = res.body;

  Users.findBy(data.username)
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(data.password, user.password)) {
        res.status(200).json({ message: 'Successfully logged in', token });
      } else {
        res.status(401).json({ message: 'invalid credentials' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not authenticate login' });
    })
});

function generateTOken(user) {
  const payload = {
    subject: user.id, 
    username: user.username,
    
  }
}

module.exports = router;
