const {Topic} = require('../models')

exports.sendAllTopics = (req, res) => {
    console.log('topics')
    Topic.find()
    .then(topics => console.log('hello'))
    .catch(console.log)
}