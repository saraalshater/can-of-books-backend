'use strict';

const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
// const Model = require ('./Model');

const app = express();
app.use(cors());


const PORT = process.env.PORT || 3001;
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });




const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  email: String
});





const Book = mongoose.model('Book', bookSchema);




function seedBookCollection() {

  const javaScript = new Book({

    title: 'JavaScript',
    description: 'Startup book to learn JavaScript',
    status: 'Educational',
    email: 'Gleave.alshater@hitmail.com'

  });

  const Html = new Book({

    title: 'Html',
    description: 'Startup book to learn HTML',
    status: 'Educational',
    email: 'Gleave.alshater@hotmail.com'

  });

  const Css = new Book({

    title: 'Css',
    description: 'Startup book to learn CSS',
    status: 'Educational',
    email: 'Gleave.alshater@hotmail.com'

  });

  javaScript.save();
  Html.save();
  Css.save();

}

// seedBookCollection();



app.get('/books', getBooksHandler);







// http://localhost:3001/books
function getBooksHandler(req, res) {


  Book.find((err,bookArray) => {
if(err){
  res.send(err);
}else{

  res.send(bookArray);

}
  });



}






app.get('/test', (request, response) => {

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
