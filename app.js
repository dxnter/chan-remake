require('dotenv').config();
const express = require('express');
const logger = require('logger');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

let PORT = 5000;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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


app.post()
mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${
      process.env.DB_PASSWORD
    }@ds163402.mlab.com:63402/chan-remake`,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Now connected to MongoDB'))
  .catch(err => console.log('Something went wrong', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
