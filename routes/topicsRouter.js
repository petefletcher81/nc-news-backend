const topicsRouter = require('express').Router();
const {sendAllTopics} = require('../controllers/topicsController')

topicsRouter.use('/', sendAllTopics)

module.exports = topicsRouter;