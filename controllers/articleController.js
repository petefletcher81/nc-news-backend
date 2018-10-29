const { Article, Comment } = require('../models')

//200 = ok
//201 created
//404 not found
//400 bad request

exports.sendAllArticles = (req, res, next) => {
  Article.find()
    .populate('created_by')
    .populate('belongs_to')
    .then(articles => {
      if (!articles) return res.send({ status: 404 })
      res.status(200).send({ articles })
    })
    .catch(next)
}

exports.sendArticleById = (req, res, next) => {
  let articleID = req.params.article_id;
  Article.findById(articleID)
    .populate('created_by')
    .populate('belongs_to')
    .then(returnedArticle => {
      if (!returnedArticle) return res.send({ status: 404, msg: 'not found' })
      res.send({ returnedArticle })

    })
    .catch(next)

}

exports.createNewComment = (req, res, next) => {
  Comment.create(req.body)
    .then(createdComment => {
      if (!createdComment) return res.send({ status: 400, msg: 'bad request' })
      res.status(201).send({ createdComment, msg: 'Created!' })
    })
    .catch(console.log)

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
    .populate('belongs_to')
    .then(updatedArticle => {
      if (!updatedArticle) return res.send({ status: 404, msg: 'comment not found' })
      res.send({ updatedArticle })
    })
    .catch(next)
}


