const browserSync = require('browser-sync');
const express = require('express');
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const path = require('path')
const compression = require('compression')

const app = express();
const port = process.env.PORT || 3000;

// import routes
const index = require('./routes/index')
const login = require('./routes/login');
// const home = require('./routes/home');

app
  .use(express.static(path.join(__dirname, '/public')))
  .use(compression())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'hbs')
  .engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname +
        '/views/layouts/',
    partialsDir: __dirname +
        '/views/partials/'
}));


// route declares
app
  .get('/', index)
  .get('/login', login)

  app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
  });


// app
//   .listen(port, listening)

// function listening() {
//   console.log(`frontend server available on http://localhost:${port}`);
//     browserSync({
//       files: ['public/**/*.{js,css}'],
//       online: false,
//       open: false,
//       port: port + 1,
//       proxy: 'localhost:' + port,
//       ui: false
//     });
// }







