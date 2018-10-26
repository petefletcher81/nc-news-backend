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

  ////>>>>> TOPICS
  describe('/topics', () => {
    it('GET /topics returns all the topics with status 200', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body.topics[0].title).to.equal('Mitch')
          expect(Array.isArray(res.body.topics)).to.be.true
        })
    })
    it('GET /topics/:slug/articles returns all the articles from a given slug with 200 status', () => {
      return request
        .get('/api/topics/cats/articles')
        .expect(200)
        .then(res => {
          expect(res.body.topics[0].belongs_to).to.equal('cats')
          expect(res.body.topics.length).to.equal(2)
        })
    })
    //404 request
    it('GET /topics/:slug/articles returns 404 when slug not found', () => {
      return request
        .get('/api/topics/birds/articles')
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.be.equal('not found')
        })
    })

    it('POST topics/cats/articles returns 201 status and creates new article', () => {
      const newArticle = {
        votes: 80,
        title: 'UNCOVERED Again!: catspiracy to bring down democracy',
        created_by: '5bd21439569e7d55be008bf0',
        body: 'Today is a good day',
        created_at: '2017-12-24T05:38:51.2498',
        belongs_to: 'cats'
      }
      return request
        .post('/api/topics/cats/articles')
        .expect(201)
        .send(newArticle)
        .then(res => {
          expect(res.body.createdArticle.belongs_to).to.equal('cats')
          expect(res.body.createdArticle.body).to.equal('Today is a good day')
        })
    })
  })
  it('POST topics/cats/articles returns 400 status when missing fields within', () => {
    const newArticle = {
      votes: 80,
      created_by: '5bd21439569e7d55be008bf0',
      body: 'Today is a good day',
      created_at: '2017-12-24T05:38:51.2498',
      belongs_to: 'cats'
    }
    return request
      .post('/api/topics/cats/articles')
      .expect(400)
      .send(newArticle)
      .then(res => {
        console.log(res.body.msg)
        expect(res.body.msg).to.be.equal('bad request')
      })
  })


  ///>>>>ARTICLES
  describe.only('/articles', () => {
    it('GET /comments returns all the article with status 200', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].belongs_to).to.equal('mitch')
          expect(Array.isArray(res.body.articles)).to.be.true
        })
    })
    it('GET /articles/:article_id returns the article with and a status 200', () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body.comments[0].created_at).to.equal('2017-07-26T06:42:10.835Z')
          expect(Array.isArray(res.body.comments)).to.be.true
        })
    })
    it('GET /articles/:article_id/comments returns all the comments for an article', () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(200)
        .then(res => {

          expect(res.body.comments[0].created_at).to.equal('2017-07-26T06:42:10.835Z')
          expect(Array.isArray(res.body.comments)).to.be.true
        })
    })
    it('GET /articles/:article_id returns 404 for a user not found', () => {
      return request
        .get(`/api/articles/articleDocs[0]._id`)
        .expect(400)
        .then(res => {

          expect(res.body.msg).to.be.equal('bad request')
        })
    })

    it('POST api/articles/:article_id/comments returns 201 with a new comment to an article', () => {
      const newComment = {
        "votes": 1,
        "body": "I am 100% sure that we're not completely sure.",
        "belongs_to": "5bd32d817d027602f9c7fbf9",
        "created_by": "5bd32d817d027602f9c7fbf4",
        "created_at": "2016-11-17T07:43:28.154Z"
      }
      return request
        .post(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(201)
        .send(newComment)
        .then(res => {

          expect(res.body.msg).to.be.equal('Created!')
        })
    })

    it('PATCH /articles/:article_id returns 200 and updated file with up vote', () => {
      const beforePatch = articleDocs[0].votes
      //console.log(beforePatch)
      return request
        .patch(`/api/articles/${articleDocs[0]._id}?vote=up`)
        .expect(200)
        .then(res => {
          //console.log(res.body)
          expect(beforePatch + 1).to.equal(res.body.updatedArticle.votes);

        })
    })

    it('PATCH /articles/:article_id returns 200 and updated file with down vote', () => {
      const beforePatch = articleDocs[0].votes
      //console.log(beforePatch)
      return request
        .patch(`/api/articles/${articleDocs[0]._id}?vote=down`)
        .expect(200)
        .then(res => {
          //console.log(res.body)
          expect(beforePatch - 1).to.equal(res.body.updatedArticle.votes);

        })
    })

    it('PATCH /articles/:article_id returns 404 and with wrong query', () => {
      // const beforePatch = articleDocs[0].votes
      //console.log(beforePatch)
      return request
        .patch(`/api/articles/articleDocs[0]._id}?vote=big`)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('bad request');

        })
    })


    //>>>> patch comments
    console.log(commentsDocs.id)
    it('PATCH /comments/:comment_id returns 200 and updated file with up vote', () => {
      const beforePatch = articleDocs[0].votes
      //console.log(beforePatch)
      return request
        .patch(`/api/comments/${commentDocs[0]._id}?vote=up`)
        .expect(200)
        .then(res => {
          //console.log(res.body)
          expect(beforePatch + 1).to.equal(res.body.updatedArticle.votes);

        })
    })

    it('PATCH /articles/:article_id returns 200 and updated file with down vote', () => {
      const beforePatch = articleDocs[0].votes
      //console.log(beforePatch)
      return request
        .patch(`/api/articles/${articleDocs[0]._id}?vote=down`)
        .expect(200)
        .then(res => {
          //console.log(res.body)
          expect(beforePatch - 1).to.equal(res.body.updatedArticle.votes);

        })
    })



    ///>>>>> COMMENTS
    describe('/comments', () => {
      it('GET /comments returns all the topics with status 200', () => {
        return request
          .get('/api/comments')
          .expect(200)
          .then(res => {
            expect(res.body.comments[0].created_at).to.equal('2017-07-26T06:42:10.835Z')
            expect(Array.isArray(res.body.comments)).to.be.true
          })
      })

      describe('/users', () => {
        it('GET /users returns all the topics with status 200', () => {
          return request
            .get('/api/users')
            .expect(200)
            .then(res => {
              expect(res.body.users[0].name).to.equal("jonny")
              expect(Array.isArray(res.body.users)).to.be.true
            })
        })

      })
    })
    after(() => {
      mongoose.disconnect();
    })
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