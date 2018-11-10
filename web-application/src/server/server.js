const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const session = require('express-session');

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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

/**
 * GET *
 * For all other routes, defaults to the index page of the React Full Stack Boilerplate website.
 */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});

module.exports = app;
