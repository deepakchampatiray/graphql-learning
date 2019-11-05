const graphql = require('graphql');
const _ = require('lodash');
const authors = require('../../../authors');

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList} = graphql;
//console.log('BookType', BookType);

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        country: {type: GraphQLString},
        books:{
            //type: new GraphQLList(BookType),
            type: new GraphQLList(require('./book.type').BookType),
            resolve: (parent, args)=>{
                //return findBookByAuthor(parent.id);
                console.log(parent);
                return require('./book.type').findBookByAuthor(parent.id);
            }
        }
    })
});

const findAuthor = (id) => {
    return _.find(authors, {id});
}

const allAuthors = () => {
    return authors;
}

module.exports.AuthorType = AuthorType;
module.exports.findAuthor = findAuthor;
module.exports.allAuthors = allAuthors;