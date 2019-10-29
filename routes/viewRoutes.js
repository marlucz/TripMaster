const express = require('express');

const router = express.Router();

const getUser = (req, res, next) => {
  const { user } = req;
  if (user) {
    res.user = user;
    next();
  }
};

const getTrip = (req, res, next) => {
  const { trip } = req;
  if (trip) {
    res.trip = trip;
    next();
  }
};

router.get('/', getUser, (req, res) => {
  res.status(200).render('layout', {
    title: 'TripMaster',
    user: res.user
  });
});

router.get('/login', (req, res) => {
  res.status(200).render('login', {
    title: 'TripMaster'
  });
});

router.get('/signup', (req, res) => {
  res.status(200).render('signup', {
    title: 'TripMaster'
  });
});

router.get('/404', (req, res) => {
  res.status(200).render('404', {
    title: '404'
  });
});

router.get('/forgot', (req, res) => {
  res.status(200).render('forgot', {
    title: 'Reset password'
  });
});

router.get('/add-trip', getUser, (req, res) => {
  res.status(200).render('editTrip', {
    title: 'Add Trip',
    user: res.user
  });
});

router.get('/trips', getUser, (req, res) => {
  res.status(200).render('trips', {
    title: 'Your Trips',
    user: res.user
  });
});

router.get('/:slug', getUser, getTrip, (req, res) => {
  const { slug } = req.params;

  res.status(200).render('trip', {
    title: slug,
    user: res.user,
    trip: res.trip
  });
});

router.get('/:slug/itinerary/', getUser, getTrip, (req, res) => {
  res.status(200).render('itinerary', {
    title: 'Your Itinerary',
    user: res.user,
    trip: res.trip
  });
});

router.get('/:slug/itinerary/add', getUser, getTrip, (req, res) => {
  res.status(200).render('editStop', {
    title: 'Add Trip Stop',
    user: res.user,
    trip: res.trip
  });
});

router.get('/:slug/expenses/add', getUser, getTrip, (req, res) => {
  res.status(200).render('editExpense', {
    title: 'Add Expense',
    user: res.user,
    trip: res.trip
  });
});

router.get('/:slug/todo/add', getUser, getTrip, (req, res) => {
  res.status(200).render('editTodo', {
    title: 'Add Todo',
    user: res.user,
    trip: res.trip
  });
});

module.exports = router;
