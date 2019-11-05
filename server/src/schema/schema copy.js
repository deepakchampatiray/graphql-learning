const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLInt, GraphQLList } = graphql;

const dummyBooks = [
    { name: 'Book1', genre: 'Fiction', id: '1', authorId: '1' },
    { name: 'Book2', genre: 'Novel', id: '2', authorId: '2' },
    { name: 'Book3', genre: 'Fantasy', id: '3', authorId: '1' }
];
const dummyAuthors = [
    { name: 'Author1', age: 32, id: '1'},
    { name: 'Author2', age: 45, id: '2'},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log('Resolving author inside book',parent, args);
                return _.find(dummyAuthors, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(dummyBooks, {authorId: parent.id});
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // Get book from Database
                let book = _.find(dummyBooks, { id: args.id });
                console.log(`Arguments ${JSON.stringify(args)}, found book ${JSON.stringify(book)}.`);
                return book;
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return dummyBooks;
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // Get book from Database
                let author = _.find(dummyAuthors, { id: args.id });
                console.log(`Arguments ${JSON.stringify(args)}, found author ${JSON.stringify(author)}.`);
                return author;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return dummyAuthors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})