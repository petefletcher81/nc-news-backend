
const mongoose = require('mongoose');
const { DB_URL } = require('../config/config.js');
const seedDB = require('../seed/seed')
const topicData = require('../seed/devData/topics.json')
const usersData = require('../seed/devData/users.json')
const commentsData = require('../seed/devData/comments.json')
const articlesData = require('../seed/devData/articles.json')

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => console.log('we are connected....'))
  .then(() => {
    return seedDB({ topicData, usersData, commentsData, articlesData })
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .catch(console.log)
