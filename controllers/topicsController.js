const { Topic, Article } = require('../models')

exports.sendAllTopics = (req, res, next) => {
    //console.log('topics')
    Topic.find()
        .then(topics => res.status(200).send({ topics }))
        .catch(next)
}

exports.sendTopicBySlug = (req, res, next) => {
    //console.log('topics/slug/articles')
    const slugID = req.params.topic_slug
    Article.find({ belongs_to: slugID })
        .then(topics => {
            if (!topics.length) return res.send({ status: 404, msg: 'topic not found' })
            res.status(200).send({ topics })
        })
        .catch(next)
}

exports.createNewTopic = (req, res, next) => {

    Article.create(req.body)
        .then(createdArticle => {
            if (!createdArticle) return res.send({ status: 400, msg: 'bad request' })
            res.status(201).send({ createdArticle })

        })
        //.catch(console.log)
        .catch(next)
}

