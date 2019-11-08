const graphql = require('graphql');
//const {AuthorType, findAuthor} = require('./author.type');
const _ = require('lodash');
const books = require('../../../books');
const BookModel = require('../models/book.model');

//console.log('In Book ',AuthorType, findAuthor);

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        publicationDate: {
            type: new GraphQLNonNull(GraphQLString),
            resolve(obj) {
                return obj.publication_date;
            }
        },
        author:{
            type: require('./author.type').AuthorType,
            resolve: (parent, args)=>{
                return require('./author.type').findAuthor(parent.authorId);
            }
        }
    })
});

const findBook = (id) => {
    return BookModel.findById(id);
}

const findBookByAuthor = (authorId) => {
    return BookModel.find({authorId});
}

const allBooks = () => {
    return BookModel.find({});
}

const addBook = ({name, genre, publication_date, description, authorId}) => {
    let book = new BookModel({
        name, genre, description, publication_date, authorId
    });
    return book.save();
}

module.exports.BookType = BookType;
module.exports.findBook = findBook;
module.exports.findBookByAuthor = findBookByAuthor;
module.exports.allBooks = allBooks;
module.exports.addBook = addBook;