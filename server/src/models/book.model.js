const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    genre: {type: String, required: true},
    authorId: {type: String, required: true},
    publication_date: Date
});

module.exports = mongoose.model("Book", bookSchema);