const path = require('path');
const express = require('express');
const helpers = require('./helpers');

const app = express();

const viewRouter = require('./routes/viewRoutes');

// set render template engine to pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// set folder to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.helpers = helpers;
  next();
});

app.get('/', viewRouter);
app.get('/login', viewRouter);
app.get('/signup', viewRouter);
app.get('/404', viewRouter);
app.get('/forgot', viewRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
