const Topic = require('../models/index')

exports.getArticleData = ({ articlesData, topicDocs, userDocs }) => {

  const userID = userDocs.find(user => {
    user.username === articlesData.created_by
    return user
  })

  return articlesData.map((article, index) => {

    return {
      ...article,
      votes: Math.floor(Math.random() * 100),
      belongs_to: article.topic,
      created_by: userID
    }
  })

  // console.log(articlesData)
}

exports.getCommentData = ({ userDocs, articleDocs, commentsData }) => {

  const userID = userDocs.find((user, index) => {
    user.username === commentsData[index].created_by
    return user
  })


  const articleID = userDocs.find(user => {
    console.log(user._id)
    user.username === articleDocs.created_by
    return user
  })

  return commentsData.map(comment => {
    return {
      ...comment,
      created_by: userID,
      belongs_to: articleID
    }
  })


  //const articleID = articleDocs.find()
}