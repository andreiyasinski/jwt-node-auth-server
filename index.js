require('dotenv').config(); // Sets up dotenv as soon as our application starts

const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV; // development
const stage = require('./config')[environment];

const routes = require('./routes/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

if (environment !== 'production') {
  app.use(logger('dev'));
}

app.use('/api/v1', routes(router));
app.get('/', (req, res) => {
  res.json({
    success: true
  })
});


app.listen(`${stage.port}`, () => {
  console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;