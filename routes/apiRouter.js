const apiRouter = require('express').Router();
const topicsRouter = require('../routes/topicsRouter')

apiRouter.get('/topics', topicsRouter)

module.exports = apiRouter;