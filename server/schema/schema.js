const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

let books = [
    { name: 'aaaa', genre: 'AAAAA', id: "1" },
    { name: 'bbbb', genre: 'BBBBB', id: "2" },
    { name: 'cccc', genre: 'CCCCC', id: "3" }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                return books.find(book => book.id === args.id);
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
});