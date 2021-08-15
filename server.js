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
  email: String,
  image: String
});

const librarySchema = new mongoose.Schema({
  library: String,
  books : [bookSchema]
});



const Book = mongoose.model('Book', bookSchema);
const libraryModel = mongoose.model('library', librarySchema);



function seedBookCollection() {

  const javaScript = new Book({

    title: 'JavaScript',
    description: 'Startup book to learn JavaScript',
    status: 'Educational',
    email: 'Gleave.alshater@hotmail.com',
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/old-books-arranged-on-shelf-royalty-free-image-1572384534.jpg?crop=0.668xw:1.00xh;0,0&resize=480:*'

  });

  const Html = new Book({

    title: 'Html',
    description: 'Startup book to learn HTML',
    status: 'Educational',
    email: 'Gleave.alshater@hotmail.com',
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/old-books-arranged-on-shelf-royalty-free-image-1572384534.jpg?crop=0.668xw:1.00xh;0,0&resize=480:*'
  });

  const Css = new Book({

    title: 'Css',
    description: 'Startup book to learn CSS',
    status: 'Educational',
    email: 'Gleave.alshater@hotmail.com',
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/old-books-arranged-on-shelf-royalty-free-image-1572384534.jpg?crop=0.668xw:1.00xh;0,0&resize=480:*'
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




//http://localhost:3001/addbooks
app.post('/addbooks', getBooksHandler);


function getBooksHandler(req,res) {

const {email,title,description, status}=req.body;

Book.find({email:email},(err,resultBooks)=> {

  if (resultBooks.length == 0) {
    // res.status(404).send("cant find any user");
    const newObj = {
      title: title,
      description: description,
      status: status,
      email: email,
    };
    resultBooks.push(newObj);
    let bookArr = resultBooks.map((i) => {
      return new BooksSaver(i);
    });
    res.send(bookArr);
    Book.insertMany(newObj);
  } else {
    const newObj = {
      title: title,
      description: description,
      status: status,
      email: email,
    };
    resultBooks.push(newObj);
    let bookArr = resultBooks.map((i) => {
      return new BooksSaver(i);
    });
    res.send(bookArr);
    Book.insertMany(newObj);
  }

});
}
class BooksSaver {
  constructor(i) {
    this.title = i.title;
    this.description = i.description;
    this.status = i.status;
  }
}
app.delete("/addbooks/:idx", deleteBook);

//http://localhost:3001/addbooks/1
function deleteBook(req, res) {
  const idx = req.params.idx;
  const email = req.query.email;
// console.log(req.params)
  Book.deleteOne({ email: email, _idx: idx });
  Book.find({ email: email }, (err, result) => {
    if (result.length == 0 || err) {
      res.status(404).send("Error check it ");
    } else {
      res.send(result.data);
            // result.data.save();

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
