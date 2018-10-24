const app = require('express')();
const bodyParser = require("body-parser")
const apiRouter = require('./routes/apiRouter')


//'/api' --> HTML PAGE ejs with links to appropriate --> DONE
//'api/topics (follow route back)
    //create apirouter --> add topics router -- get request all topics
    //test get request al topics


app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/api', (req, res, next) => {
    res.render('home')
})

app.use('/api', apiRouter);



module.exports = app;