const express = require('express');

const router = express.Router();

const getUser = (req, res, next) => {
  const { user } = req;
  if (user) {
    res.user = user;
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
  res.status(200).render('trip', {
    title: 'Add Trip',
    user: res.user
  });
});

module.exports = router;
