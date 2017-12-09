//app.js is the entry point for application. Index.js is also used

// Here we are importing modules that we have installed

const express = require ('express');
const exphbs = require ('express-handlebars');

const app = express();

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



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
})

const port = 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`) //ES6
  //above is the same as writing console.log('Server started on port ' + port);
});