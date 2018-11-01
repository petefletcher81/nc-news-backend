#NORTHCODERS NEWS

This project allows you to access a fully functional news api.  It is the complete back end to the project which includes a database built in MongoDB, with the use of mongoose to help which is a schema-based solution for the application. In addition to these, a server has been built in Express JS allowing restful implementations such as GET, POST, PATCH and DELETE.  

###Lets Begin --> getting started and the set up

1. To get started, simple fork the project within github and then clone the repo. for a guide on doing this visit https://help.github.com/articles/fork-a-repo/ **fork and clone this repo https://github.com/petefletcher81/BE2-northcoders-news**

2. Once cloned, cd into the project with `cd (name of the folder)`. 

3. Then in the folder, simply type `code .` to load VS code and start the application in the right file.  Make sure you check the file as from the terminal in VS code by typing `ls`.  if you are in the correct folder (northcoders_news) or something that you saved it as, we can continue :).

4. Once we are in the right folder we want to install our package.json, with the scripts, dependancies and dev dependancies. Below is a list or things you will need to install and links to the documentation about the installation.

first lets install our package.json with `npm init`
Then lets sort our server and database.

*[Express JS](https://expressjs.com/en/starter/installing.html) 
*[MongoDB](https://docs.mongodb.com/manual/installation/)

dependancies are more straight-forward and can be done easily with npm installs --> below we hace our dependancies along with the links to the documentation to help you get started.
*[Mongoose](https://mongoosejs.com/docs/) `npm install mongoose`
*[Body-parser](https://www.npmjs.com/package/body-parser) `npm install body-parser`
*[ejs](https://www.npmjs.com/package/ejs)`npm install ejs`

devDependancies needed in case you right additional tests
*[mocha](https://www.npmjs.com/package/mocha) `npm install mocha`
*[chai](https://www.npmjs.com/package/chai) `npm install chai`
*[nodemon](https://www.npmjs.com/package/nodemon) `npm install nodemon`
*[supertest](https://www.npmjs.com/package/supertest) `npm install supertest --save-dev`

5. Great! now is time to creat a config file as the .gitignore shows this cannot be pushed to the repo.  We can do this simply by implementing the following.
Type `mkdir config` then `touch config/config.js`.  Once entered, add the below code to the file.
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
6. make sure that you have followed the above instructions for installing MongoDB.  Once installed we need to be running an instance of mongo daemon.  this is done simply by typing 

'mongod'

in the terminal.  Now leave this running and add a new terminal instance by clicking `+` on the right hand side of the terminal toolbar.  

With the scripts already set up you can now run the seed:dev by typing

`npm run seed:dev`

To check thes are in the database, open another terminal instance by clicking the `+`.  Now type `mongo` which will take you to the mongo shell.  We can browse the databases with `show dbs`.  Next choose our database that we seeded with `use northcoders_news` then we want to see the collections with `show collections`.  This will highlight all the different collections we have.  You will see, Articles, Users, Comments and Topics.  We can view any of these by typing `db.articles.find().pretty()` will show all the article documents in that collection.  

Here is a reference guide to the [mongo shell commands](https://docs.mongodb.com/manual/reference/mongo-shell/).

#RUNNING THE API
7. for running the api, we need to consider how we can get, post and patch the information. In a normal browser we can only get information, so to enable the other CRUD protocols we can use a piece of software called [Postman](https://www.getpostman.com/). With this software we can access the functionality of our endpoints.

*install Postman - then you will be able to go to the following paths: -

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

For testing we 