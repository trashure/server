const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLString } = require('graphql');

const UserType = require('./user');

const TrashType = new GraphQLObjectType({
    name: "TrashType",
    fields: {
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        color: { type: GraphQLString },
        coordinate: { type: GraphQLString },
        path: { type: GraphQLString },
        description: { type: GraphQLString },
        type: { type: GraphQLString },
        prediction: { type: new GraphQLList(GraphQLString) },
        createdAt: { type: GraphQLString },
        userID: { type: UserType },
        token: { type: GraphQLString }
    }
})
module.exports = TrashType;