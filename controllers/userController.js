const { User } = require('../models');

exports.sendAllUsers = (req, res, next) => {
  User.find()
    .then(users => res.status(200).send({ users }))
    .catch(console.log)
}

exports.sendByName = (req, res, next) => {
  const usernamePR = req.params.username;
  User.find({ username: usernamePR })
    .then(username => res.status(200).send({ username }))
    .catch(console.log)
}