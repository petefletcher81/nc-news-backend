

const app = require('express')();
const bodyParser = require("body-parser")
const apiRouter = require('./routes/apiRouter')
const mongoose = require('mongoose')
const { DB_URL } = process.env.NODE_ENV === 'production' ? process.env : require('./config/config')
const { handling404, handling400, handling500 } = require('./error/errorHandling');

app.use(cors());

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

app.use(handling400);
//all 404 errors -- page not exists
app.use(handling404);
//all internal or server errors 500
app.use(handling500);





module.exports = app;