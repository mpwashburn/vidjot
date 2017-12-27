//app.js is the entry point for application. Index.js is also used

// Here we are importing modules that we have installed

const express = require ('express');
const path = require ('path');
const exphbs = require ('express-handlebars');
const methodOverride = require('method-override');
const flash = require ('connect-flash');
const session = require ('express-session');
const bodyParser = require ('body-parser');
const passport = require ('passport');
const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');

const app = express();

// Load Routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);

// Map global promise - gets rid of warning
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
  useMongoClient: true
})
.then(() => console.log('MongoDB Connected...')) //this catches a promise
.catch(err => console.log(err));


// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Method-Override middleware
app.use(methodOverride('_method'));

// Express sesson middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport Middleware. Needs to be below Express Session.
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


// Index Route
app.get('/', (req, res) => {
  //passing in dynamic data
  const title = "Let's get this party started!";
  res.render('index', {
    title: title
  });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});

// Use Routes

// What this says: Anything that uses the path '/ideas' is going to pertain to the directory 'ideas'
app.use('/ideas', ideas);
app.use('/users', users);

const port = 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`) //ES6
  //above is the same as writing console.log('Server started on port ' + port);
});
