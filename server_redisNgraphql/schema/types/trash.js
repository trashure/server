const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString } = require('graphql');

const UserType = require('./user');

const TrashType = new GraphQLObjectType({
    name: "SeriesType",
    fields: {
        _id: { type: GraphQLID },
        path: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
        type: { type: GraphQLString },
        userID: { type: new GraphQLObjectType(UserType) }
    }
})
module.exports = TrashType;