const topicsRouter = require('express').Router();
const { sendAllTopics, sendTopicBySlug, createNewTopic } = require('../controllers/topicsController')

topicsRouter.get('/', sendAllTopics)

topicsRouter.get('/:topic_slug/articles', sendTopicBySlug)
topicsRouter.post('/:topic_slug/articles', createNewTopic)


module.exports = topicsRouter;