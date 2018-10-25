const { Topic, Article } = require('../models')


exports.sendAllTopics = (req, res, next) => {
    //console.log('topics')
    Topic.find()
        .then(topics => res.status(200).send({ topics }))
        .catch(console.log)
}

exports.sendTopicBySlug = (req, res, next) => {
    //console.log('topics/slug/articles')
    const slugID = req.params.topic_slug
    Article.find({ belongs_to: slugID })
        .then(topics => res.status(200).send({ topics }))
}

exports.createNewTopic = (req, res, next) => {

    Article.create(req.body)
        .then(createdArticle => res.status(201).send({ createdArticle }))
        .catch(console.log)

}

