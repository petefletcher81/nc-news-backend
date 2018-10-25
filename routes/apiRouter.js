const apiRouter = require('express').Router();
const topicsRouter = require('../routes/topicsRouter')
const articlesRouter = require('../routes/articlesRouter')
const commentsRouter = require('../routes/commentsRouter')
const userRouter = require('../routes/userRouter')

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/users', userRouter)


module.exports = apiRouter;