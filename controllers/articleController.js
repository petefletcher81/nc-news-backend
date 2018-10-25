const { Article, Comment } = require('../models')

exports.sendAllArticles = (req, res, next) => {
  Article.find()
    .then(articles => res.status(200).send({ articles }))
    .catch(console.log)
}

exports.sendArticleById = (req, res, next) => {
  let articleID = req.params.article_id;
  Article.findById(articleID, (err, returnedArticle) => {
    //refactor 
    //if(!article) return Promise.reject({status: 404, msg: 'article not found})
    //else res.send
    if (err) {
      console.log(err)
    } else {
      res.send({ returnedArticle })
    }
  })
}

exports.createNewComment = (req, res, next) => {
  Comment.create(req.body)
    .then(createdComment => res.status(201).send({ createdComment }))
    .catch(console.log)

}

exports.sendCommentForArt = (req, res, next) => {
  console.log(req.params.article_id);

  Comment.find({ belongs_to: req.params.article_id })
    .then(comments => res.status(200).send({ comments }))
    .catch(console.log)
}

exports.editAndUpdate = (req, res, next) => {

  let votes = req.query.vote === 'up' ? 1 : req.query.vote === 'down' ? -1 : 0;

  Article.findByIdAndUpdate(req.params.article_id, { $inc: { votes: votes } }, { new: true })
    .then(updatedArticle => {
      console.log(updatedArticle)
      res.send({ updatedArticle })
    })
}


