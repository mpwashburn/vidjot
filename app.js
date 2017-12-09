//app.js is the entry point for application. Index.js is also used

// Here we are importing modules that we have installed

const express = require ('express');

const app = express();

// How middleware works

// Index Route
app.get('/', (req, res) => {
  res.send('Index');
});

// About Route
app.get('/about', (req, res) => {
  res.send('ABOUT');
})

const port = 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`) //ES6
  //above is the same as writing console.log('Server started on port ' + port);
});
