const { Comment } = require('../models')

exports.patchAndUpdateComment = (req, res, next) => {

  let votes = req.query.vote === 'up' ? 1 : req.query.vote === 'down' ? -1 : 0;

  Comment.findByIdAndUpdate(req.params.comment_id, { $inc: { votes: votes } }, { new: true })
    .then(updatedComment => {
      res.send({ updatedComment })
    })
}

exports.sendAllComments = (req, res, next) => {
  Comment.find()
    .then(comments => res.status(200).send({ comments }))
    .catch(console.log)
}

exports.deleteTheComment = (req, res, next) => {
  Comment.findByIdAndRemove(req.params.comment_id)
    .then(deletedComment => {
      res.send({ deletedComment, msg: 'Comment Deleted' })
    })
}