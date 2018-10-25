const commentsRouter = require('express').Router();
const { patchAndUpdateComment, sendAllComments, deleteTheComment } = require('../controllers/commentsController');

commentsRouter.patch('/:comment_id', patchAndUpdateComment)
commentsRouter.get('/', sendAllComments)
commentsRouter.delete('/:comment_id', deleteTheComment)

module.exports = commentsRouter;