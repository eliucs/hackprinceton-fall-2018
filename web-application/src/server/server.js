const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const session = require('express-session');
const firebase = require('firebase');

const FIREBASE_CONFIG = require('./config/firebase.config');

const publicPath = path.resolve(process.cwd(), 'dist');
const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(session({
  secret: '<React Full Stack Boilerplate Secret>',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
  },
}));

// Setup Firebase
firebase.initializeApp(FIREBASE_CONFIG);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get('/captcha-listing', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const ref = firebase.database().ref();
  const dataRef = ref.child('data');
  dataRef.once('value', snapshot => {
    const obj = snapshot.val();
    const data = obj != null ? Object.keys(obj).reduce((prev, curr) => (
      [...prev, obj[curr]]
    ), []) : [];
    res.status(200).send(data);
  });
});

app.get('/captcha/:captchaId', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { captchaId } = req.params;
  const ref = firebase.database().ref();
  const dataRef = ref.child(`data/${captchaId}`);
  dataRef.once('value', snapshot => {
    const data = snapshot.val() != null ? snapshot.val() : {};
    res.status(200).send(data);
  });
});

/**
 * GET *
 * For all other routes, defaults to the index page of the React Full Stack Boilerplate website.
 */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});

module.exports = app;
