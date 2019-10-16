const path = require('path');
const express = require('express');
const pug = require('pug');

const app = express();

const viewRouter = require('./routes/viewRoutes');

// set render template engine to pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// set folder to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', viewRouter);
app.get('/login', viewRouter);
app.get('/signup', viewRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
