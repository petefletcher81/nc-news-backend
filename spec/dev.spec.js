process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const mongoose = require('mongoose')
const app = require('../app.js');
const request = require('supertest')(app); //supertest runs app locally
const seedDB = require('../seed/seed');
const topicData = require('../seed/testData/topics.json')
const usersData = require('../seed/testData/users.json')
const commentsData = require('../seed/testData/comments.json')
const articlesData = require('../seed/testData/articles.json')


describe('/api', () => {
  let userDocs, articleDocs, topicDocs, commentsDocs;

  beforeEach(() => {
    return seedDB({ topicData, usersData, commentsData, articlesData })
      .then(docs => {
        console.log('seeded fresh database')

        userDocs = docs[0];
        articleDocs = docs[1];
        topicDocs = docs[2];
        commentsDocs = docs[3];

      }) //seedDB async and recieves a promise
  }) //hooks from mocha


  describe('/topics', () => {
    it('GET /topics returns all the topics with status 200', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(res => {
          console.log(res.body.topics[0].title)
          expect(res.body.topics[0].title).to.equal('Mitch')
          // expect(Array.isArray(res.body.topics)).to.be.true
        })
    })
  })
  after(() => {
    mongoose.disconnect();
  })
})

//test functionaliy
    //test each error handling 400, 404

//400 cast error


//expect(Array.isArray(res.body.topics)).to.be.true
//expect(Array.isArray(res.body.topics.length)).to.equal(4) --> article data.length

//lean() to modify things like the commment count because the artilce is frozen once sent by article
//article.commentCount = 0

//byID
// .get('/api/articles/${articleDocs[0]._id})
//expect(res.body.article._id).to.be.equal(${articleDocs[0]._id}) --> articleDocs[0]._id has to ba as a string literal so it matches the server

//GET 404 if something not there --> 404 --> simila to getByID
//expect(res.body.msg).to.be.equal('article not found')