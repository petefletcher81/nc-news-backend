const Topic = require('../models/index')

exports.getArticleData = ({ articlesData, topicDocs, userDocs }) => {

  //console.log(articlesData)

  return articlesData.map((article, index) => {
    const userID = userDocs.find(user => {
      return user.username === article.created_by
    })._id

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

  return commentsData.map(comment => {
    const userID = userDocs.find((user) => {
      return user.username === comment.created_by
    })._id
    //console.log(userID)


    const articleID = articleDocs.find((article) => {
      //console.log(commentsData)
      //console.log(article._id)
      return comment.belongs_to === article.title
    })._id

    //console.log(articleID)

    return {
      ...comment,
      created_by: userID,
      belongs_to: articleID
    }
  })


  //const articleID = articleDocs.find()
}