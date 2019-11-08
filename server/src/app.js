const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphqlSchema = require("./schema/schema");
const mongoose = require('mongoose');
// mongodb://gql-ninja:test123@ds245677.mlab.com:45677

mongoose.connect('mongodb+srv://deepak:test123@cluster0-c9asr.mongodb.net/test?retryWrites=true&w=majority', 
            {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', ()=>console.log("Connected to DB"));

const app = express();
app.use("/graphql", graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true
}));

app.listen(4000, ()=>{
    console.log("Server started on port 4000");
});