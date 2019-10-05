const express = require('express');
const bodyParser = require('body-parser');
const host = '0.0.0.0';
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the databse. Exiting now...', err);
  process.exit();
});

app.get('/', (req, res) => {
  res.json({
    "message": "Welcome to app"
  })
});

require('./app/routes/note.routes.js')(app);

app.listen(port, host, () => {
  console.log("Server is listening on port "+port);
});
