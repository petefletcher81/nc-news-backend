const { Article, Comment } = require('../models')

//200 = ok
//201 created
//404 not found
//400 bad request

// function commentCounts(article) {

//   Comment.countDocuments({ belongs_to: article._id })
//     .then(count => {
//       //console.log(count)
//       return count
//     })
//     .catch(console.log)
// }

exports.sendAllArticles = (req, res, next) => {

  return Article.find()
    .populate('created_by')
    .lean()
    .then(articleDocs => {
      const count = articleDocs.map(art => {
        return Comment.count({ belongs_to: art._id })
      })
      return Promise.all([articleDocs, ...count])
    })
    .then(([articleDocs, ...comments]) => {

      const newArticles = articleDocs.map((art, index) => {
        return {
          ...art,
          comment_count: comments[index]
        }
      })
      if (!newArticles) return res.send({ status: 404 })
      res.status(200).send({ newArticles })
    })
    .catch(next)
}

exports.sendArticleById = (req, res, next) => {
  let articleID = req.params.article_id;

  Article.findById(articleID)
    .populate('created_by')
    .then(returnedArticle => {
      const count = Comment.count({ belongs_to: returnedArticle._id })
      return Promise.all([returnedArticle, count])
    })
    .then(([article, count]) => {
      const searchedArticle = {
        article,
        comment_count: count
      }
      //console.log(searchedArticle)
      if (!searchedArticle) return res.send({ status: 404, msg: 'not found' })
      res.send({ searchedArticle })
    })

    // })
    .catch(next)

}

exports.createNewComment = (req, res, next) => {
  Comment.create(req.body)
    .then(createdComment => {
      if (!createdComment) return res.send({ status: 400, msg: 'bad request' })
      res.status(201).send({ createdComment, msg: 'Created!' })
    })
    .catch(next)

}

exports.sendCommentForArt = (req, res, next) => {


  Comment.find({ belongs_to: req.params.article_id })
    .populate('created_by')
    .populate('belongs_to')
    .then(comments => {

      if (!comments) return res.send({ status: 404, msg: 'comment not found' })
      res.status(200).send({ comments })
    })
    .catch(next)
}

exports.editAndUpdate = (req, res, next) => {

  let votes = req.query.vote === 'up' ? 1 : req.query.vote === 'down' ? -1 : 0;

  Article.findByIdAndUpdate(req.params.article_id, { $inc: { votes: votes } }, { new: true })
    .populate('created_by')
    .then(updatedArticle => {
      const count = Comment.count({ belongs_to: updatedArticle._id })
      return Promise.all([updatedArticle, count])
    })
    .then(([article, count]) => {
      const searchedArticle = {
        article,
        comment_count: count
      }
      //console.log(searchedArticle)
      if (!searchedArticle) return res.send({ status: 404, msg: 'not found' })
      res.send({ searchedArticle })
    })
    .catch(next)
}


