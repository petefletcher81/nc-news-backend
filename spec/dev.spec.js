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
        commentsDocs = docs[2];
        topicDocs = docs[3];

      }) //seedDB async and recieves a promise
  }) //hooks from mocha

  ////>>>>> TOPICS
  describe('/topics', () => {
    it('GET /topics returns all the topics with status 200', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(res => {

          expect(res.body.topics[0].title).to.equal(`${topicDocs[0].title}`)
          expect(Array.isArray(res.body.topics)).to.be.true
        })
    })
    it('GET /topics/:slug/articles returns all the articles from a given slug with 200 status', () => {
      return request
        .get(`/api/topics/${topicDocs[0].slug}/articles`)
        .expect(200)
        .then(res => {
          expect(res.body.newArticle[0].belongs_to).to.equal(topicDocs[0].slug)
          expect(res.body.newArticle.length).to.equal(articleDocs.filter(article => article.belongs_to === topicDocs[0].slug).length)
          expect(res.body.newArticle[0].comment_count).to.equal(2)
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

    it('POST topics/mitch/articles returns 201 status and creates new article', () => {
      const newArticle = {
        votes: 80,
        title: 'UNCOVERED Again!: catspiracy to bring down democracy',
        created_by: `${topicDocs[0]._id}`,
        body: 'Today is a good day',
        belongs_to: `${articleDocs[0].belongs_to}`
      }
      return request
        .post('/api/topics/mitch/articles')
        .expect(201)
        .send(newArticle)
        .then(res => {
          expect(res.body.createdArticle.belongs_to).to.equal(`${articleDocs[0].belongs_to}`)
          expect(res.body.createdArticle.body).to.equal(newArticle.body)
        })
    })
  })
  it('POST topics/cats/articles returns 400 status when missing fields within', () => {
    const newArticle = {
      votes: 80,
      created_by: `${topicDocs[0]._id}`,
      body: 'Today is a good day',
      belongs_to: `${articleDocs[0].belongs_to}`
    }
    return request
      .post('/api/topics/cats/articles')
      .expect(400)
      .send(newArticle)
      .then(res => {
        //console.log(res.body.msg)
        expect(res.body.msg).to.be.equal('bad request')
      })
  })


  ///>>>>ARTICLES
  describe('/articles', () => {
    it('GET /comments returns all the article with status 200', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body.newArticles[0]).to.be.an('object')
          expect(Array.isArray(res.body.newArticles)).to.be.true
          expect(res.body.newArticles.length).to.equal(articleDocs.length)
        })
    })
    it('GET /articles/:article_id returns the article with and a status 200', () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(200)
        .then(res => {
          // console.log(articleDocs[0].title, 'AAAAAAA')
          // console.log(res.body.comments[0].belongs_to.title, '<<<<<<<')
          expect(res.body.comments[0].belongs_to.title).to.equal(articleDocs[0].title)
          expect(Array.isArray(res.body.comments)).to.be.true
        })
    })
    it('GET /articles/:article_id returns 400 for a article not found', () => {
      return request
        .get(`/api/articles/randomID`)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.be.equal('bad request')
        })
    })


    it('GET /articles/:article_id/comments returns all the comments for an article', () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(200)
        .then(res => {
          // console.log(res.body.comments[0].belongs_to.title)
          // console.log(articleDocs[0].title)
          expect(res.body.comments[0].belongs_to.title).to.equal(articleDocs[0].title)
          expect(Array.isArray(res.body.comments)).to.be.true
          expect(res.body.comments[0]).to.have.keys(['votes', "__v",
            "_id",
            "belongs_to",
            "body",
            "created_at",
            "created_by"])
        })
    })


    it(`POST api/articles/:article_id/comments returns 201 with a new comment to an article`, () => {
      const newComment = {
        "body": "I am 100% sure that we're not completely sure.",
        "belongs_to": `${articleDocs[0]._id}`,
        "created_by": `${userDocs[0]._id}`,
      }
      return request
        .post(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(201)
        .send(newComment)
        .then(res => {
          expect(res.body.msg).to.be.equal('Created!')
        })
    })

    it(`POST api/articles/:article_id/comments returns 400 with a new comment to an article without belongs to field`, () => {
      const newComment = {
        "body": "I am 100% sure that we're not completely sure.",
        "created_by": `${userDocs[0]._id}`,
      }
      return request
        .post(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(400)
        .send(newComment)
        .then(res => {
          expect(res.body.msg).to.be.equal('bad request')
        })
    })



    it('PATCH /articles/:article_id returns 200 and updated file with up vote', () => {
      const beforePatch = articleDocs[0].votes
      console.log(beforePatch)
      return request
        .patch(`/api/articles/${articleDocs[0]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(beforePatch + 1).to.equal(res.body.searchedArticle.article.votes);
        })
    })

    it('PATCH /articles/:article_id returns 200 and updated file with down vote', () => {
      const beforePatch = articleDocs[0].votes
      return request
        .patch(`/api/articles/${articleDocs[0]._id}?vote=down`)
        .expect(200)
        .then(res => {
          expect(beforePatch - 1).to.equal(res.body.searchedArticle.article.votes);
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

    ///>>>>> COMMENTS
    describe('/comments', () => {
      it('GET /comments returns all the topics with status 200', () => {
        return request
          .get('/api/comments')
          .expect(200)
          .then(res => {
            expect(res.body.comments[0]).has.keys(["__v",
              "_id",
              "belongs_to",
              "body",
              "created_at",
              "created_by",
              "votes"])
            expect(Array.isArray(res.body.comments)).to.be.true
          })
      })

      //>>>> patch comments
      it('PATCH /comments/:comment_id returns 200 and updated file with up vote', () => {
        const beforePatch = commentsDocs[0].votes

        return request
          .patch(`/api/comments/${commentsDocs[0]._id}?vote=up`)
          .expect(200)
          .then(res => {

            expect(beforePatch + 1).to.equal(res.body.updatedComment.votes);
          })
      })

      it('PATCH /comments/:comment_id returns 200 and updated file with down vote', () => {
        const beforePatch = commentsDocs[0].votes

        return request
          .patch(`/api/comments/${commentsDocs[0]._id}?vote=down`)
          .expect(200)
          .then(res => {

            expect(beforePatch - 1).to.equal(res.body.updatedComment.votes);
          })
      })

      it('PATCH /articles/:article_id returns 400 and with wrong query', () => {
        // onst beforePatch = articleDocs[0].votes
        //console.log(beforePatch)
        return request
          .patch(`/api/comments/commentsDocs[0]._id?vote=down`)
          .expect(400)
          .then(res => {

            expect(res.body.msg).to.equal('bad request');

          })
      })
      it('DELETE a comment by comment_id', () => {
        return request
          .delete(`/api/comments/${commentsDocs[0]._id}`)
          .expect(200)
          .then(res => {
            expect(res.body.msg).to.be.equal('Comment Deleted')
          })
      });

      ////////Users
      describe('/users', () => {
        it('GET /users returns all the topics with status 200', () => {
          return request
            .get('/api/users')
            .expect(200)
            .then(res => {
              expect(res.body.users[0].name).to.equal(userDocs[0].name)
              expect(Array.isArray(res.body.users)).to.be.true
              expect(res.body.users[0]).has.keys(["__v", "_id", "avatar_url", "name", "username"])
            })
        })
        it('GET /articles/:article_id returns 404 for a article not found', () => {
          return request
            .get(`/api/users/myrandomID`)
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.be.equal('user not found')
            })
        })

      })
    })

    describe('/*', () => {
      it('return a 404 for an invalid route', () => {
        expect()
      });
    });


    after(() => {
      mongoose.disconnect();
    })
  })

})
