const path = require('path');
const express = require('express');
const moment = require('moment');
const helpers = require('./helpers');

const app = express();

const viewRouter = require('./routes/viewRoutes');

// set render template engine to pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// set folder to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.moment = moment;
  res.locals.helpers = helpers;
  next();
});

app.get('/login', viewRouter);
app.get('/signup', viewRouter);
app.get('/forgot', viewRouter);

// middleware to test user authorized routes
app.use((req, res, next) => {
  const user = {
    name: 'User'
  };
  req.user = user;

  next();
});

app.get('/', viewRouter);
app.get('/404', viewRouter);
app.get('/add-trip', viewRouter);
app.get('/trips', viewRouter);

// middleware to test trip dependent routes
app.use((req, res, next) => {
  const trip = {
    name: 'Trip'
  };
  req.trip = trip;

  next();
});

app.get('/:slug', viewRouter);

app.get('/:slug/itinerary', viewRouter);
app.get('/:slug/itinerary/add', viewRouter);

app.get('/:slug/expenses/add', viewRouter);

app.get('/:slug/todo/add', viewRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
