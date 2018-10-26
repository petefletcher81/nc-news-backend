const { Topic, Article } = require('../models')

exports.sendAllTopics = (req, res, next) => {

    Topic.find()
        .then(topics => res.status(200).send({ topics }))
        .catch(next)
}

exports.sendTopicBySlug = (req, res, next) => {
    //console.log('topics/slug/articles')
    const slugID = req.params.topic_slug
    Article.find({ belongs_to: slugID })
        .then(topics => {
            if (!topics.length) return res.status(404).send({ status: 404, msg: 'not found' })
            res.status(200).send({ topics })
        })
        .catch(next)
}

exports.createNewTopic = (req, res, next) => {
    //console.log(req.body)



    Article.create(req.body)
        .then(createdArticle => {
            if (!createdArticle) return res.status(400).send({ status: 400, msg: 'bad request' })
            res.status(201).send({ createdArticle })
        })
        //.catch(console.log)
        .catch(next)
}

