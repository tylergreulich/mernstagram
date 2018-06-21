const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./config/keys');

const accountRouter = require('./routes/api/accounts/accounts');
const postRouter = require('./routes/api/posts/posts');

mongoose
  .connect(keys.MongoURI)
  .then(res => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const app = express();

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/accounts', accountRouter);
app.use('/api/posts', postRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on Port ${port}`));
