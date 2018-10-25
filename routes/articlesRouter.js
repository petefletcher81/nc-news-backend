const articlesRouter = require('express').Router();
const { sendAllArticles, sendArticleById, sendCommentForArt, createNewComment, editAndUpdate } = require('../controllers/articleController');

articlesRouter.get('/', sendAllArticles)
articlesRouter.get('/:article_id', sendArticleById)
articlesRouter.post('/:article_id/comments', createNewComment)
articlesRouter.get('/:article_id/comments', sendCommentForArt)
articlesRouter.patch('/:article_id', editAndUpdate)

module.exports = articlesRouter;