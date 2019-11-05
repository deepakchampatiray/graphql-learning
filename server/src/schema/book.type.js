const graphql = require('graphql');
const {AuthorType, findAuthor} = require('./author.type');
const _ = require('lodash');
const books = require('../../../books');

console.log('In Book ',AuthorType, findAuthor);

const {GraphQLObjectType, GraphQLID, GraphQLString} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        publicationDate: {
            type: GraphQLString,
            resolve(obj) {
                return obj.publication_date;
            }
        },
        author:{
            type: AuthorType,
            resolve: (parent, args)=>{
                return findAuthor(parent.authorId);
            }
        }
    })
});

const findBook = (id) => {
    return _.find(books, {id: parseInt(id)});
}

const findBookByAuthor = (authorId) => {
    return _.filter(books, {authorId});
}

const allBooks = () => {
    return books;
}

module.exports.BookType = BookType;
module.exports.findBook = findBook;
module.exports.findBookByAuthor = findBookByAuthor;
module.exports.allBooks = allBooks;