const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString } = require('graphql');

const UserType = require('./user');

const TrashType = new GraphQLObjectType({
    name: "TrashType",
    fields: {
        _id: { type: GraphQLID },
        path: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
        type: { type: GraphQLString },
        userID: { type: UserType }
    }
})
module.exports = TrashType;