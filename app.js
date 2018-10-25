const app = require('express')();
const bodyParser = require("body-parser")
const apiRouter = require('./routes/apiRouter')
const mongoose = require('mongoose')
const { DB_URL } = require('./config/config')
const { handling404, handling400 } = require('./error/errorHandling');


//'/api' --> HTML PAGE ejs with links to appropriate --> DONE
//'api/topics (follow route back)
//create apirouter --> add topics router -- get request all topics
//test get request al topics
mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => console.log('we are connected....'))
  .catch(console.log)


app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/api', (req, res, next) => {
  res.render('home')
})

app.use('/api', apiRouter);

app.use('/*', (req, res, next) => {
  next({ status: 404 });
});

//all 404 errors -- page not exists
app.use(handling404);

//all internal or server errors 500
app.use(handling400);




module.exports = app;