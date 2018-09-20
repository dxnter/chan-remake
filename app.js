require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const database = require('./config/database');
let PORT = 5000;
const app = express();
const routes = require('./routes');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  helmet({
    frameguard: {
      action: 'deny'
    },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"]
      }
    },
    dnsPrefetchControl: false
  })
);

app.use('/api', routes);

mongoose
  .connect(
    database.url,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Now connected to MongoDB'))
  .catch(err => console.log('Something went wrong', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
