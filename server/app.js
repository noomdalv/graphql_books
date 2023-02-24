const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
require('dotenv').config();

const app = express();

app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Server listening on port 4000');
});