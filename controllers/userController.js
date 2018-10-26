const { User } = require('../models');

exports.sendAllUsers = (req, res, next) => {
  User.find()
    .then(users => {
      if (!users.length) return res.send({ status: 404, msg: 'not found' })
      res.status(200).send({ users })
    })
    .catch(next)
}

exports.sendByName = (req, res, next) => {
  const usernamePR = req.params.username;
  User.find({ username: usernamePR })
    .then(username => {
      if (!username.length) return res.send({ status: 404, msg: 'topic not found' })
      res.status(200).send({ username })
    })
    .catch(next)
}