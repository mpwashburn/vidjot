//app.js is the entry point for application. Index.js is also used

// Here we are importing modules that we have installed

const express = require ('express');
const exphbs = require ('express-handlebars');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');

const app = express();

// Map global promise - gets rid of warning
mongoose.Promise = global.Promise;

// Load Idea model
require ('./models/Idea');
const Idea = mongoose.model('ideas');

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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



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

// Idea Index Page
app.get('/ideas', (req, res) => {
  Idea.find({})
    .sort({date:'desc'})
    .then(ideas => {
      res.render('ideas/index', {
        ideas:ideas
      })

    })
});

// Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

// Edit Idea Form
/* Note: following edit is "/:id". This will be the acutal id of each "idea saved" so that we know which one to edit.*/
app.get('/ideas/edit/:id', (req, res) => {
  /*req.params.id is matching the _id: in this query with the id that is passed through the url*/
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    res.render('ideas/edit', {
      idea:idea
    });
  });
});

// Process Idea form
app.post('/ideas', (req, res) =>{
  // Manually adding validations to the "Add Idea form"

  /*  create an errors variable with an empty array. This array will collect errors when form fields are not filled in.*/
  let errors = [];
  /* Conditional functions where if a title or details fields are not filled in then we push an error to the errors array*/
  if(!req.body.title){
    errors.push({text: 'Please add a title'});
  }
  if(!req.body.details){
    errors.push({text: 'Please add some details'});
  }

  // Check errors length
  if(errors.length > 0){
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    }
    new Idea(newUser)
      .save()
      .then(idea => {
        res.redirect('/ideas');
      })
  }
})

const port = 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`) //ES6
  //above is the same as writing console.log('Server started on port ' + port);
});
