#NORTHCODERS NEWS

This project allows you to access a fully functional news api. It is the complete back end to the project which includes a database built in MongoDB, with the use of mongoose to help which is a schema-based solution for the application. In addition to these, a server has been built in Express JS allowing restful implementations such as GET, POST, PATCH and DELETE.

Here is the live link to the front page of the back end: [Front Page](https://ncnew-pete.herokuapp.com/api)

###Lets Begin --> getting started and the set up

1. To get started, simple fork the project within github and then clone the repo. for a guide on doing this visit https://help.github.com/articles/fork-a-repo/ **fork and clone this repo https://github.com/petefletcher81/BE2-northcoders-news**

2. Once cloned, cd into the project with `cd (name of the folder)`.

3. Then in the folder, simply type `code .` to load VS code and start the application in the right file. Make sure you check the file as from the terminal in VS code by typing `ls`. if you are in the correct folder (northcoders_news) or something that you saved it as, we can continue :).

4. Once we are in the right folder we want to install our package.json, with the scripts, dependancies and dev dependancies. Below is a list or things you will need to install and links to the documentation about the installation.

first lets install our package.json with `npm init`
Then lets sort our server and database.

_[Express JS](https://expressjs.com/en/starter/installing.html)
_[MongoDB](https://docs.mongodb.com/manual/installation/)

dependancies are more straight-forward and can be done easily with npm installs --> below we hace our dependancies along with the links to the documentation to help you get started.
_[Mongoose](https://mongoosejs.com/docs/) `npm install mongoose`
_[Body-parser](https://www.npmjs.com/package/body-parser) `npm install body-parser` \*[ejs](https://www.npmjs.com/package/ejs)`npm install ejs`

devDependancies needed in case you right additional tests
_[mocha](https://www.npmjs.com/package/mocha) `npm install mocha`
_[chai](https://www.npmjs.com/package/chai) `npm install chai`
_[nodemon](https://www.npmjs.com/package/nodemon) `npm install nodemon`
_[supertest](https://www.npmjs.com/package/supertest) `npm install supertest --save-dev`

5. Great! now is time to creat a config file as the .gitignore shows this cannot be pushed to the repo. We can do this simply by implementing the following.
   Type `mkdir config` then `touch config/config.js`. Once entered, add the below code to the file.
   const ENV = process.env.Node_ENV || 'test'

```const config = {
  'development': {
    port: 9090,
    DB_URL: 'mongodb://localhost:27017/northcoders_news',
    database: 'northercoders_news'
  },
  'test': {
    port: 9090,
    DB_URL: 'mongodb://localhost:27017/northcoders_news',
    database: 'northercoders_news_test'
  }
}

module.exports = config[ENV]
```

#SEEDING THE DATABASE

6. make sure that you have followed the above instructions for installing MongoDB. Once installed we need to be running an instance of mongo daemon. this is done simply by typing

'mongod'

in the terminal. Now leave this running and add a new terminal instance by clicking `+` on the right hand side of the terminal toolbar.

With the scripts already set up you can now run the seed:dev by typing

`npm run seed:dev`

To check thes are in the database, open another terminal instance by clicking the `+`. Now type `mongo` which will take you to the mongo shell. We can browse the databases with `show dbs`. Next choose our database that we seeded with `use northcoders_news` then we want to see the collections with `show collections`. This will highlight all the different collections we have. You will see, Articles, Users, Comments and Topics. We can view any of these by typing `db.articles.find().pretty()` will show all the article documents in that collection.

Here is a reference guide to the [mongo shell commands](https://docs.mongodb.com/manual/reference/mongo-shell/).

#RUNNING THE API

7. for running the api, we need to consider how we can get, post and patch the information. In a normal browser we can only get information, so to enable the other CRUD protocols we can use a piece of software called [Postman](https://www.getpostman.com/). With this software we can access the functionality of our endpoints

\*install Postman - then you will be able to go to the following paths: -

`npm run dev` will initiate the api and give you the following message

"listening from 9090
we are connected...."

Using the the folowing
http://localhost:9090/api

```http
GET /api/articles
# Returns all the articles
```

```http
GET /api/articles/:article_id
# Get an individual article
```

```http
GET /api/articles/:article_id/comments
# Get all the comments for a individual article
```

```http
POST /api/articles/:article_id/comments
# Add a new comment to an article. This route requires a JSON body with body and created_by key value pairs
# e.g: `{"body": "This is my new comment", "created_by": "user_id goes here"}`
```

```http
PATCH /api/articles/:article_id
# Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
# e.g: `/api/articles/:article_id?vote=up`
```

```http
PATCH /api/comments/:comment_id
# Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
# e.g: `/api/comments/:comment_id?vote=down`
```

```http
DELETE /api/comments/:comment_id
# Deletes a comment
```

```http
GET /api/users/:username
# e.g: `/api/users/mitch123`
# Returns a JSON object with the profile data for the specified user.
```

#Runing the tests

For testing we we can go over to `spec/dev.spec.js` to see all of the tests implemented. It is here if you
need to add or amend any of the tests. To run the test file `npm run test` and it will run and verify the
following tests in the terminal

```we are connected....
    /topics
      ✓ GET /topics returns all the topics with status 200
      ✓ GET /topics/:slug/articles returns all the articles from a given slug with 200 status
      ✓ GET /topics/:slug/articles returns 404 when slug not found
      ✓ POST topics/mitch/articles returns 201 status and creates new article
      ✓ POST topics/cats/articles returns 400 status when missing fields within
    /articles
      ✓ GET /comments returns all the article with status 200
      ✓ GET /articles/:article_id returns the article with and a status 200
      ✓ GET /articles/:article_id returns 400 for a article not found
      ✓ GET /articles/:article_id/comments returns all the comments for an article
      ✓ POST api/articles/:article_id/comments returns 201 with a new comment to an article
      ✓ POST api/articles/:article_id/comments returns 400 with a new comment to an article without belongs to field
      ✓ PATCH /articles/:article_id returns 200 and updated file with up vote
      ✓ PATCH /articles/:article_id returns 200 and updated file with down vote
      ✓ PATCH /articles/:article_id returns 404 and with wrong query
    /comments
      ✓ GET /comments returns all the topics with status 200
      ✓ PATCH /comments/:comment_id returns 200 and updated file with up vote
      ✓ PATCH /comments/:comment_id returns 200 and updated file with down vote
      ✓ PATCH /articles/:article_id returns 400 and with wrong query
      ✓ DELETE a comment by comment_id
      /users
      ✓ GET /users returns all the topics with status 200
      ✓ GET /articles/:article_id returns 404 for a article not found
```

for the testing I used chai mocha and supertest. This unit testing reseeded the database at
the start of each run command.

The tests cover each of the endpoints ensuring the happy route (things we know that should work).
Then I tested the the error handling including status 400's and 404's.

Here's an example of the happy route test

```
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
```

Here's an example of error handling tests.

```
it('POST topics/cats/articles returns 400 status when missing fields within the topic schema', () => {
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
```

#Deployment

This app has been deployed using [mLabs](https://mlab.com/) which was used to host the mongoDB database.
Secondly, [Heroku](https://www.heroku.com/) whichallowed the app to be ran entirely in the cloud.

NEED A LINK

#Built With -

[Visual Studio Code](https://code.visualstudio.com)
[Express JS](https://expressjs.com)
[MongoDB](https://www.mongodb.com)

Please see full list of dependancies and devDependancies at the beginning.

#Authors

- Pete Fletcher - Northcoders News - Northcoders Student

#Acknowledgements

Paul Copley
Sam Caine
Alex Cox
Paul Rogerson
And my wonderful co-hort!
