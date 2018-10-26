const { Article, Comment } = require('../models')

//200 = ok
//201 created
//404 not found
//400 bad request

exports.sendAllArticles = (req, res, next) => {
  Article.find()
    .then(articles => {
      if (!articles) return res.send({ status: 404 })
      res.status(200).send({ articles })
    })
    .catch(next)
}

exports.sendArticleById = (req, res, next) => {
  let articleID = req.params.article_id;
  Article.findById(articleID)
    .then(returnedArticle => {
      // if (!returnedArticle) return res.send({ status: 404, msg: 'article not found' })
      res.send({ returnedArticle })

    })
    .catch(console.log)

}

exports.createNewComment = (req, res, next) => {
  Comment.create(req.body)
    .then(createdComment => {
      if (!returnedArticle) return res.send({ status: 400, msg: 'bad request' })
      res.status(201).send({ createdComment })
    })
    .catch(next)

}

exports.sendCommentForArt = (req, res, next) => {
  console.log(req.params.article_id);

  Comment.find({ belongs_to: req.params.article_id })
    .then(comments => {
      console.log(comments)
      if (!comments) return res.send({ status: 404, msg: 'comment not found' })
      res.status(200).send({ comments })
    })
    .catch(next)
}

exports.editAndUpdate = (req, res, next) => {

  let votes = req.query.vote === 'up' ? 1 : req.query.vote === 'down' ? -1 : 0;

  Article.findByIdAndUpdate(req.params.article_id, { $inc: { votes: votes } }, { new: true })
    .then(updatedArticle => {
      if (!updatedArticle) return res.send({ status: 404, msg: 'comment not found' })
      res.send({ updatedArticle })
    })
    .catch(next)
}


