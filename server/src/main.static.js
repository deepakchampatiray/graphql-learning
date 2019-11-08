const mongoose = require('mongoose');
const BookModel = require('./models/book.model');
const books = require('./../../books');

mongoose.connect('mongodb+srv://deepak:test123@cluster0-c9asr.mongodb.net/test?retryWrites=true&w=majority', 
            {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', ()=>{
    books.forEach(book => {
        (new BookModel(book)).save();
    })
});


