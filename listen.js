const app = require('./app.js');

const PORT = 9090;

process.env.port = PORT;

app.listen(process.env.port, () => {
  console.log(`listening from ${process.env.port}`);
});