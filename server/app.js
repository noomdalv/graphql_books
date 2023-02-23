const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

app.use('/graphql', createHandler({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Server listening on port 4000');
});