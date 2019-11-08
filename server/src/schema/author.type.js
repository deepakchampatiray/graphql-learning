const graphql = require('graphql');
const _ = require('lodash');
const authors = require('../../../authors');
const AuthorModel = require('../models/author.model');

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull} = graphql;
//console.log('BookType', BookType);

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
        country: {type: GraphQLString},
        books:{
            //type: new GraphQLList(BookType),
            type: new GraphQLList(require('./book.type').BookType),
            resolve: (parent, args)=>{
                //return findBookByAuthor(parent.id);
                //console.log(parent);
                return require('./book.type').findBookByAuthor(parent._id);
            }
        }
    })
});

const findAuthor = (id) => {
    //return _.find(authors, {id: parseInt(id)});
    return AuthorModel.findById(id);
}

const allAuthors = () => {
    return AuthorModel.find({});
}

const addAuthor = ({name, age, country}) => {
    let author = new AuthorModel({
        name, age, country
    });
    return author.save();
}

module.exports.AuthorType = AuthorType;
module.exports.findAuthor = findAuthor;
module.exports.allAuthors = allAuthors;
module.exports.addAuthor = addAuthor;