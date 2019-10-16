const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).render('login', {
    title: 'TripMaster'
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

module.exports = router;
