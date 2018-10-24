const mongoose = require('mongoose');
const { Topic, User, Article, Comment } = require('../models/index');
const { getArticleData, getCommentData } = require('../utils/index')

const seedDB = ({ topicData, usersData, commentsData, articlesData }) => {
  return mongoose.connection.dropDatabase()
    .then(() => {

      return Promise.all([Topic.insertMany(topicData), User.insertMany(usersData)])
    })
    .then(([topicDocs, userDocs]) => {

      const articleDocs = getArticleData({ articlesData, topicDocs, userDocs })

      Array.from(articleDocs)
      return Promise.all([userDocs, Article.insertMany(articleDocs), commentsData])
    })
    .then(([userDocs, articleDocs, commentsData]) => {
      const commentsDocs = getCommentData({ userDocs, articleDocs, commentsData })
      Array.from(commentsDocs)
      return Comment.insertMany(commentsDocs)
    }

    )

}

module.exports = seedDB;