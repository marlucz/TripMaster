const express = require('express');

const router = express.Router();

const user = {
  name: 'User'
};

router.get('/', (req, res) => {
  if (user) {
    res.user = user;

    res.status(200).render('layout', {
      title: 'TripMaster',
      user
    });
  } else {
    res.status(200).render('login', {
      title: 'TripMaster'
    });
  }
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

module.exports = router;
